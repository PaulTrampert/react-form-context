import FormContext from './FormContext';

describe('FormContext', () => {
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
  });
});