const mapLink = document.querySelector('.contacts-map-link');
const mapModal = document.querySelector('.modal-map');
const feedbackLink = document.querySelector('.feedback-link');
const feedbackModal = document.querySelector('.modal-feedback');
const feedbackForm = feedbackModal.querySelector('.feedback-form');
const feedbackName = feedbackModal.querySelector('#feedback-name');
const feedbackEmail = feedbackModal.querySelector('#feedback-email');
const feedbackMessage = feedbackModal.querySelector('#feedback-message');
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

mapLink.addEventListener('click', function (evt) {
  evt.preventDefault();
  mapModal.classList.add('modal-show');
});

feedbackLink.addEventListener('click', function(evt) {
  evt.preventDefault();
  feedbackModal.classList.add('modal-show');
  if (storage) {
    feedbackName.value = storage.name;
    feedbackEmail.value = storage.email;
    feedbackMessage.value = storage.message;
  } else {
    feedbackName.focus();
  }
});

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

function modalClose(modalName) {
  modalName.querySelector('.modal-close').addEventListener('click', function(evt) {
    evt.preventDefault(); 
    modalName.classList.remove('modal-show');
    modalName.classList.remove('modal-error');
  });
  window.addEventListener('keydown', function(evt) {
    if (evt.key === 'Escape') {
      if (modalName.classList.contains('modal-show')) {
        evt.preventDefault();
        modalName.classList.remove('modal-show');
        modalName.classList.remove('modal-error');
      }
    }
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

modalClose(feedbackModal);
modalClose(mapModal);

slider(promoSlide, promoSliderButton);
slider(servicesSlide, servicesSliderButton);
