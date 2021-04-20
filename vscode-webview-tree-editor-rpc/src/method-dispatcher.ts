import { RpcParams } from "./RpcNotification";

export class DispatchException extends Error {
  constructor(message: string, public method: keyof any, params: RpcParams) {
    super(message);
  }
}

export class NotAFunctionException extends DispatchException {
  constructor(method: keyof any, params: RpcParams) {
    super(
      `The method '${String(
        method
      )}' resolved to something that is not a function!`,
      method,
      params
    );
  }
}

export class InvalidMethodException extends DispatchException {
  constructor(method: keyof any, params: RpcParams) {
    super(
      `The method '${String(method)}' is not present in the target object!'`,
      method,
      params
    );
  }
}

export class BlacklistedMethodException extends DispatchException {
  constructor(method: keyof any, params: RpcParams) {
    super(
      `The method '${String(method)}' is blacklisted and can not be called!'`,
      method,
      params
    );
  }
}

/**
 * @param target The object with methods to dispatch on
 * @param method the method name, like `getAge`
 * @param params A list of parameters, like `[1, "peter"]`.
 * @param blacklistedMethods A list of method names that are not allowed to be called, like `["dispose", "internalMethod"]`.
 * @returns the value returned from the dispatched method.
 * @throws {@link NotAFunctionException} if the `method` resolves to something that is not a function.
 * @throws {@link InvalidMethodException} if the `method` is not in the object.
 */
export function dispatchMethod<T extends object>(
  target: T,
  method: keyof T,
  params?: RpcParams,
  blacklistedMethods?: Array<keyof T>
): unknown {
  // Do not use hasOwnProperty for this; the method lies in the prototype.
  if (!method || !(method in target)) {
    throw new InvalidMethodException(method, params);
  }

  if (blacklistedMethods && blacklistedMethods.includes(method)) {
    throw new BlacklistedMethodException(method, params);
  }

  const func = target[method];
  if (typeof func !== "function") {
    throw new NotAFunctionException(method, params);
  }

  if (params === undefined) {
    return func.call(target);
  } else if (Array.isArray(params)) {
    return func.apply(target, params);
  } else {
    return func.call(target, params); // Seems like a bad idea. This allows sending one-arg objects but not one-arg arrays.
    // Also, this does not work with "keyword arguments" as expected.
  }
  //FIXME: implement for object params. KW-args like as in python?
}
