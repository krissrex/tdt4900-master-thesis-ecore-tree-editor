import * as vscode from "vscode";
import { getExtensionLogger, IVSCodeExtLogger } from "@vscode-logging/logger";
import { EXTENSION_HUMAN_NAME, EXTENSION_NAME } from "./config";
import {
  getLoggingLevelSetting,
  getSourceLocationTrackingSetting,
} from "./config/user-settings";

/** Root singleton for all loggers. */
let logger: IVSCodeExtLogger;

export function initializeLogger(
  context: Pick<
    vscode.ExtensionContext,
    "subscriptions" | "extensionMode" | "logUri"
  >
): void {
  if (logger !== undefined) {
    logger.warn("Attempted to initialize the logger twice. Aborted.");
    return;
  }

  const logOutputChannel = vscode.window.createOutputChannel(
    EXTENSION_HUMAN_NAME
  );
  context.subscriptions.push(logOutputChannel);

  const isNotProduction =
    context.extensionMode !== vscode.ExtensionMode.Production;

  logger = getExtensionLogger({
    extName: EXTENSION_NAME,
    level: getLoggingLevelSetting(),
    logPath: context.logUri.fsPath,
    logOutputChannel: logOutputChannel,
    sourceLocationTracking:
      getSourceLocationTrackingSetting() || isNotProduction,
    logConsole: isNotProduction,
  });
}

/**
 * Use this logger or create a named child logger with `const log = getLogger().getChildLogger({ label: "MyClass" });`
 *
 * `initializeLogger` must be called first in the extension's `activate`.
 */
export function getLogger(): IVSCodeExtLogger {
  return logger;
}

/**
 * Create a child logger with a label.
 * @param label a string like `MyClass`.
 * @param parent Optional parent logger. If none is provided, the {@link getLogger()} is used.
 * @returns a new logger
 */
export function getChildLogger(label: string, parent?: IVSCodeExtLogger) {
  return (parent ?? getLogger()).getChildLogger({ label: label });
}
