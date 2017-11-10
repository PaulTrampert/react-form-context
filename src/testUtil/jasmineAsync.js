function jasmineAsync(test) {
  return async done => {
    try {
      await test();
    }
    catch(e) {
      fail(e);
    }
    finally {
      done();
    }
  };
}

export default jasmineAsync;