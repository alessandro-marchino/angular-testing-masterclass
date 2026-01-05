import { fakeAsync, flush, tick } from "@angular/core/testing";

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

  it('Asynchronous test example - setTimeout()', fakeAsync(() => {
    let test = false;
    setTimeout(() => {
      test = true;
    }, 1000);
    expect(test).toBeFalse();
    tick(1000);
    expect(test).toBeTrue();
  }));

  it('Asynchronous test example - setTimeout() with flush', fakeAsync(() => {
    let test = false;
    setTimeout(() => {
      test = true;
    }, 1000);
    expect(test).toBeFalse();
    flush();
    expect(test).toBeTrue();
  }));

  it('Asynchronous test example - plain Promise', () => {
    let test = false;
    console.log('Creating promise');
    Promise.resolve().then(() => {
      console.log('Promise evaluated successfully');
      test = true;
    });
    console.log('Running test assertions');
    expect(test).toBeTrue();
  });
});
