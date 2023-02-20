function checkSessionStorage() {
  if(!sessionStorage.getItem('userEmail')) {
    window.location.replace('login.html');
  }
}

function openUpdateModal() {
  const modalContainer = document.querySelector('#financeUpdate-modal-container');

  modalContainer.style.display = 'flex';

  setTimeout(() => { document.addEventListener('click', closeUpdateModal, false)}, 200)
}

function closeUpdateModal() {
  const modalContainer = document.querySelector('#financeUpdate-modal-container');
  const modalContent = document.querySelector('#financeUpdate-modal-content');
  const modalCloseButton = document.querySelector('#financeUpdate-modal-close-button');

  if(!modalContent.contains(event.target) || modalCloseButton.contains(event.target)) {
    modalContainer.style.display = 'none';
    document.removeEventListener('click', closeUpdateModal, false);
  }
}

function updateFinance(finance) {
  const updateFinanceForm = document.querySelector('#financeUpdate-form');

  updateFinanceForm["finance_id"].value = finance.finance_id;
  updateFinanceForm["update_fk_user"].value = finance.fk_user;
  updateFinanceForm["finance_name"].value = finance.finance_name;
  updateFinanceForm["finance_description"].value = finance.finance_description;
  updateFinanceForm["finance_price"].value = finance.finance_price;
  updateFinanceForm["finance_date"].value = finance.finance_date;
  updateFinanceForm["finance_recipient"].value = finance.finance_recipient;

  openUpdateModal();

  updateFinanceForm.addEventListener('submit', event => {
    event.preventDefault();

    let data = new FormData(updateFinanceForm);

    const updateData = {};

    data.forEach((value, key) => updateData[key] = value);

    fetch(API_URL+'/finance', {
      method: 'PUT',
      mode: 'cors',
      body: JSON.stringify(updateData)
    })
    .then(response => response.json())
    .then(response => {
      showNotification('Finanças', response.data);
    })
    .then(() => {
      setTimeout(() => {
        window.location.reload();
      }, 2000)
    })
    .catch(error => console.log(`Ocorreu um erro de solicitação: ${error}`))
  })
}

function deleteFinance(finance) {
  if(confirm('Você está prestes a excluir esta finança permanentemente.')) {
    let financeIdJson = { 'finance_id': finance.finance_id };

    fetch(API_URL+`/finance/${finance.finance_id}`, {
      method: 'DELETE',
      mode: 'cors',
      body: JSON.stringify(financeIdJson)
    })
    .then(response => response.json())
    .then(response => {
      showNotification('Finanças', response.data);
    })
    .then(() => {
      setTimeout(() => {
        window.location.reload();
      }, 2000)
    })
    .catch(error => console.log(`Ocorreu um erro de solicitação: ${error}`))
  }
}

checkSessionStorage();
