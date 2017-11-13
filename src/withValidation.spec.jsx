import withValidationInjector from 'inject-loader!./withValidation';
import {shallow} from 'enzyme';
import React from 'react';
import jasmineAsync from './testUtil/jasmineAsync';

function Element() {
  return <hr />;
}

describe("withValidation", () => {
  let withValidation;

  beforeEach(() => {
    withValidation = withValidationInjector({}).default;
  });

  it('returns a component', () => {
    let result = withValidation('input');
    expect(result).toEqual(jasmine.any(Function));
  });

  describe('returned component', () => {
    let Component;

    beforeEach(() => {
      Component = withValidation(Element);
    });

    describe('isValidating', () => {
      it('returns state.isValidating', () => {
        let subject = shallow(<Component />);
        expect(subject.instance().isValidating).toBe(subject.state().isValidating);
      });
    });

    describe('isValid', () => {
      it('returns true if there are no validationErrors', () => {
        let subject = shallow(<Component />);
        expect(subject.instance().isValid).toBe(true);
      });

      it('returns false if there are validation errors', () => {
        let subject = shallow(<Component />);
        subject.setState({validationErrors: ['it broke']});
        expect(subject.instance().isValid).toBe(false);
      });
    });

    describe('render', () => {
      it('passes through unknown props', () => {
        let subject = shallow(<Component herp='derp' />);
        expect(subject.find(Element).prop('herp')).toEqual('derp');
      });

      it('passes through name', () => {
        let subject = shallow(<Component name='derp' />);
        expect(subject.find(Element).prop('name')).toEqual('derp');
      });

      it('passes through value', () => {
        let subject = shallow(<Component value='derp' />);
        expect(subject.find(Element).prop('value')).toEqual('derp');
      });

      it('passes validationErrors as a prop', () => {
        let subject = shallow(<Component />);
        expect(subject.find(Element).prop('validationErrors')).toEqual([]);
      });

      it('passes isValidating as a prop', () => {
        let subject = shallow(<Component />);
        expect(subject.find(Element).prop('isValidating')).toBe(subject.state().isValidating);
      });
    });

    describe('validate', () => {
      let subject;
      let validator1;
      let validator2;
      let onValidated;

      beforeEach(() => {
        validator1 = jasmine.createSpy('validator1').and.returnValue(null);
        validator2 = jasmine.createSpy('validator2').and.returnValue(Promise.resolve('it broke'));
        onValidated = jasmine.createSpy('onValidated');
        subject = shallow(<Component validators={[validator1, validator2]} name='derp' value='herp' onValidated={onValidated} />);
      });

      it('calls each validator', jasmineAsync(async () => {
        await subject.instance().validate();
        expect(validator1).toHaveBeenCalledWith('herp');
        expect(validator2).toHaveBeenCalledWith('herp');
      }));

      it('triggers the onValidatedEvent', jasmineAsync(async () => {
        await subject.instance().validate();
        expect(onValidated).toHaveBeenCalledWith({name: "derp", value: 'herp', validationErrors: ['it broke']});
      }));

      it('sets the validationErrors in state', jasmineAsync(async () => {
        await subject.instance().validate();
        expect(subject.state().validationErrors).toEqual(['it broke']);
      }));
    });
  });
});