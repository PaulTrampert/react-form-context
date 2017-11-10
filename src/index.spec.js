import * as index from './index';
import idx from './index';
import {
  Form,
  FormContext
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
});