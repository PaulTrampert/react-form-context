import formContextAwareInjector from 'inject-loader!./formContextAware';
import {mount, shallow} from 'enzyme';
import FormContext from './FormContext';
import React from 'react';

function Element() {
  return <hr />;
}

describe('formContextAware', () => {
  let formContextAware;

  beforeEach(() => {
    formContextAware = formContextAwareInjector({}).default;
  });

  it('returns a component', () => {
    expect(formContextAware(Element)).toEqual(jasmine.any(Function));
  });

  describe('the returned component', () => {
    let Component;
    let context;
    let unsubscribe;

    beforeEach(() => {
      Component = formContextAware(Element);
      unsubscribe = jasmine.createSpy('unsubscribe');
      context = new FormContext();
      context.subscribe = jasmine.createSpy('subscribe').and.returnValue(unsubscribe);
    });

    it('sets the state from the FormContext', () => {
      let subject = shallow(
        <Component />,
        {context: {form: context}}
      );

      expect(subject.state()).toEqual({isSubmitting: false, hasSubmitted: false});
    });

    describe('render', () => {
      it('passes isSubmitting to the wrapped component as a prop', () => {
        context.isSubmitting = true;
        let subject = shallow(
          <Component />,
          {context: {form: context}}
        );
  
        expect(subject.find(Element).prop('isSubmitting')).toEqual(true);
      });

      it('passes hasSubmitted to the wrapped component as a prop', () => {
        context.hasSubmitted = true;
        let subject = shallow(
          <Component />,
          {context: {form: context}}
        );
  
        expect(subject.find(Element).prop('hasSubmitted')).toEqual(true);
      });

      it('passes through other props', () => {
        let subject = shallow(
          <Component herp="derp" />,
          {context: {form: context}}
        );
  
        expect(subject.find(Element).prop('herp')).toEqual('derp');
      });
    });

    describe('componentDidMount', () => {
      let subject;

      beforeEach(() => {
        subject = mount(
          <Component />,
          {context: {form: context}}
        );
      });

      it('subscribes to the formContext', () => {
        expect(context.subscribe).toHaveBeenCalledWith(subject.instance().handleContextUpdate);
      });

      it('stores the unsubscribe function on the object', () => {
        expect(subject.instance().unsubscribe).toBe(unsubscribe);
      });

      describe('componentWillUnmount', () => {
        it('unsubscribes from the context', () => {
          subject.unmount();
          expect(unsubscribe).toHaveBeenCalled();
        });
      });
    });

    describe('handleContextUpdate', () => {
      let subject;

      beforeEach(() => {
        subject = shallow(
          <Component />,
          {context: {form: context}}
        );
      });

      it('updates state', () => {
        subject.instance().handleContextUpdate({isSubmitting: true, hasSubmitted: true});
        expect(subject.state()).toEqual({isSubmitting: true, hasSubmitted: true});
      });
    });
  });
});