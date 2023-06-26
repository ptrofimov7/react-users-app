import React, { useEffect, useRef } from 'react'
import styles from './Modal.module.css'

const Modal = ({ children, open, onClose }) => {

   const ref = useRef(null)
   const refFirstElement = useRef(null)
   const refLastElement = useRef(null)
   const lastActiveElement = useRef(null)

   const handleClose = () => {
      onClose()
      if (lastActiveElement.current) {
         lastActiveElement.current?.focus()
      }
   }

   useEffect(() => {
      lastActiveElement.current = document.activeElement
      const focusableElementsString = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]';
      const modal = ref.current
      if (modal) {
         const focusableElements = Array.from(modal.querySelectorAll(focusableElementsString));
         // The first focusable element within the modal window
         refFirstElement.current = focusableElements?.[0];
         // The last focusable element within the modal window
         refLastElement.current = focusableElements[focusableElements.length - 1];
         // Focus the window
         refFirstElement.current.focus();
      }
   }, [])

   return (
      <div className={`${styles.modalLayout} ${open ? styles.modalLayoutActive: ''}`} onClick={handleClose}>
         <div className={styles.modalWrapper}
            role='dialog'
            aria-labelledby="change-item"
            id="modal2"
            ref={ref}
            tabIndex={0}
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => {
               e.stopPropagation()
               if (e.key === 'Escape') {
                  handleClose()
                  return;
               }
               // Listen for the Tab key
               if (e.keyCode === 9) {
                  // If Shift + Tab
                  if (e.shiftKey) {
                     // If the current element in focus is the first focusable element within the modal window...
                     if (document.activeElement === refFirstElement.current) {
                        e.preventDefault();
                        // ...jump to the last focusable element
                        refLastElement.current?.focus();
                     }
                     // if Tab
                  } else {
                     // If the current element in focus is the last focusable element within the modal window...
                     // eslint-disable-next-line no-lonely-if
                     if (document.activeElement === refLastElement.current) {
                        e.preventDefault();
                        // ...jump to the first focusable element
                        refFirstElement.current?.focus();
                     }
                  }
               }
            }}>
            {children}
            <button aria-label="close" className={styles.btnClose} onClick={handleClose}>X</button>
         </div>
      </div>
   );
};

export default Modal