const signinForm = document.querySelector('#signin-form');
const loginForm = document.querySelector('#login-form');

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
      openModal('login-modal-open-button');
    } else {
      showNotification('Novo cadastro', response.data);
    }
  })
  .catch(error => console.log(`Ocorreu um erro de solicitação: ${error}`));
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
      sessionStorage.setItem('userEmail', FORM_DATA.get('user_email'));
      window.location.replace('index.html');
    } else {
      showNotification('Logging in', response.data);
    }
  })
  .catch(error => console.log(`Ocorreu de solicitação: ${error}`));
});
