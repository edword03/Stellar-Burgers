import React from 'react';
import ReactDOM from 'react-dom'
import { ModalOverlay } from '../ModalOverlay';
import modalStyles from './Modal.module.css';
import PropTypes from 'prop-types';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

export const Modal = ({ onClose, children, isVisible, title, paddingBottom }) => {
  const closeModalOnKey = React.useCallback(
    e => {
      if (e.key === 'Escape') {
        onClose();
        console.log(1);
      }
    },
    [onClose],
  );

  React.useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', closeModalOnKey);
    return () => {
      document.body.style.overflow = 'visible';
      document.removeEventListener('keydown', closeModalOnKey);
    };
  }, [closeModalOnKey]);

  return ReactDOM.createPortal(
    <ModalOverlay onClose={onClose}>
      <div
        className={`p-10 ${modalStyles.modal} ${paddingBottom || 'pb-15'}`}
        onClick={e => e.stopPropagation()}>
        <div className={`${title ? modalStyles.headDetails : modalStyles.headOrder}`}>
          {title && <h2 className="text text_type_main-large">{title}</h2>}
          <span style={{ cursor: 'pointer' }}>
            <CloseIcon onClick={onClose} />
          </span>
        </div>
        <div className={modalStyles.content}>{children}</div>
      </div>
    </ModalOverlay>,
    document.getElementById('root-modal')
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  isVisible: PropTypes.bool,
  paddingBottom: PropTypes.string,
  title: PropTypes.string,
};
