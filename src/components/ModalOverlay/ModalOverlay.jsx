import React from 'react';
import overlayStyles from './ModalOverlay.module.css';
import PropTypes from 'prop-types';

export const ModalOverlay = ({ children, onClose }) => {
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