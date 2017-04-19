export const validateSignup = formProps => {
  const errors = {};

  if(!formProps.email) {
    errors.email = "Please enter an email";
  }

  if(!formProps.password) {
    errors.password = "Please enter a password";
  }
  if(!formProps.confirmPassword) {
    errors.confirmPassword = "Please enter the password again to confirm";
  }
  if(formProps.password !== formProps.confirmPassword) {
    errors.password = "Passwords do not match";
  }

  return errors;
}

export const validateSignin = formProps => {
  const errors = {};

  if(!formProps.email) {
    errors.email = "Please enter an email";
  }
  if(!formProps.password) {
    errors.password = "Please enter a password";
  }

  return errors;
}
