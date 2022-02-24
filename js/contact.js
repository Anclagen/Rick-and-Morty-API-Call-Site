//assigning variables
const form = document.querySelector("#contact-form");
const fullname = document.querySelector("#name");
const fullnameError = document.querySelector(".error-name");
const email = document.querySelector("#email");
const emailError = document.querySelector(".error-email");
const subject = document.querySelector("#subject");
const subjectError = document.querySelector(".error-subject");
const address = document.querySelector("#address");
const addressError = document.querySelector(".error-address");
const successContainer = document.querySelector(".success");

//check length without spaces
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

  //clear success container if resubmitted wrong, remove main class to avoid green box
  successContainer.innerHTML = "";
  successContainer.classList.remove("main-item");

  if (!checkLength(fullname.value, 0)) {
    fullnameError.innerHTML = `Please enter you name.`;
    fullname.style.border ="2px solid red";
    successCheck = false;
  } else{
    //clear a previous error when correcting
    fullnameError.innerHTML = "";
    fullname.style.border ="1px solid grey";
  }

  if (!validateEmail(email)) {
    emailError.innerHTML = `Please enter a valid email address`;
    email.style.border ="2px solid red";
    successCheck = false;
  } else{
    emailError.innerHTML = "";
    email.style.border ="1px solid grey";
  }

  if (!checkLength(subject.value, 9)) {
    subjectError.innerHTML = `Your subject must have a minium of 10 characters.`;
    subject.style.border ="2px solid red";
    successCheck = false;
  } else{
    subjectError.innerHTML = "";
    subject.style.border ="1px solid grey";
  }

  if (!checkLength(address.value, 24)) {
    addressError.innerHTML = `Your address must have a minimum of 25 characters.`;
    address.style.border ="2px solid red";
    successCheck = false;
  } else{
    addressError.innerHTML = "";
    address.style.border ="1px solid grey";
  }

  //if all validation passes form submitted and success div displayed 
  if(successCheck) {
    successContainer.classList.add("main-item")
    successContainer.innerHTML = "<p>Success, your query has been submitted.</p>"
    form.reset();
  }

  
}

//on submit run validation check
form.addEventListener("submit", validateContactForm);
