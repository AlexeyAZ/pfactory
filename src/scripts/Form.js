import imask from 'imask';
import rules from '../config/rules';

export default class Form {
  constructor(form, onSubmit) {
    this.form = document.querySelector(form);
    this.valid = false;
    this.button = null;
    this.validClass = 'input__field_valid';
    this.invalidClass = 'input__field_invalid';
    this.errorMessageClass = 'js-message-error';
    this.successMessageClass = 'js-message-success';
    this.messageClass = 'form__message';
    this.messageShowClass = 'form__message_show';
    this.onSubmit = onSubmit;
  }

  isValid() {
    return this.valid;
  }

  resetForm() {
    const fields = this.form.querySelectorAll('.input__field');
    fields.forEach(field => {
      field.value = '';
      field.classList.remove(this.validClass);
      field.classList.remove(this.invalidClass);
    });
    this.showMessage('clear');
    this.valid = false;
  }

  makePhoneMask() {
    const phoneFields = this.form.querySelectorAll('.input__field[name="phone"]');
    phoneFields.forEach(field => {
      const mask = imask(field, {mask: '+{0} (000) 000-00-00'});
      field.addEventListener('blur', () => {
        mask.updateOptions({lazy: true});
        if (mask.unmaskedValue.length !== 11) {
          mask.value = '';
        }
      });
      field.addEventListener('focus', () => {
        mask.updateOptions({lazy: false});
      });
    });
  }

  getFormData() {
    const fields = this.form.querySelectorAll('.input__field');
    const obj = {};
    fields.forEach(field => {
      obj[field.getAttribute('name')] = field.value;
    });
    return obj;
  }

  showMessage(type) {
    const messages = this.form.querySelectorAll(`.${this.messageClass}`);
    const successMessage = this.form.querySelector(`.${this.successMessageClass}`);
    const errorMessage = this.form.querySelector(`.${this.errorMessageClass}`);
    if (type === 'error') {
      errorMessage.classList.add(this.messageShowClass);
      successMessage.classList.remove(this.messageShowClass);
    }
    if (type === 'success') {
      errorMessage.classList.remove(this.messageShowClass);
      successMessage.classList.add(this.messageShowClass);
    }
    if (type === 'clear') {
      messages.forEach(message => {
        message.classList.remove(this.messageShowClass);
      });
    }
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
      this.button.classList.remove('button_disabled');
    }else {
      this.button.classList.add('button_disabled');
    }
  }

  validateForm() {
    const fields = this.form.querySelectorAll('.input__field[required], .input__field[type="email"]');
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

  validateFields() {
    const fields = this.form.querySelectorAll('.input__field[required], .input__field[type="email"]');
    [...fields].forEach(field => {
      this.validateField(field);
    });
  }

  validateField(field) {
    if (field.getAttribute('required') || field.getAttribute('type') === 'email') {
      let validField = true;
      if (field.getAttribute('required')) {
        validField = rules.required().validate(field.value);
      }
      if (field.getAttribute('type') === 'email') {
        validField = rules.email().validate(field.value);
      }
      if (validField) {
        this.setValid(field);
      }else {
        this.setInvalid(field);
      }
    }
    this.validateForm();
  }


  init() {
    const fields = this.form.querySelectorAll('.input__field[required]');
    this.button = this.form.querySelector('.button');

    this.makePhoneMask();

    this.button.addEventListener('click', e => {
      e.preventDefault();
      this.validateFields();
      if (!this.isValid()) {
        return this.showMessage('error');
      }
      return this.onSubmit();
    });

    this.setButtonState();

    [...fields].forEach(input => {
      input.addEventListener('input', () => {
        this.validateField(input);
        this.showMessage('clear');
      });
      input.addEventListener('blur', () => {
        this.validateField(input);
      });
    });

  }
}
