const signinForm = document.querySelector('#signin-form');
const loginForm = document.querySelector('#login-form');

const loginFormContainer = document.querySelector('#login-form-container')
const loginFormController = document.querySelector('#login-form-controller');

const openFormButton = document.querySelector('#open-form-button');
const closeFormButton = document.querySelector('#close-form-button');

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
      openLoginForm();
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
      sessionStorage.setItem('sessionId', crypto.randomUUID());
      window.location.replace('index.html');
    } else {
      showNotification('Novo cadastro', response.data);
    }
  })
  .catch(error => console.log(`Ocorreu de solicitação: ${error}`));
});

openFormButton.addEventListener('click', () => {
  openLoginForm();
});

closeFormButton.addEventListener('click', () => {
  closeLoginForm();
});
