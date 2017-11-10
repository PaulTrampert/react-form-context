import window from './window';

function delay(time) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, time);
  });
}

export default delay;