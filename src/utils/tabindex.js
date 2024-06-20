//for all modals

export const disableBodyTabbing = modalRef => {
  const tabbableElements = document.querySelectorAll('body *');
  tabbableElements.forEach(el => {
    if (!modalRef?.current?.contains(el)) {
      el.setAttribute('data-tabindex', el.getAttribute('tabindex') || '');
      el.setAttribute('tabindex', '-1');
    }
  });
};

export const enableBodyTabbing = modalRef => {
  const tabbableElements = document.querySelectorAll('body *[data-tabindex]');
  tabbableElements.forEach(el => {
    if (!modalRef?.current?.contains(el)) {
      const originalTabindex = el.getAttribute('data-tabindex');
      if (originalTabindex) {
        el.setAttribute('tabindex', originalTabindex);
      } else {
        el.removeAttribute('tabindex');
      }
      el.removeAttribute('data-tabindex');
    }
  });
};
