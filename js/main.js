const API_URL = 'http://localhost/IntraBankingAPI/public_html/index.php/api';

const signinForm = document.querySelector('#signin-form');
const loginForm = document.querySelector('#login-form');

const loginFormContainer = document.querySelector('#login-form-container')
const openLoginForm = document.querySelector('#open-signin-form');
const closeLoginForm = document.querySelector('#close-button');

const signInFormInputs = document.querySelectorAll('.signin-input');

function showNotification(title, body) {
  let notification = new Notification(title, { body });
  notification.onclick = () => {
      notification.close();
      window.parent.focus();
    }
}

signinForm.addEventListener('submit', event => {
  event.preventDefault();

  const FORM_DATA = new FormData(signinForm);

  fetch(API_URL+'/user', {
    method: 'POST',
    mode: 'cors',
    body: FORM_DATA
  })
  .then(response => response.json())
  .then(response => {
    if(response.status === 'success') {
      showNotification('Novo cadastro', response.data);
      signinForm.reset;
    } else {
      showNotification('Novo cadastro', response.data);
    }
  })
  .catch(error => console.log(`Ocorreu de solicitação: ${error}`));
});

loginForm.addEventListener('submit', event => {
  event.preventDefault();

  const FORM_DATA = new FormData(loginForm);

  fetch(API_URL+'/user', {
    method: 'POST',
    mode: 'cors',
    body: FORM_DATA
  })
  .then(response => response.json())
  .then(response => {
    if(response.status === 'success') {
      showNotification('Novo cadastro', response.data);
      loginForm.reset;
    } else {
      showNotification('Novo cadastro', response.data);
    }
  })
  .catch(error => console.log(`Ocorreu de solicitação: ${error}`));
});


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
});
