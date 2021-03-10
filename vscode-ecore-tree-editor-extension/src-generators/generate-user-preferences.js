#!node
// @ts-check

/**
 * Mostly a toy. Source code generator for user preferences.
 * Add new preferences to package.json and then run this.
 */

const path = require("path");
const packageJson = require("../package.json");

function getUserPreferences() {
  return packageJson.contributes.configuration.properties;
}

/** from myCamelCase to MY_CAMEL_CASE */
function toConstName(name) {
  return [...name].map(letter => {
    const isLowercase = letter === letter.toLowerCase();
    return isLowercase ? letter.toUpperCase() : "_" + letter;
  }).join("");
}

function toGetterName(name, type) {
  const capitalized = name[0].toUpperCase() + name.substr(1);
  /* if (type === "boolean") {
    return "is" + capitalized;
  } */
  return "get" + capitalized;
}

function generateConfigurationGetter(name, configurationProperty) {
  const type = configurationProperty.type;
  const description = configurationProperty.markdownDescription || configurationProperty.description;
  //const defaultValue = configurationProperty.default;

  const nameParts = name.split(".")
  const lastName = nameParts[nameParts.length - 1];
  const getterName = toGetterName(lastName, type) + "Setting";
  const constName = toConstName(lastName) + "_PROP";

  if (configurationProperty.enum) {
    const enumValues = configurationProperty.enum;
    const enumDescriptions = configurationProperty.enumDescriptions || [];
    const enumType = enumValues && enumValues.length ? enumValues.map(it => `"${it}"`).join(" | ") : type;

    const desc = enumDescriptions.map((desc, index) => enumValues + ": " + desc).join("\n  * ");

    return [
      `export const ${constName} = \"${name}\";`,
      "",
      `/**
 * ${description}
 * ${desc}
 */`,
      `export function ${getterName}(): ${enumType} {
  const value = vscode.workspace.getConfiguration().get<${type}>(${constName});
}`
    ];
  } else {
    return [
      `export const ${constName} = \"${name}\";`,
      "",
      `/**
 * ${description}
 */`,
      `export function ${getterName}(): ${type} {
  const value = vscode.workspace.getConfiguration().get<${type}>(${constName});
}`
    ];
  }
}


function main() {
  
  const settingsDocument = [
    `// Generated from "${path.basename(module.filename)}" on ${new Date().toUTCString()}`,
    "import * as vscode from \"vscode\";"];

  const preferences = getUserPreferences();
  const allStatements = Object.keys(preferences).map(preference => {
    const options = preferences[preference];
    const statements = generateConfigurationGetter(preference, options);
    return statements;
  });

  allStatements.forEach(statements => {
    settingsDocument.push("\n", statements.join("\n"));
  });

  console.log(settingsDocument.join("\n"));

}

main();
