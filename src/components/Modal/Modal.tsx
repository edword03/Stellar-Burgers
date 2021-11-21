import React from 'react';
import ReactDOM from 'react-dom';
import { ModalOverlay } from '../ModalOverlay';
import modalStyles from './Modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from '../../services/hooks';

interface IModalProps {
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  paddingBottom?: string;
  smallTitle?: boolean;
  isTitle?: boolean;
  largeContainer?: boolean
}

export const Modal: React.FC<IModalProps> = ({
  onClose,
  children,
  title,
  paddingBottom,
  smallTitle,
  isTitle,
  largeContainer
}) => {
  const {number} = useSelector(store => store.feedModal.currentFeed)
  const closeModalOnKey = React.useCallback(
    (e: KeyboardEvent) => {
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

  const rootModal = document.getElementById('root-modal') as HTMLElement;

  return ReactDOM.createPortal(
    <ModalOverlay onClose={onClose}>
      <div
        className={`p-10 ${modalStyles.modal} ${paddingBottom || 'pb-15'}`}
        onClick={e => e.stopPropagation()}>
        <div className={`${title ? modalStyles.headDetails : isTitle ? modalStyles.headDetails : modalStyles.headOrder}`}>
          {title && (
            <h2
              className={`text ${
                smallTitle ? 'text text_type_digits-default' : 'text_type_main-large'
              }`}>
              {title}
            </h2>
          )}
          {isTitle && <h2 className={`text ${'text text_type_digits-default'}`}>{'#' + number}</h2>}
          <span style={{ cursor: 'pointer' }}>
            <CloseIcon type="primary" onClick={onClose} />
          </span>
        </div>
        <div className={`${largeContainer ? modalStyles.largeContainer : modalStyles.content }`}>{children}</div>
      </div>
    </ModalOverlay>,
    rootModal,
  );
};
