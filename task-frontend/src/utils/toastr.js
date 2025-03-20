// src/utils/toastr.js
import toastr from 'toastr';
import 'toastr/build/toastr.min.css'; // Import CSS

// Configure Toastr options
toastr.options = {
  closeButton: true,
  progressBar: true,
  positionClass: 'toast-top-right',
  timeOut: '5000',
};

const showToast = (type, message) => {
  if (Array.isArray(message)) {
    message.forEach((msg) => toastr[type](msg));
  } else {
    toastr[type](message);
  }
};

export const toastSuccess = (message) => showToast('success', message);
export const toastError = (message) => showToast('error', message);
export const toastInfo = (message) => showToast('info', message);
export const toastWarning = (message) => showToast('warning', message);

export const handleResponse = (response) => {
  const notificationTypes = ['success', 'error', 'info', 'warning'];
  notificationTypes.forEach((type) => {
    if (response[type] === true) {
      showToast(type, response.message);
    }
  });
};