// import { FC, ReactNode } from 'react';

// type DrawerVariant = 'temporary' | 'persistent' | 'permanent';
// type DrawerDirection = 'left' | 'right' | 'top' | 'bottom';

// interface DrawerProps {
//   open: boolean;
//   onClose?: () => void;
//   variant: DrawerVariant;
//   direction?: DrawerDirection;
//   children: ReactNode;
//   width?: string;
// }

// const Drawer: FC<DrawerProps> = ({
//   open,
//   onClose,
//   variant,
//   direction = 'left',
//   children,
//   width = '250px', // default width
// }) => {
//   // Overlay close handler
//   const handleOverlayClick = () => {
//     if (variant === 'temporary' && onClose) {
//       onClose();
//     }
//   };

//   // Set style for width
//   const drawerStyle = {
//     width: direction === 'left' || direction === 'right' ? width : '100vw',
//     height: direction === 'top' || direction === 'bottom' ? width : '100vh',
//   };

//   return (
//     <>
//       {/* Overlay for temporary variant */}
//       {variant === 'temporary' && open && (
//         <div className="overlay" onClick={handleOverlayClick} />
//       )}
//       {/* Drawer itself */}
//       <div
//         className={`drawer_container ${variant} ${direction} ${open ? 'open' : ''}`}
//         style={drawerStyle} // Apply the drawer style
//       >
//         <div className="drawerContent">{children}</div>
//       </div>
//     </>
//   );
// };

// export default Drawer;


import { FC, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

type DrawerVariant = 'temporary' | 'persistent' | 'permanent';
type DrawerDirection = 'left' | 'right' | 'top' | 'bottom';

interface DrawerProps {
  open: boolean;
  onClose?: () => void;
  variant: DrawerVariant;
  direction?: DrawerDirection;
  children: ReactNode;
  width?: string;
}

const Drawer: FC<DrawerProps> = ({
  open,
  onClose,
  variant,
  direction = 'left',
  children,
  width = '250px', // default width
}) => {
  const { i18n } = useTranslation();

  // Determine the direction based on the current language
  const computedDirection =
    direction === 'left' || direction === 'right'
      ? i18n.language === 'ar' ? 'right' : 'left'
      : direction;

  // Overlay close handler
  const handleOverlayClick = () => {
    if (variant === 'temporary' && onClose) {
      onClose();
    }
  };

  // Set style for width and height based on direction
  const drawerStyle = {
    width: computedDirection === 'left' || computedDirection === 'right' ? width : '100vw',
    height: computedDirection === 'top' || computedDirection === 'bottom' ? width : '100vh',
  };

  return (
    <>
      {/* Overlay for temporary variant */}
      {variant === 'temporary' && open && (
        <div className="overlay" onClick={handleOverlayClick} />
      )}
      {/* Drawer itself */}
      <div
        className={`drawer_container ${variant} ${computedDirection} ${open ? 'open' : ''}`}
        style={drawerStyle} // Apply the drawer style
      >
        <div className="drawerContent">{children}</div>
      </div>
    </>
  );
};

export default Drawer;
