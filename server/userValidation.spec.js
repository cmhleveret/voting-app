const {
  validLoginInputs,
  validSignupInputs,
} = require("./controllers/userController");

describe("validLoginInputs", () => {
  it("returns false if username is null", () => {
    const req = {
      body: {
        username: "",
        password: "password",
      },
    };
    const result = validLoginInputs(req);
    expect(result).toEqual(false);
  });
});


//Valid Signup Inputs tests
describe("validSignupInputs", () => {

  it("return false if username is empty", () => {
    const req = {
      body: {
        username: "",
        password: "Password1",
        passwordConfirmation: "Password1",
      },
    };
    const result = validSignupInputs(req);
    expect(result).toEqual(false);
  });

  it("return false if password is empty", () => {
    const req = {
      body: {
        username: "_dougie",
        password: "",
        passwordConfirmation: "Password1",
      },
    };
    const result = validSignupInputs(req);
    expect(result).toEqual(false);
  });

  it("return false if passwordConfirmation is empty", () => {
    const req = {
      body: {
        username: "_dougie",
        password: "Password1",
        passwordConfirmation: "",
      },
    };
    const result = validSignupInputs(req);
    expect(result).toEqual(false);
  });

  it("return false if username is less than 2 characters", () => {
    const req = {
      body: {
        username: "_",
        password: "Password1",
        passwordConfirmation: "Password1",
      },
    };
    const result = validSignupInputs(req);
    expect(result).toEqual(false);
  });

  it("return false if username contains uppercase alpha characters", () => {
    const req = {
      body: {
        username: "_Dougie",
        password: "Password1",
        passwordConfirmation: "Password1",
      },
    };
    const result = validSignupInputs(req);
    expect(result).toEqual(false);
  });

  it("return false if username contains non-underscore, non-alpha characters", () => {
    const req = {
      body: {
        username: "_dougie-+§",
        password: "Password1",
        passwordConfirmation: "Password1",
      },
    };
    const result = validSignupInputs(req);
    expect(result).toEqual(false);
  });

  it("return false if password less than 8 characters", () => {
    const req = {
      body: {
        username: "_dougie",
        password: "Passwo1",
        passwordConfirmation: "Passwo1",
      },
    };
    const result = validSignupInputs(req);
    expect(result).toEqual(false);
  });

  it("return false if password doesn't contain uppercase", () => {
    const req = {
      body: {
        username: "_dougie",
        password: "password1",
        passwordConfirmation: "password1",
      },
    };
    const result = validSignupInputs(req);
    expect(result).toEqual(false);
  });

  it("return false if password doesn't contain lowercase", () => {
    const req = {
      body: {
        username: "_dougie",
        password: "PASSWORD1",
        passwordConfirmation: "PASSWORD1",
      },
    };
    const result = validSignupInputs(req);
    expect(result).toEqual(false);
  });

  it("return false if password doesn't contain a number", () => {
    const req = {
      body: {
        username: "_dougie",
        password: "passWord",
        passwordConfirmation: "passWord",
      },
    };
    const result = validSignupInputs(req);
    expect(result).toEqual(false);
  });

  it("return false if password and passwordConfirmation arent the same", () => {
    const req = {
      body: {
        username: "_dougie",
        password: "Password1",
        passwordConfirmation: "paSword1",
      },
    };
    const result = validSignupInputs(req);
    expect(result).toEqual(false);
  });
});
