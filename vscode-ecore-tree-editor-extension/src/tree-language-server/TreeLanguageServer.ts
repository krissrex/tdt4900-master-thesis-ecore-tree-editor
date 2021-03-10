import { spawn } from "child_process";
import { getLogger } from "../log";
import { ExtensionContext } from "vscode";
import { TREE_LANGUAGE_SERVER_JAR_MIN_JRE_VERSION, TREE_LANGUAGE_SERVER_JAR_PATH } from "../config";

export class TreeLanguageServer {
  private readonly log = getLogger().getChildLogger({ label: "TreeLanguageServer" });

  public static create(context: ExtensionContext): TreeLanguageServer {
    return new TreeLanguageServer(this.getJarPath(context));
  }

  public static getJarPath(context: ExtensionContext): string {
    return context.asAbsolutePath(TREE_LANGUAGE_SERVER_JAR_PATH);
  }

  /**
   *
   * @param jarPath Use {@link TreeLanguageServer.getJarPath}.
   */
  constructor(public jarPath: string) {}

  public start() {}

  public async assertEnvironmentHasJava(): Promise<boolean> {
    try {

      const version = await getJavaVersion();
      const major = version.split(".")[0];
      try {
        const majorInt = parseInt(major, 10);
        if (majorInt >= TREE_LANGUAGE_SERVER_JAR_MIN_JRE_VERSION) {
          return true;
        } else {
          this.log.debug("Java version %s (JRE %s) is below %s!", version, major, TREE_LANGUAGE_SERVER_JAR_MIN_JRE_VERSION);
        }
      } catch (_){}
      return false;
    } catch (err) {
      this.log.error("Failed to get java version");
      return false;
    }
  }
}

export function getJavaVersion(): Promise<string> {
  const log = getLogger().getChildLogger({ label: "TreeLanguageServer" });

  const command = "java";
  const args: string[] = ["-version"];

  log.debug("Starting '%s %s'", command, args.join(" "));
  const childProcess = spawn(command, args, {
    windowsHide: true, // hide console windows on Windows
    detached: false, // false = end when parent process ends
  });
  
  const timeoutSec = 10;
  setTimeout(() => {
    if (!childProcess.killed) {
      log.warn("The command timed out (%s sec): '%s %s'", timeoutSec, command, args.join(" "));
      childProcess.kill("SIGKILL");
    }
  }, timeoutSec*1000);

  return new Promise((resolve, reject) => {
    childProcess.on("error", (err) => {
      log.error("Child process had an error", err);
      reject(err);
      childProcess.kill("SIGINT");
    });

    const stdioHandler = (data: Buffer) => {
      const commandOutput = data.toString("utf-8");
      log.debug("Got java version: " + commandOutput);
      const version = /(\d+\.?)+/.exec(commandOutput)?.[0]; // e.g.: 11.0.3 or 1.8.0
      if (version) {
        childProcess.stderr.off("data", stdioHandler);
        childProcess.stdout.off("data", stdioHandler);
        resolve(version);
      } else {
        reject(new Error("No version string found"));
      }

      childProcess.kill("SIGINT");
    };

    // Version could be on stdout or stderr, depending on JDK version.
    childProcess.stderr.on("data", stdioHandler);
    childProcess.stdout.on("data", stdioHandler);
  });
}
