fetch(API_URL+`/user/${sessionStorage.getItem('userEmail')}`, {
  method: 'GET',
  mode: 'cors'
})
.then(response => response.json())
.then(response => {
  const userNameSpan = document.querySelector('#user-name-span');
  const userIdInputs = document.querySelectorAll('.user-id-input');

  const userData = response.data;

  userNameSpan.textContent = userData.user_name;

  userIdInputs.forEach(input => {
    input.value = userData.user_id;
  });

  // Administração de conta
  const userForm = document.querySelector('#user-form');

  userForm.addEventListener('submit', event => {
    event.preventDefault();

    console.log('Code...');
  });

  // Cadastro de finanças
  const financeForm = document.querySelector('#financeInsert-form');

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
        listFinanceTable(userData.user_id);
      } else {
        showNotification('Novo cadastro', response.data);
      }
    })
    .catch(error => console.log(`Ocorreu um erro de solicitação: ${error}`));
  });

  // Listagem de finanças
  const financeTableBody = document.querySelector('#finance-table-body');

  fetch(API_URL+`/finance/${userData.user_id}`, {
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
          <td><button type="button" id="updateButtonClass${finance.finance_id}" class="finance-button update-button"><ion-icon name="create"></ion-icon></ion-icon></button></td>
          <td><button type="button" id="deleteButtonClass${finance.finance_id}" class="finance-button delete-button"><ion-icon name="trash"></ion-icon></button></td>
        </tr>
      `;

      setTimeout(() => {
        const updateButton = document.querySelector(`#updateButtonClass${finance.finance_id}`);
        const deleteButton = document.querySelector(`#deleteButtonClass${finance.finance_id}`);

        updateButton.addEventListener('click', () => {
          updateFinance(finance);
        });

        deleteButton.addEventListener('click', () => {
          deleteFinance(finance);
        })
      }, 1000);
    });
  })
})
.catch(error => console.log(`Ocorreu um erro de solicitação: ${error}`));

const signOut = document.querySelector('#sign-out');

signOut.addEventListener('click', () => {
  if(confirm('Você está prestes a sair da sua conta.')) {
    sessionStorage.clear();
    checkSessionStorage();
  }
})
