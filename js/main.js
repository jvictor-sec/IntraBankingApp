const API_URL = 'http://localhost/IntraBankingAPI/public_html/index.php/api';

function showNotification(title, body) {
  let notification = new Notification(title, { body });
  notification.onclick = () => {
      notification.close();
      window.parent.focus();
    }
}
