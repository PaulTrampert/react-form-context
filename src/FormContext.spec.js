import FormContextInjector from 'inject-loader!./FormContext';

describe('FormContext', () => {
  describe('constructor', () => {
    let FormContext;
    let subject;
    let eventBroker;
    beforeEach(() => {
      eventBroker = jasmine.createSpyObj('eventBroker', ['publish']);
      FormContext = FormContextInjector({
        './util/EventBroker': () => eventBroker
      }).default;
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
});