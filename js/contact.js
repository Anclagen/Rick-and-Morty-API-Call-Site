//assigning variables
const form = document.querySelector("#contact-form");
const fullname = document.querySelector("#name");
const nameError = document.querySelector(".error-name");
const email = document.querySelector("#email");
const emailError = document.querySelector(".error-email");
const subject = document.querySelector("#subject");
const subjectError = document.querySelector(".error-subject");
const address = document.querySelector("#address");
const addressError = document.querySelector(".error-address");
const successContainer = document.querySelector(".success");

//clear form on refresh
fullname.value = "";
email.value = "";
subject.value = "";
address.value = "";


function checkLength(value, length) {
  if (value.trim().length > length) {
      return true;
  } else {
      return false;
  }
}

function validateEmail(email) {
  //https://digitalfortress.tech/tips/top-15-commonly-used-regex/ uncommon email check.
  const emailRegEx = /^([a-z0-9_\.\+-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
  const validateEmail = emailRegEx.test(email.value);
  return validateEmail;
}

function validateContactForm(submission){
  submission.preventDefault();

  //check runs through all if statements if one is false success container not displayed.
  let successCheck = true;

  //clear success container if resubmitted
  successContainer.innerHTML = "";
  successContainer.classList.remove("main-item");

  if (!checkLength(fullname.value, 0)) {
    nameError.innerHTML = `Please enter you name.`;
    successCheck = false;
  } else{
    nameError.innerHTML = "";
  }

  if (!validateEmail(email)) {
    emailError.innerHTML = `Please enter a valid email address`;
    successCheck = false;
  } else{
    emailError.innerHTML = "";
  }

  if (!checkLength(subject.value, 9)) {
    subjectError.innerHTML = `Your subject must have a minium of 10 characters.`;
    successCheck = false;
  } else{
    subjectError.innerHTML = "";
  }

  if (!checkLength(address.value, 24)) {
    addressError.innerHTML = `Your address must have a minimum of 25 characters.`;
    successCheck = false;
  } else{
    addressError.innerHTML = "";
  }

  //if all validation passes form submitted and success div displayed 
  if(successCheck) {
    successContainer.classList.add("main-item")
    successContainer.innerHTML = "Success, your query has been submitted."
  }
}

//on submit run validation check
form.addEventListener("submit", validateContactForm);