const test = require('tape'); // eslint-disable-line import/no-extraneous-dependencies

const AllowPartial = require('./AllowPartial');

const arbitrary = () => ({});

test('returns the defined operations even if some are missing', (t) => {
  const typeName = arbitrary();
  const shouldDefine = {
    method1: arbitrary(),
    method2: arbitrary(),
  };
  const defines = {
    method1: arbitrary(),
  };

  const actual = AllowPartial.types(typeName, shouldDefine, defines);

  t.strictEqual(actual, defines);
  t.end();
});

test('returns the defined Types even if some are missing', (t) => {
  const operationName = arbitrary();
  const shouldDefine = {
    Type1: arbitrary(),
    Type2: arbitrary(),
  };
  const defines = {
    Type1: arbitrary(),
  };

  const actual = AllowPartial.operations(operationName, shouldDefine, defines);

  t.strictEqual(actual, defines);
  t.end();
});
