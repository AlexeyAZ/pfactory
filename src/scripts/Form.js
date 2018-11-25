export default class Form {
  constructor(form) {
    this.form = document.querySelector(form);
    this.valid = false;
    this.button = null;
    this.validClass = 'input__field_valid';
    this.invalidClass = 'input__field_invalid';
  }

  isValid() {
    return this.valid;
  }

  setValid(input) {
    if (input.classList.contains(this.invalidClass)) {
      input.classList.remove(this.invalidClass);
    }
    input.classList.add(this.validClass);
  }

  setInvalid(input) {
    if (input.classList.contains(this.validClass)) {
      input.classList.remove(this.validClass);
    }
    input.classList.add(this.invalidClass);
  }

  setButtonState() {
    if (this.valid) {
      this.button.removeAttribute('disabled');
    }else {
      this.button.setAttribute('disabled', true);
    }
  }

  validateForm() {
    const fields = this.form.querySelectorAll('.input__field[required]');
    const valid = [];
    [...fields].forEach(field => {
      if (field.classList.contains(this.invalidClass) || !field.classList.contains(this.validClass)) {
        valid.push(false);
      }else if (field.classList.contains(this.validClass)) {
        valid.push(true);
      }
    });

    this.valid = valid.every(element => element === true);

    this.setButtonState();
  }

  validateField(input) {
    if (input.value !== '') {
      this.setValid(input);
    }else {
      this.setInvalid(input);
    }
    this.validateForm();
  }

  init() {
    const fields = this.form.querySelectorAll('.input__field[required]');
    this.button = this.form.querySelector('.button');

    this.setButtonState();

    [...fields].forEach(input => {
      input.addEventListener('input', e => {
        this.validateField(input);
      });
    });

  }
}
