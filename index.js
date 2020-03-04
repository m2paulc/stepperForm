// DOM elements
const form = document.querySelector('#form');
const email = document.querySelector('#email');
const emailContainer = document.querySelector('.email');
const step1 = document.querySelector('#email-step');
const password = document.querySelector('#password');
const passwordContainer = document.querySelector('.password');
const step2 = document.querySelector('#password-step');
const finishContainer = document.querySelector('.complete');
const step3 = document.querySelector('#submit-step');
const submitBtn = document.querySelector('#submitBtn');
const errorMsg = document.querySelector('#errMsg');

//Error
function showError(input, message) {
  const notification = document.querySelector('.notification');
  notification.classList.add('error');
  errorMsg.innerHTML = message;
  if (input === 'email') {
    emailContainer.style.borderColor = 'orangered';
    step1.children[0].style.fill = 'orangered';
    step1.children[1].style.stroke = '#fff';
    stepCheck(step1, 'error');

  }
  if (input === 'password') {
    passwordContainer.style.borderColor = 'orangered';
    step2.children[0].style.fill = 'orangered';
    step2.children[1].style.stroke = '#fff';
    stepCheck(step2, 'error');
  }
  if (input === 'submit') {
    step3.children[0].style.fill = 'none';
    step3.children[1].style.stroke = '#000';
    stepCheck(step3, 'error');
  }
}
//Success
function showSuccess(input) {
  errorMsg.innerHTML = '';
  if (input === 'email') {
    emailContainer.style.borderColor = '#00C853';
    step1.children[0].style.fill = '#00C853';
    step1.children[1].style.stroke = '#fff';
    stepCheck(step1, 'success');
  }
  if (input === 'password') {
    passwordContainer.style.borderColor = '#00C853';
    step2.children[0].style.fill = '#00C853';
    step2.children[1].style.stroke = '#fff';
    stepCheck(step2, 'success');
  }
  if (input === 'submit') {
    step3.children[0].style.fill = '#00C853';
    step3.children[1].style.stroke = '#fff';
    stepCheck(step3, 'success');
  }
}
//svg steps indications
function stepCheck(step, state) {
  for (let j = 0; j < 3; j++) {
    if ((step.children[j] !== step.children[1] &&
      step.children[j] !== undefined) && state === 'success') {
      step.children[j].classList.add('passed');
    }
    if ((step.children[j] !== step.children[1] && step.children[j] !== undefined) &&
      (state === 'error' && step.children[j].classList.contains('passed'))) {
      step.children[j].classList.remove('passed');
    }
  }
}
//validate with Regex
function validateEmail(email) {
  const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regexEmail.test(String(email).toLowerCase());
}

function validatePassword(password) {
  const regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  return regexPassword.test(password);
}

function checkEmail() {
  if (email.value.trim() === '') {
    showError('email', 'Email Address is required');
  }
  else if (!validateEmail(email.value)) {
    showError('email', 'Email Address is not valid');
  }
  else {
    showSuccess('email');
    passwordContainer.classList.add('active');
  }
}

function checkPassword() {
  if (password.value.length < 8) {
    showError('password', 'Password is required with 8 or more characters');
  }
  else if (!validatePassword(password.value)) {
    showError('password', 'Password must be 8 characters long and must include uppercase, lowercase and with numbers');
    if (finishContainer.classList.contains('active')) finishContainer.classList.remove('active');
  }
  else {
    showSuccess('password');
    finishContainer.classList.add('active');
  }
}

//Event Listeners
email.addEventListener('input', checkEmail);
email.addEventListener('keyup', function (e) {
  if ((e.keycode === 13 || e.which === 13) &&
    emailContainer.style.borderColor !== 'orangered') {
    password.focus();
  }
});

password.addEventListener('input', checkPassword);
password.addEventListener('keyup', function (e) {
  if ((e.keycode === 13 || e.which === 13) &&
    passwordContainer.style.borderColor !== 'orangered') {
    document.querySelector('.submitBtn').style.borderColor = '#00C853';
    submitBtn.focus();
  }
});

submitBtn.addEventListener('change', function () {
  (this.checked) ? showSuccess('submit') : showError('submit', 'Click Finish');
});
submitBtn.addEventListener('keyup', function (e) {
  if (e.keycode === 13 || e.which === 13) submitBtn.setAttribute('checked', true);
});