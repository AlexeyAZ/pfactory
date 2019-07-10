const EMAIL_REG_EX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const isEmpty = value => !value && value !== 0;
const isEmail = value => EMAIL_REG_EX.test(String(value).toLowerCase());

const required = message => ({
  validate: value => !isEmpty(value),
  message: message || 'Обязательное поле',
  key: 'required'
});

const email = message => ({
  validate: val => isEmail(val),
  message: message || 'Введите валидный email',
  key: 'email'
});

export default {
  required,
  email
};
