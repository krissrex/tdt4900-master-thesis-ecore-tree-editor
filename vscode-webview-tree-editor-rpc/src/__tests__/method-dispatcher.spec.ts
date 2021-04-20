import {
  BlacklistedMethodException,
  dispatchMethod,
} from "../method-dispatcher";

describe("Method dispatcher", () => {
  it("should dispatch with no params", (done) => {
    const target = {
      noParams() {
        done();
      },
      wrongMethod() {
        fail();
      },
    };

    dispatchMethod(target, "noParams");
  });

  describe("Parameter list", () => {
    it("should dispatch with one parameter", (done) => {
      const paramValue = "hello world";
      const target = {
        oneParam(param: string) {
          expect(param).toEqual(paramValue);
          done();
        },
      };

      dispatchMethod(target, "oneParam", [paramValue]);
    });

    it("should dispatch with multiple parameters", (done) => {
      const paramValue = "hello world";
      const paramValue2 = 2;
      const target = {
        oneParam(param1: string, param2: number) {
          expect(param1).toEqual(paramValue);
          expect(param2).toEqual(paramValue2);
          done();
        },
      };

      dispatchMethod(target, "oneParam", [paramValue, paramValue2]);
    });
  });

  /**
   * Incorrect with regards to how the called method is defined in the code.
   */
  describe("Incorrect parameter values", () => {
    it("should dispatch with a type other than described in typescript", (done) => {
      const target = {
        stringParam(str: string) {
          // We would crash here if we assumed str was a string and did e.g. `str.charAt`.
          expect(typeof str).toEqual("number");
          expect(str).toStrictEqual(2);
          done();
        },
      };

      dispatchMethod(target, "stringParam", [2]);
    });

    it("should ignore extra parameters", (done) => {
      const paramValue = "hello world";
      const target = {
        onlyOneParam(param: string) {
          expect(param).toEqual(paramValue);
          expect(arguments).toHaveLength(5);
          done();
        },
      };

      dispatchMethod(target, "onlyOneParam", [
        paramValue,
        "oops",
        2,
        "many",
        "params",
      ]);
    });
  });

  it("should return dispatched method's result", () => {
    const target = {
      getString() {
        return "hello world";
      },
    };

    const actual = dispatchMethod(target, "getString");
    expect(actual).toEqual("hello world");
  });

  it("should preserve 'this'", (done) => {
    const target = {
      needsThis: function () {
        this.mustBeCalled();
      },

      mustBeCalled() {
        done();
      },
    };

    dispatchMethod(target, "needsThis");
  });

  it("should not call blacklisted methods", () => {
    const target = {
      okay() {},
      notOkay() {
        fail("This method is blacklisted and should not be called!");
      },
    };

    expect(() =>
      dispatchMethod(target, "notOkay", [], ["notOkay"])
    ).toThrowError(
      "The method 'notOkay' is blacklisted and can not be called!'"
    );
  });
});
