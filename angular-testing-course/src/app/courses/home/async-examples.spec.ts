fdescribe('Async Testing examples', () => {
  it('Asynchronous test example with Jasmine done()', (done: DoneFn) => {
    let test = false;
    setTimeout(() => {
      test = true;
      expect(test).toBeTruthy();
      done();
    }, 1000);
    expect(test).toBeFalsy();
  });


});
