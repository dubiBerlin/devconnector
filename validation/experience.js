const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateExperienceInput(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : ""; // die isEmpty-Funktion aus der is-empty.js
  data.company = !isEmpty(data.company) ? data.company : "";
  data.from = !isEmpty(data.from) ? data.from : "";
  data.to = !isEmpty(data.to) ? data.to : "";
  data.location = !isEmpty(data.location) ? data.location : "";
  data.current = !isEmpty(data.current) ? data.current : "";
  data.description = !isEmpty(data.description) ? data.description : "";

  if (Validator.isEmpty(data.title)) {
    errors.title = "Job title is required";
  }

  if (Validator.isEmpty(data.company)) {
    errors.company = "Company field is required";
  }

  if (Validator.isEmpty(data.from)) {
    errors.from = "From field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
