import '@babel/polyfill';
import {configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});

let ctx = require.context('./', true, /\.spec.jsx?$/);
ctx.keys().forEach(ctx);