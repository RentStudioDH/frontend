import Swal from 'sweetalert2';

const ErrorModal = ({ errorMessages, onClose }) => {
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    html: `<ul>${errorMessages.map((msg, index) => `<li key=${index}>${msg}</li>`).join('')}</ul>`,
    confirmButtonText: 'Entendido',
    confirmButtonColor: '#A62639'
  }).then(() => {
    onClose();
  });

  return null; // This component doesn't render anything itself, it just triggers the Swal modal
};

export default ErrorModal;
