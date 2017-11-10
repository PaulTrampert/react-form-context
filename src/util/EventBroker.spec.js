import EventBroker from './EventBroker.js';

describe('EventBroker', () => {
  describe('constructor', () => {
    it('defaults the name to EventBroker #\\d', () => {
      let subject = new EventBroker();
      expect(subject.name).toMatch(/EventBroker #\d+/);
    });

    it('sets the name to the specified name if given', () => {
      let subject = new EventBroker("TestBroker");
      expect(subject.name).toEqual("TestBroker");
    });
  });

  describe('publish', () => {
    let subject;
    let handler1;
    let handler2;
    let event;

    beforeEach(() => {
      subject = new EventBroker();
      handler1 = jasmine.createSpy('handler1');
      handler2 = jasmine.createSpy('handler2');
      subject.subscribe(handler1);
      subject.subscribe(handler2);
      event = {
        herp: 'derp'
      };
    });

    it('calls each handler with the event once', () => {
      subject.publish(event);
      expect(handler1).toHaveBeenCalledWith(event);
      expect(handler1).toHaveBeenCalledTimes(1);
      expect(handler2).toHaveBeenCalledWith(event);
      expect(handler2).toHaveBeenCalledTimes(1);
    });
  });

  describe('subscribe', () => {
    let subject;
    let handler;

    beforeEach(() => {
      subject = new EventBroker();
      handler = jasmine.createSpy('handler');
    });

    it('adds the handler to subscribers', () => {
      subject.subscribe(handler);
      expect(subject.subscribers).toContain(handler);
    });

    it('returns a function that removes the handler from subscribers', () => {
      let unsubscribe = subject.subscribe(handler);
      expect(subject.subscribers).toContain(handler);
      unsubscribe();
      expect(subject.subscribers).not.toContain(handler);
    });
  });
});