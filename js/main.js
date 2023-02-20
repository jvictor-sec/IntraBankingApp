const API_URL = 'http://localhost/IntraBankingAPI/public_html/index.php/api';

const modalOpenButton = document.querySelectorAll('.modal-open-button');
let selector;

function showNotification(title, body) {
  let notification = new Notification(title, { body });
  notification.onclick = () => {
      notification.close();
      window.parent.focus();
    }
}

function openModal(modalSelector) {
  selector = modalSelector.split('-');
  selector.splice(2, 2);
  selector = selector.join('-');

  const modalContainer = document.querySelector(`#${selector}-container`);

  modalContainer.style.display = 'flex';

  setTimeout(() => { document.addEventListener('click', closeModal, false) }, 200);
}

function setOpenButton() {
  modalOpenButton.forEach(openButton => {
    openButton.addEventListener('click', () => {
      openModal(openButton.id);
    });
  });
};

setOpenButton();

function closeModal(event) {
  const modalContainer = document.querySelector(`#${selector}-container`);
  const modalContent = document.querySelector(`#${selector}-content`);
  const modalCloseButton = document.querySelector(`#${selector}-close-button`);

  if(!modalContent.contains(event.target) || modalCloseButton.contains(event.target)) {
    modalContainer.style.display = 'none';
    document.removeEventListener('click', closeModal, false);
  }
}
