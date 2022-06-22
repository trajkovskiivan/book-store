export default function validateInfo(values) {
  let errors = {};
  if (!values.name) {
    errors.name = "Can't be empty!";
  }
  if (!values.author) {
    errors.author = "Can't be empty!";
  }
  if (!values.year) {
    errors.year = "Can't be empty!";
  }
  return errors;
}
