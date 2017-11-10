import getPassthroughProps from './getPassthroughProps.js';

class FakeClass {
  constructor(props) {
    this.props = props;
  }
}

FakeClass.propTypes = {
  prop1: '',
  prop2: ''
};

describe('getPassthroughProps', () => {
  let obj;

  beforeEach(() => {
    obj = new FakeClass({prop1: 'herp', prop2: 'derp', prop3: 'flerp'});
  });

  it('returns an object with only the props not defined in propTypes', () => {
    let result = getPassthroughProps(obj);

    expect(result).toEqual({prop3: 'flerp'});
  });
});