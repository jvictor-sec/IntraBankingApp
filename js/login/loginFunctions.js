function openLoginForm() {
  signinForm.reset();
  signinForm.children[0].setAttribute('disabled', true);
  loginFormController.style.zIndex = 1;
  loginFormContainer.style.visibility = 'visible';
}

function closeLoginForm() {
  signinForm.children[0].removeAttribute('disabled');
  loginForm.reset();
  loginFormController.style.zIndex = -1;
  loginFormContainer.style.visibility = 'hidden';
}
