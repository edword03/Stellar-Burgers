import React from 'react';
import overlayStyles from './ModalOverlay.module.css';
import PropTypes from 'prop-types';

export const ModalOverlay = ({ children, onClose }) => {
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
    document.addEventListener('keydown', closeModalOnKey);
    return () => document.removeEventListener('keydown', closeModalOnKey);
  }, [closeModalOnKey]);

  return (
    <div className={overlayStyles.overlay} onClick={onClose}>
      {children}
    </div>
  );
};

ModalOverlay.propTypes = {
  children: PropTypes.node.isRequired, 
  onClose: PropTypes.func.isRequired, 
}