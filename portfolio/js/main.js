const burger = document.getElementById('burger');
const menu = document.getElementById('menu');
const menuLinks = document.querySelectorAll('.menu a');
const sections = document.querySelectorAll('main section');

burger.addEventListener('click', function () {
  menu.classList.toggle('open');
  burger.setAttribute('aria-expanded', menu.classList.contains('open'));
});

menuLinks.forEach(function (link) {
  link.addEventListener('click', function () {
    menu.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
  });
});

window.addEventListener('scroll', function () {
  let currentId = '';
  sections.forEach(function (section) {
    if (window.scrollY >= section.offsetTop - 120) {
      currentId = section.id;
    }
  });
  menuLinks.forEach(function (link) {
    const isCurrent = link.getAttribute('href') === '#' + currentId;
    link.classList.toggle('active', isCurrent && !link.classList.contains('btn'));
  });
});

const form = document.getElementById('form');
const successMessage = document.getElementById('ok');

function getError(field) {
  const value = field.value.trim();
  if (field.name === 'name' && value.length < 2) {
    return 'Please enter your name.';
  }
  if (field.name === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    return 'Please enter a valid email address.';
  }
  if (field.name === 'message' && value.length < 10) {
    return 'Your message should be at least 10 characters.';
  }
  return '';
}

function checkField(field) {
  const error = getError(field);
  const errorBox = form.querySelector('[data-for="' + field.name + '"]');
  errorBox.textContent = error;
  field.classList.toggle('invalid', error !== '');
  return error === '';
}

const fields = [form.elements.name, form.elements.email, form.elements.message];

fields.forEach(function (field) {
  field.addEventListener('blur', function () { checkField(field); });
});

form.addEventListener('submit', function (event) {
  event.preventDefault();
  successMessage.hidden = true;
  let allValid = true;
  fields.forEach(function (field) {
    if (!checkField(field)) allValid = false;
  });
  if (allValid) {
    successMessage.hidden = false;
    form.reset();
  }
});

document.getElementById('year').textContent = new Date().getFullYear();
