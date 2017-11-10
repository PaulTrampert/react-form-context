import * as index from './index';
import idx from './index';
import {
  FormContext
} from './index';

describe('index', () => {
  it('exports FormContext', () => {
    expect(FormContext).toEqual(jasmine.any(Function));
    expect(index.FormContext).toEqual(jasmine.any(Function));
    expect(idx.FormContext).toEqual(jasmine.any(Function));
  });
});