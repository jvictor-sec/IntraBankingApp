if(!sessionStorage.getItem('userEmail')) {
  window.location.replace('login.html');
}

const userEmail = sessionStorage.getItem('userEmail');

const userNameField = document.querySelector('#user_name');
const userIdField = document.querySelector('#fk_user');
const financeTableBody = document.querySelector('#finance-table-body');

// Listando informações do usuário
fetch(API_URL+`/user/${userEmail}`, {
  method: 'GET',
  mode: 'cors'
})
.then(response => response.json())
.then(response => {
  const userId = response.data.user_id;
  const userName = response.data.user_name;

  userIdField.value = userId;
  userNameField.textContent = userName;

  return userId;

})
.then(userId => {
  fetch(API_URL+`/finance/${userId}`, {
    method: 'GET',
    mode: 'cors'
  })
  .then(response => response.json())
  .then(response => {
    financeTableBody.innerHTML = '';

    response.data.forEach(finance => {
      let financeDate = finance.finance_date.split('-').reverse().join('/');
      let financePrice = parseFloat(finance.finance_price).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});

      financeTableBody.innerHTML += `
        <tr>
          <th scope="row">${finance.finance_id}</th>
          <td>${finance.finance_name}</td>
          <td>${finance.finance_description}</td>
          <td>${financePrice}</td>
          <td>${financeDate}</td>
          <td>${finance.finance_recipient}</td>
        </tr>
      `;
    });
  })
  .catch(error => console.log(`Ocorreu um erro de solicitação: ${error}`));
})
.catch(error => console.log(`Ocorreu um erro de solicitação: ${error}`));


const financeForm = document.querySelector('#finance-form');

financeForm.addEventListener('submit', event => {
  event.preventDefault();

  const FORM_DATA = new FormData(financeForm);

  fetch(API_URL+'/finance', {
    method: 'POST',
    mode: 'cors',
    body: FORM_DATA
  })
  .then(response => response.json())
  .then(response => {
    if(response.status === 'success') {
      showNotification('Novo cadastro', response.data);
      financeForm.reset;
    } else {
      showNotification('Novo cadastro', response.data);
    }
  })
  .catch(error => console.log(`Ocorreu um erro de solicitação: ${error}`));
});
