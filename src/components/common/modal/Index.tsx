import React, { useEffect, ReactNode } from 'react';
import { gsap } from 'gsap';
import Typography from '../typography/Index';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title }) => {
  // Effect to manage body scroll when modal opens
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'; // Prevent scrolling
    } else {
      document.body.style.overflow = 'unset'; // Allow scrolling
    }
    
    return () => {
      document.body.style.overflow = 'unset'; // Cleanup to allow scrolling when unmounted
    };
  }, [isOpen]);

  // Handle click outside modal to close it
  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    // Check if the target of the click is the overlay, not the modal content
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  // Animation on open
  useEffect(() => {
    if (isOpen) {
      gsap.fromTo('.modal', { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3 });
    }
  }, [isOpen]);

  return (
    <div className={`modal-overlay ${isOpen ? 'open' : ''}`} onClick={handleOverlayClick}>
      <div className={`modal ${isOpen ? 'open' : ''}`}>
        <div className="modal-header">
          <Typography variant='h2'>{title}</Typography>
        </div>
        <div className="modal-body">
          {children}
        </div>
        <div className="modal-footer">
          <button className="modal-close" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
