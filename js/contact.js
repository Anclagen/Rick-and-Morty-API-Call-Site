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

//check length without spaces, and generate error if validation fails
function validatedInputLength(input, length, error) {
  if (input.value.trim().length > length) {
    error.innerHTML = "";
    input.style.border ="1px solid grey";
    return true;
  } else {
    error.innerHTML = `Your ${input.name} must have a minium of ${length + 1} characters.`;
    input.style.border ="2px solid red";
  }
}

//validate email, generate errors if validation fails, novalidated added to form, email input cause problems with the js
function validateEmailInput(email) {
  const emailRegEx = /^([a-z0-9_\.\+-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
  const validateEmail = emailRegEx.test(email.value);
  if (validateEmail){ 
    emailError.innerHTML = "";
    email.style.border ="1px solid grey";
    return true;
  } else {
    emailError.innerHTML = `Please enter a valid email address`;
    email.style.border ="2px solid red";
  }
}

//validate form
function validateContactForm(submission){
  submission.preventDefault();

  //clear success container if resubmitted wrong, remove main class to avoid green box
  successContainer.innerHTML = "";
  successContainer.classList.remove("main-item");

  //variables assigned true if they pass, and errors generated on fail.
  const a = validatedInputLength(fullname, 0, fullnameError);
  const b = validatedInputLength(subject, 9, subjectError);
  const c = validateEmailInput(email);
  const d = validatedInputLength(address, 24, addressError);

  //if all variables true form submitted and success div displayed 
  if(a && b && c && d) {
    successContainer.classList.add("main-item")
    successContainer.innerHTML = "<p>Success, your query has been submitted.</p>"
    //scrolls to success container on submit.
    successContainer.scrollIntoView();
    form.reset();
  }
}

//on submit run form validation
form.addEventListener("submit", validateContactForm);
