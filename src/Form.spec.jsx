import FormInjector from 'inject-loader!./Form';
import jasmineAsync from './testUtil/jasmineAsync';
import {shallow} from 'enzyme';
import React from 'react';

describe('Form', () => {
  let Form;
  let formCtx;
  let onSubmit;
  let onInvalidSubmit;
  let onSubmitError;
  let subject;

  beforeEach(() => {
    formCtx = {};
    Form = FormInjector({
      './FormContext': () => formCtx
    }).default;
    onSubmit = jasmine.createSpy('onSubmit');
    onInvalidSubmit = jasmine.createSpy('onInvalidSubmit');
    onSubmitError = jasmine.createSpy('onSubmitError');
    subject = shallow(
      <Form onSubmit={onSubmit} onInvalidSubmit={onInvalidSubmit} onSubmitError={onSubmitError} style={{width: '100%'}} name="hi">
        Derp
      </Form>
    );
  });

  it('creates a form context', () => {
    expect(subject.instance().form).toBe(formCtx);
  });

  it('has a child context that contains the form context under the property "form"', () => {
    expect(subject.instance().getChildContext()).toEqual({form: formCtx});
  });

  describe('render', () => {
    it('has a root element of form', () => {
      expect(subject.type()).toBe('form');
    });

    it('renders children in the form', () => {
      expect(subject.text()).toEqual('Derp');
    });

    it("binds handleSubmit to the form's onSubmit event", () => {
      expect(subject.props().onSubmit).toBe(subject.instance().handleSubmit);
    });

    it('renders passthrough props on the form', () => {
      expect(subject.props().style).toEqual({width: '100%'});
    });
  });

  describe('handleSubmit', () => {
    let event;

    beforeEach(() => {
      event = jasmine.createSpyObj('event', ['preventDefault']);
    });

    it('preventsDefault', () => {
      subject.instance().handleSubmit(event);
      expect(event.preventDefault).toHaveBeenCalled();
    });

    it('calls onSubmit if form.isValid() returns true', jasmineAsync(async () => {
      subject.instance().form.isValid = () => Promise.resolve(true);
      await subject.instance().handleSubmit(event);
      expect(onSubmit).toHaveBeenCalledWith(event);
      expect(onInvalidSubmit).not.toHaveBeenCalled();
    }));

    it('calls onInvalidSubmit if form.isValid() returns false',jasmineAsync(async () => {
      subject.instance().form.isValid = () => false;
      await subject.instance().handleSubmit(event);
      expect(onSubmit).not.toHaveBeenCalled();
      expect(onInvalidSubmit).toHaveBeenCalledWith(event);
    }));

    it('calls onSubmitError when an error is thrown', jasmineAsync(async () => {
      subject.instance().form.isValid = () => false;
      onInvalidSubmit.and.returnValue(Promise.reject('wtf'));
      await subject.instance().handleSubmit(event);
      expect(onSubmitError).toHaveBeenCalledWith('wtf');
    }));
  });
});