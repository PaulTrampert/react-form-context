import EventBroker from './util/EventBroker';
import delay from './util/delay';

class FormContext {
  constructor(name) {
    this.eventBroker = new EventBroker(name);
    this._isSubmitting = false;
    this._hasSubmitted = false;
    this._fields = [];
  }

  get fields() {
    return this._fields;
  }

  get isSubmitting() {
    return this._isSubmitting;
  }

  set isSubmitting(value) {
    this._isSubmitting = value;
    this.eventBroker.publish(this);
  }

  get hasSubmitted() {
    return this._hasSubmitted;
  }

  set hasSubmitted(value) {
    this._hasSubmitted = value;
    this.eventBroker.publish(this);
  }

  registerField = (field) => {
    this._fields.push(field);
  }

  isValid = async () => {
    while (this.fields.some(f => f.isValidating)) {
      await delay(100);
    }
    return this.fields.every(f => f.isValid);
  }
}

export default FormContext;