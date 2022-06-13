import { ReactElement } from 'react';
import ReactDOM from 'react-dom';

interface Props {
  children: ReactElement | ReactElement[];
}

function ModalPortal({ children }: Props) {
  return ReactDOM.createPortal(children, document.querySelector('#modal'));
}

export default ModalPortal;
