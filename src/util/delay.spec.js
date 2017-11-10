import delayInjector from 'inject-loader!./delay';
import jasmineAsync from '../testUtil/jasmineAsync';

describe('delay', () => {
  let delay;
  let window;
  beforeEach(() => {
    window = jasmine.createSpyObj('window', ['setTimeout']);
    window.setTimeout.and.callFake((fn) => {
      fn();
    });

    delay = delayInjector({
      './window': window
    }).default;
  });

  it('returns a promise', () => {
    let result = delay(5);
    expect(result).toEqual(jasmine.any(Promise));
  });

  it('resolves the promise after the timeout', jasmineAsync(async () => {
    await delay(5);
    expect(window.setTimeout).toHaveBeenCalledWith(jasmine.any(Function), 5);
  }));
});