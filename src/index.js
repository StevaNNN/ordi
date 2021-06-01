// function responsible for flagging if element is in view
const isFullySeen = el => el &&
  typeof el.getBoundingClientRect === 'function' &&
  el.getBoundingClientRect()['top'] + window.scrollY + (window.innerHeight / 2) <=
  window.innerHeight + window.scrollY;

// scrooling entire page to top clicking on footer logo
$('#footerLogo').click(function () {
  window.scrollTo(0, 0);
});

// code responsible for cliking on get started buttn on intro section
$('.get-started').click(function () {
  $('.nav-item.pricing').addClass('active');
  $('.nav-item.intro').removeClass('active');
  $('html, body').animate({
    scrollTop: $('#pricing').offset().top - 102
  }, 200)
});

// code responsible for scrolling entire page to top on page load
$(document).ready(function () {
  $('html, body').animate({
    scrollTop: $('#intro').offset().top
  }, 300);
  $('.section.intro').addClass('in-view')
})

// code responsible for navigation clicks
$('.nav-item').click(function () {
  $(this).addClass('active');
  $(this).siblings().removeClass('active');
  $('.sidemenu-wrap').removeClass('shown');
  $('.navi-trigger').removeClass('cross');
  $('.language-menu').removeClass('active');

  if ($(this).hasClass('intro')) {
    window.scrollTo(0, 0);
  }
  if ($(this).hasClass('service')) {
    $('html, body').animate({
      scrollTop: $('#service').offset().top
    }, 300);
    setTimeout(function () {
      $('#service').addClass('in-view');
    }, 300);
  }
  if ($(this).hasClass('team')) {
    $('html, body').animate({
      scrollTop: $('#team').offset().top
    }, 300);
    setTimeout(function () {
      $('#team').addClass('in-view');
    }, 300);
  }
  if ($(this).hasClass('pricing')) {
    $('html, body').animate({
      scrollTop: $('#pricing').offset().top
    }, 300);
    setTimeout(function () {
      $('#pricing').addClass('in-view');
    }, 300);
  }
  if ($(this).hasClass('contact')) {
    $('html, body').animate({
      scrollTop: $('#contact').offset().top
    }, 300);
    setTimeout(function () {
      $('#contact').addClass('in-view');
    }, 300);
  }
})

/// scrolling on specific section result in giving that section in view section
$(window).scroll(function () {
  $('.section').each(function () {
    if (isFullySeen(this) === true) {
      $(this).addClass('in-view');
    }
  });
});

$(window).scroll(function () {
  var windscroll = $(window).scrollTop();
  if (windscroll >= 102) {
    $('.language-menu').removeClass('active');
    $('.section').each(function (i) {
      if ($(this).position().top <= windscroll + 102) {
        $('.nav-item:not(.sidemenu-list-item).active').removeClass('active');
        $('.nav-item:not(.sidemenu-list-item)').eq(i).addClass('active');
      }
    });

  }
}).scroll();

// language menu click handler
$('.language-menu').click(function () {
  if ($(this).hasClass('active')) {
    $(this).removeClass('active');
  } else {
    $(this).addClass('active');
  }
});

// hamburger click handler
$('.hamburger').click(function () {
  $('.language-menu').removeClass('active');
  if ($(this).hasClass('active')) {
    $(this).removeClass('active');
    $('.sidemenu-wrap').removeClass('shown');
  } else {
    $(this).addClass('active');
    $('.sidemenu-wrap').addClass('shown');
  }
});

/// hamburger fancier menu click handler
$('.navi-trigger').click(function () {
  $('.language-menu').removeClass('active');
  if ($(this).hasClass('cross')) {
    $(this).removeClass('cross');
    $('.sidemenu-wrap').removeClass('shown');
  } else {
    $(this).addClass('cross')
    $('.sidemenu-wrap').addClass('shown');
  }
})

const userEmailInput = document.getElementById('start');
const registerBtn = document.getElementById('register-company');
const BASE_URL = window.location.href.includes('localhost') ? "http://localhost:8080/api/v1" : "https://ordi-api.herokuapp.com/api/v1";

registerBtn.addEventListener('submit', (ev) => {
  ev.preventDefault();
  const email = userEmailInput.value;
  fetch(`${BASE_URL}/company/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email })
  })
  .then(response => response.json())
  .then(data => {
    showToast(data.message, data.type);
  })
  .catch(error => {
    showToast(error.message);
  })
});

const contactInfo = {
  firstName: document.getElementById('name'),
  lastName: document.getElementById('lastName'),
  email: document.getElementById('email'),
  text: document.getElementById('text'),
};
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (ev) => {
  ev.preventDefault();
  fetch(`${BASE_URL}/message/contact`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      firstName: contactInfo.firstName.value,
      lastName: contactInfo.lastName.value,
      email: contactInfo.email.value,
      text: contactInfo.text.value
    })
  })
  .then(response => response.json())
  .then(data => {
    showToast(data.message, data.type,  true);
  })
  .catch(error => {
    showToast(error.message);
  })
});

const toast = document.querySelector('.toast'),
  toastBody = document.querySelector('.toast-body'),
  toastHeader = document.querySelector('.toast-header'),
  toastIcon = document.querySelector('.toast-icon');

const showToast = (message, type, contactForm) => {
  toastBody.textContent = message;
  toast.style.opacity = '1';

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.classList.remove('info');
    toast.classList.remove('success');
    toast.classList.remove('error');
    toastIcon.classList.remove('error-icon');
    toastIcon.classList.remove('info-icon');
    toastIcon.classList.remove('check-icon');
  }, 3000);

  if(contactForm) {
    toast.classList.add("success");
    toastHeader.textContent = 'Message sent';
    toastIcon.classList.add('check-icon');
  } else if (type === "info") {
    toast.classList.add('info');
    toastHeader.textContent = 'Already exists';
    toastIcon.classList.add('info-icon');
  } else if (type === "success") {
    toast.classList.add("success");
    toastHeader.textContent = 'Check your email';
    toastIcon.classList.add('check-icon');
  } else {
    toast.classList.add('error');
    toastHeader.textContent = 'Something went wrong';
    toastIcon.classList.add('error-icon');
  }
};
