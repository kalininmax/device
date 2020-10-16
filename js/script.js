const overlayModal = document.querySelector('.modal-overlay');
const mapLink = document.querySelector('.contacts-map-link');
const mapModal = document.querySelector('.modal-map');
const feedbackLink = document.querySelector('.feedback-link');
const feedbackModal = document.querySelector('.modal-feedback');
const feedbackForm = feedbackModal.querySelector('.feedback-form');
const feedbackName = feedbackModal.querySelector('#feedback-name');
const feedbackEmail = feedbackModal.querySelector('#feedback-email');
const feedbackMessage = feedbackModal.querySelector('#feedback-message');
const feedbackSubmitButton = feedbackModal.querySelector('.button-submit');
const promoSlide = document.querySelectorAll('.promo-slider-item');
const promoSliderButton = document.querySelectorAll('.promo-slider-controls-button');
const servicesSlide = document.querySelectorAll('.services-slider-item');
const servicesSliderButton = document.querySelectorAll('.services-controls-button');

let isStorageSupport = true;
let storage = {};

try {
  storage.name = localStorage.getItem('name');
  storage.email = localStorage.getItem('email');
  storage.message = localStorage.getItem('message');
} catch (err) {
  isStorageSupport = false;
};

feedbackForm.addEventListener('submit', function(evt) {
  if (!feedbackName.value || !feedbackEmail.value || !feedbackMessage.value) {
    evt.preventDefault();
    feedbackModal.classList.remove('modal-error');
    feedbackModal.offsetWidth = feedbackModal.offsetWidth;
    feedbackModal.classList.add('modal-error');
  } else {
    if (isStorageSupport) {
      localStorage.setItem('name', feedbackName.value);
      localStorage.setItem('email', feedbackEmail.value);
      localStorage.setItem('message', feedbackMessage.value);
    }
  }
});

mapLink.addEventListener('click', function (evt) {
  evt.preventDefault();
  overlayModal.classList.add('modal-overlay-show');
  mapModal.classList.add('modal-show');
});

feedbackLink.addEventListener('click', function(evt) {
  evt.preventDefault();
  overlayModal.classList.add('modal-overlay-show');
  feedbackModal.classList.add('modal-show');
  if (storage.name !== null) {
    feedbackName.value = storage.name;
    feedbackEmail.value = storage.email;
    feedbackMessage.value = storage.message;
    feedbackSubmitButton.focus();
  } else {
    feedbackName.focus();
  }
});

function removeModal(modalName, evt) {
  evt.preventDefault();
  overlayModal.classList.remove('modal-overlay-show');
  modalName.classList.remove('modal-show');
  modalName.classList.remove('modal-error');
};

function modalClose(modalName) {
  modalName.querySelector('.modal-close').addEventListener('click', function(evt) {
    removeModal(modalName,evt);
  });
  window.addEventListener('keydown', function(evt) {
    if (evt.key === 'Escape') {
      if (modalName.classList.contains('modal-show')) {
        removeModal(modalName,evt);
      }
    }
  });
  overlayModal.addEventListener('click', function(evt) {
    removeModal(modalName,evt);
  });
};

function slider(sliderItem, controlsItem) {
  controlsItem.forEach(function (item, index) {
    item.addEventListener('click', function (evt) {
      evt.preventDefault();
      item.classList.add('current');
      sliderItem[index].classList.add('slider-item-show');
      for (let i = 0; i < controlsItem.length; i++) {
        if (i !== index) {
          sliderItem[i].classList.remove('slider-item-show');
          controlsItem[i].classList.remove('current');
        }
      }
    });
  });
};

function focusInsideModal(modalName) {
  let focusableElementsString = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]';
  let focusableElements = modalName.querySelectorAll(focusableElementsString);
  focusableElements = Array.prototype.slice.call(focusableElements);
  let firstTabStop = focusableElements[0];
  let lastTabStop = focusableElements[focusableElements.length - 1];
  firstTabStop.focus();
  modalName.addEventListener('keydown', function(evt) {
    if (evt.key === 'Tab') {
      if (evt.key === 'Shift') {
        if (document.activeElement === firstTabStop) {
          evt.preventDefault();
          lastTabStop.focus();
        }
      } else {
        if (document.activeElement === lastTabStop) {
          evt.preventDefault();
          firstTabStop.focus();
        }
      }
    }
  });
};

focusInsideModal(mapModal);
focusInsideModal(feedbackModal);

modalClose(feedbackModal);
modalClose(mapModal);

slider(promoSlide, promoSliderButton);
slider(servicesSlide, servicesSliderButton);