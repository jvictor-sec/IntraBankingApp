const API_URL = 'http://localhost/IntraBankingAPI/public_html/index.php/api';

function showNotification(title, body) {
  let notification = new Notification(title, { body });
  notification.onclick = () => {
      notification.close();
      window.parent.focus();
    }
}

const modalOpenButton = document.querySelector('.modal-open-button');

function openModal() {
  const modalContainer = document.querySelector('.modal-container');

  modalContainer.style.display = 'flex';

  setTimeout(() => { document.addEventListener('click', closeModal, false) }, 200);
}

modalOpenButton.addEventListener('click', () => {
  openModal();
});

function closeModal(event) {
  const modalContainer = document.querySelector('.modal-container');
  const modalContent = document.querySelector('.modal-content');
  const modalCloseButton = document.querySelector('.modal-close-button');

  if(!modalContent.contains(event.target) || modalCloseButton.contains(event.target)) {
    modalContainer.style.display = 'none';
    document.removeEventListener('click', closeModal, false);
  }
}
