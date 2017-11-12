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
    if (this._isSubmitting !== value) {
      this._isSubmitting = value;
      this.eventBroker.publish(this);
    }
  }

  get hasSubmitted() {
    return this._hasSubmitted;
  }

  set hasSubmitted(value) {
    if (this._hasSubmitted !== value) {
      this._hasSubmitted = value;
      this.eventBroker.publish(this);
    }
  }

  registerField = (field) => {
    this._fields = this._fields.concat(field);
  }

  isValid = async () => {
    while (this.fields.some(f => f.isValidating)) {
      await delay(100);
    }
    return this.fields.every(f => f.isValid);
  }

  subscribe = (handler) => {
    return this.eventBroker.subscribe(handler);
  }
}

export default FormContext;