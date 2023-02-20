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

  let userDDD = `(${userData.user_ddd})`;
  let userNumber = `${userData.user_number.slice(0, 5)}-${userData.user_number.slice(5, 9)}`;

  let userPhoneNumber = `${userDDD} ${userNumber}`;

  userForm['user_id'].value = userData.user_id;
  userForm['user_name'].value = userData.user_name;
  userForm['user_email'].value = userData.user_email;
  userForm['user_phone_number'].value = userPhoneNumber;
  userForm['user_password'].value = userData.user_password;

  userForm.addEventListener('submit', event => {
    event.preventDefault();

    let data = new FormData(userForm);

    const updateData = {};

    data.forEach((value, key) => updateData[key] = value);

    fetch(API_URL+'/user', {
      method: 'PUT',
      mode: 'cors',
      body: JSON.stringify(updateData)
    })
    .then(response => response.json())
    .then(response => {
      showNotification('Usuário', response.data);
    })
    .then(() => {
      setTimeout(() => {
        window.location.reload();
      }, 2000)
    })
  });

  const deleteUserButton = document.querySelector('#delete-user-button');

  deleteUserButton.addEventListener('click', () => {
    if(confirm('Você está prestes a excluir seu usuário e todas suas finanças.')) {
      let userIdJson = { 'user_id': userData.user_id };

      fetch(API_URL+'/user', {
        method: 'DELETE',
        mode: 'cors',
        body: JSON.stringify(userIdJson)
      })
      .then(response => response.json())
      .then(response => {
        if(response.status === 'success') {
          showNotification('Finanças', response.data);

          setTimeout(() => {
            sessionStorage.clear();
            checkSessionStorage();
          }, 2000)
        } else {
          showNotification('Finanças', response.data);
        }
      })
      .catch(error => console.log(`Ocorreu um erro de solicitação: ${error}`));
    }
  });

  const signOut = document.querySelector('#sign-out');

  signOut.addEventListener('click', () => {
    if(confirm('Você está prestes a sair da sua conta.')) {
      sessionStorage.clear();
      checkSessionStorage();
    }
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
        setTimeout(() => {window.location.reload()}, 2000);
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
