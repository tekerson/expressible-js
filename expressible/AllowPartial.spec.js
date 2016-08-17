const test = require('tape'); // eslint-disable-line import/no-extraneous-dependencies

const AllowPartial = require('./AllowPartial');

const arbitrary = () => ({});

test('AllowPartial.types returns the defined operations even if some are missing', (t) => {
  const shouldDefine = {
    method1: arbitrary(),
    method2: arbitrary(),
  };
  const define = {
    method1: arbitrary(),
  };

  const actual = AllowPartial.types('NewType', shouldDefine, define);

  t.strictEqual(actual, define);
  t.end();
});

test('AllowPartial.operations returns the defined types even if some are missing', (t) => {
  const shouldDefine = {
    Type1: arbitrary(),
    Type2: arbitrary(),
  };
  const define = {
    Type1: arbitrary(),
  };

  const actual = AllowPartial.operations('newOperation', shouldDefine, define);

  t.strictEqual(actual, define);
  t.end();
});
