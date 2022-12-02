export const validSignupInputs = (formValues) => {
  const { username, password, passwordConfirmation } = formValues;

  if (!username || !password || !passwordConfirmation) {
    return false;
  }

  if (username.length < 2) {
    return false;
  }

  if (username.toLowerCase() !== username) {
    return false;
  }

  if (!/^[a-z_]*$/.test(username)) {
    return false;
  }

  if (password.length < 8) {
    return false;
  }

  if (password.toLowerCase() == password) {
    return false;
  }

  if (password.toUpperCase() == password) {
    return false;
  }

  if (!/\d/g.test(password)) {
    return false;
  }

  if (password !== passwordConfirmation) {
    return false;
  }

  return true;
};