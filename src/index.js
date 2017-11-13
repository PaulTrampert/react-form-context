import 'babel-polyfill';
import Form from './Form';
import FormContext from './FormContext';
import formContextAware from './formContextAware';
import withValidation from './withValidation';

let index = {
  Form,
  FormContext,
  formContextAware,
  withValidation
};

export {
  Form,
  FormContext,
  formContextAware,
  index as default,
  withValidation
};