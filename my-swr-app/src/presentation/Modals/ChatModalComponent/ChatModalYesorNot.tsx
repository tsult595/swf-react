
import { useEffect } from 'react';
import Swal from 'sweetalert2';

interface ChatModalYesorNotProps {
  clanName: string;
  onYes: () => void;
  onNo: () => void;
}

const ChatModalYesorNot = ({ clanName, onYes, onNo }: ChatModalYesorNotProps) => {
  useEffect(() => {
    Swal.fire({
      title: `Хотите присоединиться к клану "${clanName}"?`,
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Да",
      denyButtonText: "Нет"
    }).then((result) => {
      if (result.isConfirmed) {
        onYes();
      } else if (result.isDenied) {
        onNo();
      }
    });
  }, [clanName, onYes, onNo]);

  return null; // Since Swal handles the UI
};

export default ChatModalYesorNot;