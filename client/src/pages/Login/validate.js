import { validateEmail, validatePassword } from "../../helpers/validators";

export default function validateInfo(values) {
  let errors = {};
  const status = validateEmail(values.email);
  if (!values.password) {
    errors.password = "Can't be empty!";
  } else if (!validatePassword(values.password)) {
    errors.password =
      "Password should be atlest 6 characters with minimum one uppercase, one number and one special character!";
  }
  if (!values.email) {
    errors.email = "Can't be empty!";
  } else if (!validateEmail(values.email)) {
    errors.email = "Email is not valid format!";
  }
  return errors;
}
