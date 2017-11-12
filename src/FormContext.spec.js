import FormContextInjector from 'inject-loader!./FormContext';
import jasmineAsync from './testUtil/jasmineAsync';

describe('FormContext', () => {
  let FormContext;
  let eventBroker;
  let delay;

  beforeEach(() => {
    eventBroker = jasmine.createSpyObj('eventBroker', ['publish', 'subscribe']);
    delay = jasmine.createSpy('delay');
    FormContext = FormContextInjector({
      './util/EventBroker': () => eventBroker,
      './util/delay': delay
    }).default;
  });

  describe('constructor', () => {
    let subject;
    beforeEach(() => {
      subject = new FormContext();
    });

    it('sets isSubmitting to be false', () => {
      expect(subject.isSubmitting).toBe(false);
    });

    it('sets hasSubmitted to be false', () => {
      expect(subject.hasSubmitted).toBe(false);
    });

    it('sets fields to be an empty array', () => {
      expect(subject.fields).toEqual([]);
    });

    it('publishes itself when isSubmitting is updated', () => {
      subject.isSubmitting = true;
      expect(eventBroker.publish).toHaveBeenCalledWith(subject);
    });

    it('publishes itself when hasSubmitted is updated', () => {
      subject.hasSubmitted = true;
      expect(eventBroker.publish).toHaveBeenCalledWith(subject);
    });

    it('does not publish itself if isSubmitting or hasSubmitted has not changed', () => {
      subject.isSubmitting = false;
      subject.hasSubmitted = false;
      expect(eventBroker.publish).not.toHaveBeenCalled();
    });
  });

  describe('isValid', () => {
    let subject;
    beforeEach(() => {
      subject = new FormContext();
    });

    it('returns true when all the fields are valid', jasmineAsync(async () => {
      subject.registerField({isValidating: false, isValid: true});
      expect(await subject.isValid()).toBe(true);
    }));

    it('delays if any fields are still validating', jasmineAsync(() => {
      let validatingField = {isValidating: true, isValid: false};
      subject.registerField({isValidating: false, isValid: true});
      subject.registerField(validatingField);
      let promise = subject.isValid()
        .then(result => {
          expect(result).toBe(false);
        });
      expect(delay).toHaveBeenCalled();
      validatingField.isValidating = false;
      return promise;
    }));

    it('returns false if any fields are invalid', jasmineAsync(async () => {
      subject.registerField({isValidating: false, isValid: true});
      subject.registerField({isValidating: false, isValid: false});
      expect(await subject.isValid()).toBe(false);
    }));
  });

  describe('subscribe', () => {
    let subject;
    let handler;
    let unsubscribe;

    beforeEach(() => {
      handler = jasmine.createSpy('handler');
      unsubscribe = jasmine.createSpy('unsubscribe');
      eventBroker.subscribe.and.returnValue(unsubscribe);
      subject = new FormContext();
    });

    it('subscribes to the underlying EventBroker', () => {
      subject.subscribe(handler);
      expect(eventBroker.subscribe).toHaveBeenCalledWith(handler);
    });

    it('returns the unsubscribe function returned by the event broker', () => {
      let result = subject.subscribe(handler);
      expect(result).toBe(unsubscribe);
    });
  });
});