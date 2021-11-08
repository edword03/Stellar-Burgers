import React from 'react';
import overlayStyles from './ModalOverlay.module.css';

type TModalOverlayProp = {
  children: React.ReactNode
  onClose: () => void
}

export const ModalOverlay: React.FC<TModalOverlayProp> = ({ children, onClose }) => {
  return (
    <div className={overlayStyles.overlay} onClick={onClose}>
      {children}
    </div>
  );
};