import * as index from './index';
import idx from './index';
import {
  Form,
  FormContext,
  formContextAware,
  withValidation
} from './index';

describe('index', () => {
  it('exports Form', () => {
    expect(Form).toEqual(jasmine.any(Function));
    expect(index.Form).toEqual(jasmine.any(Function));
    expect(idx.Form).toEqual(jasmine.any(Function));
  });

  it('exports FormContext', () => {
    expect(FormContext).toEqual(jasmine.any(Function));
    expect(index.FormContext).toEqual(jasmine.any(Function));
    expect(idx.FormContext).toEqual(jasmine.any(Function));
  });

  it('exports formContextAware', () => {
    expect(formContextAware).toEqual(jasmine.any(Function));
    expect(index.formContextAware).toEqual(jasmine.any(Function));
    expect(idx.formContextAware).toEqual(jasmine.any(Function));
  });

  it('exports withValidation', () => {
    expect(withValidation).toEqual(jasmine.any(Function));
    expect(index.withValidation).toEqual(jasmine.any(Function));
    expect(idx.withValidation).toEqual(jasmine.any(Function));
  });
});