const loginFormContainer = document.querySelector('#login-form-container')
const openLoginForm = document.querySelector('#open-login-form');
const closeLoginForm = document.querySelector('#close-button');

const signInFormInputs = document.querySelectorAll('.signin-input');

openLoginForm.addEventListener('click', () => {
  signInFormInputs.forEach(input => {
    input.setAttribute('disabled', true);
    input.value = '';
  });
  loginFormContainer.style.visibility = 'visible';
});

closeLoginForm.addEventListener('click', () => {
  signInFormInputs.forEach(input => input.removeAttribute('disabled'));
  loginFormContainer.style.visibility = 'hidden';
})
