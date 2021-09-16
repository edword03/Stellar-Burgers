import React from 'react';
import { ModalOverlay } from '../ModalOverlay';
import modalStyles from './Modal.module.css';
import PropTypes from 'prop-types';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

export const Modal = ({ onClose, children, isVisible, title, paddingBottom }) => {
  React.useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => (document.body.style.overflow = 'visible');
  }, []);

  return (
    <ModalOverlay onClose={onClose}>
      <div className={`p-10 ${modalStyles.modal} ${paddingBottom || 'pb-15'}`} onClick={e => e.stopPropagation()}>
        <div className={`${title ? modalStyles.headDetails : modalStyles.headOrder}`}>
          {title && <h2 className="text text_type_main-large">{title}</h2>}
          <span style={{ cursor: 'pointer' }}>
            <CloseIcon onClick={onClose} />
          </span>
        </div>
        <div className={modalStyles.content}>{children}</div>
      </div>
    </ModalOverlay>
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  isVisible: PropTypes.bool,
  paddingBottom: PropTypes.string,
  title: PropTypes.string
};
