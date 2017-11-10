let i = 0;

class EventBroker {
  constructor(name = `EventBroker #${i++}`) {
    this.name = name;
    this.subscribers = [];
  }

  publish(event) {
    let promises = this.subscribers.map(sub => sub(event));
    return Promise.all(promises);
  }

  subscribe(handler) {
    this.subscribers.push(handler);
    return () => this.subscribers = this.subscribers.filter(subscriber => subscriber !== handler);
  }
}

export default EventBroker;