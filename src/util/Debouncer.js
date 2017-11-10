import delay from './delay';

class Debouncer {
  constructor(defaultTimeout = 250) {
    this.defaultTimeout = defaultTimeout;
    this.idx = 0;
  }

  debounce = async (fn, options = {timeout: this.defaultTimeout, swallowDebounce: false}) => {
    let idx = ++this.idx;
    await delay(options.timeout);
    if (idx !== this.idx) {
      if (options.swallowDebounce) return;
      throw new Debounce();
    }
    let result = await fn();
    if (idx !== this.idx) {
      if (options.swallowDebounce) return;
      throw new Debounce();
    }
    return result;
  }

  cancel = () => {
    this.idx++;
  }

  swallowDebounce = (error) => {
    if (!(error instanceof Debounce)) {
      throw error;
    }
  }
}

class Debounce {

}

export default Debouncer;