import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css';
import { BrowserRouter } from 'react-router-dom';

interface ModalProps {
  children: React.ReactNode
}

export default function modal (props: ModalProps) {
  setTimeout(() => {
    confirmAlert({
      overlayClassName: 'modal-overlay',
      customUI: () => {
        return <BrowserRouter>
          {props.children}
        </BrowserRouter>
      }
    });
  }, 0)
}