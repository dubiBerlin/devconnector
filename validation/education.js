const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateEducationInput(data) {
  let errors = {};

  data.school = !isEmpty(data.school) ? data.school : ""; // die isEmpty-Funktion aus der is-empty.js
  data.degree = !isEmpty(data.degree) ? data.degree : "";
  data.from = !isEmpty(data.from) ? data.from : "";
  data.to = !isEmpty(data.to) ? data.to : "";
  data.fieldofstudy = !isEmpty(data.fieldofstudy) ? data.fieldofstudy : "";
  data.current = !isEmpty(data.current) ? data.current : "";
  data.description = !isEmpty(data.description) ? data.description : "";

  if (Validator.isEmpty(data.school)) {
    errors.school = "school is required";
  }

  if (Validator.isEmpty(data.degree)) {
    errors.degree = "degree field is required";
  }

  if (Validator.isEmpty(data.fieldofstudy)) {
    errors.fieldofstudy = "fieldofstudy field is required";
  }

  if (Validator.isEmpty(data.description)) {
    errors.description = "description field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
