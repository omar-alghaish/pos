import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Button from '../button/Index';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info' | 'warning';
  onConfirm?: () => void; // Optional confirm
  onCancel?: () => void;  // Optional cancel
  onClose?: () => void;   // Callback when toast closes
  autoClose?: boolean;    // Whether the toast should auto-close
  duration?: number;      // Duration for auto-close (in ms)
}

const Toast: React.FC<ToastProps> = ({
  message,
  type = 'warning',
  onConfirm,
  onCancel,
  onClose,
  autoClose = true,
  duration = 5000,
}) => {
  const toastRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const timeline = useRef<GSAPTimeline>();

  useEffect(() => {
    if (toastRef.current) {
      timeline.current = gsap.timeline();
      
      // Animate toast entrance
      timeline.current.fromTo(
        toastRef.current,
        { opacity: 0, x: 100 },
        { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' }
      );

      // Auto-close if `onConfirm` and `onCancel` are not provided and `autoClose` is true
      if (autoClose && (!onConfirm && !onCancel)) {
        const closeTimeout = setTimeout(() => handleClose(), duration);
        return () => clearTimeout(closeTimeout); // Clear timeout if component unmounts early
      }
    }
  }, [autoClose, duration, onConfirm, onCancel]);

  // Handle close animation
  const handleClose = () => {
    if (timeline.current && toastRef.current) {
      timeline.current.to(toastRef.current, {
        opacity: 0,
        x: 100,
        duration: 0.5,
        ease: 'power2.in',
        onComplete: () => {
          if (onClose) onClose();
        },
      });
    }
  };

  // If the user clicks anywhere outside the toast, trigger an attention animation
  const handleClickOutside = () => {
    if (onConfirm || onCancel) {
      gsap.to(toastRef.current, {
        x: -10,
        yoyo: true,
        repeat: 5,
        duration: 0.05,
        ease: 'power1.inOut',
      });
    }
  };

  return (
    <div>
      {/* Optional overlay to block page interactions */}
      {(onConfirm || onCancel) && (
        <div
          ref={overlayRef}
          className="toast-overlay"
          onClick={handleClickOutside}
        />
      )}
      <div ref={toastRef} className={`toast toast-${type}`}>
        <div className="toast-message">{message}</div>
        <div className="toast-actions">
          {onConfirm && (
            <Button variant='contained'  className="confirm-btn" onClick={onConfirm}>
              Confirm
            </Button>
          )}
          {onCancel && (
            <Button variant='text' className="cancel-btn" onClick={onCancel}>
              Cancel
            </Button >
          )}
        </div>
      </div>
    </div>
  );
};

export default Toast;
