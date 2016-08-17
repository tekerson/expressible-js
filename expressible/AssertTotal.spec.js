const test = require('tape'); // eslint-disable-line import/no-extraneous-dependencies

const AssertTotal = require('./AssertTotal');

const arbitrary = () => ({});

test('throws an error if an not enough operations are defined', (t) => {
  const typeName = arbitrary();
  const shouldDefine = {
    method1: arbitrary(),
    method2: arbitrary(),
  };
  const defines = {
    method1: arbitrary(),
  };

  t.throws(() => AssertTotal.types(typeName, shouldDefine, defines));
  t.end();
});

test('throws an error if an extra operation is defined', (t) => {
  const typeName = arbitrary();
  const shouldDefine = {
    method1: arbitrary(),
  };
  const defines = {
    method1: arbitrary(),
    extraMethod: arbitrary(),
  };

  t.throws(() => AssertTotal.types(typeName, shouldDefine, defines));
  t.end();
});

test('does NOT throw an error if no operations are already defined', (t) => {
  const typeName = arbitrary();
  const shouldDefine = {};
  const defines = {
    arbitraryName: arbitrary(),
  };

  t.doesNotThrow(() => AssertTotal.types(typeName, shouldDefine, defines));
  t.end();
});

test('throws an error if an operation is not defined for all types', (t) => {
  const operationName = arbitrary();
  const shouldDefine = {
    Type1: arbitrary(),
    Type2: arbitrary(),
  };
  const defines = {
    Type1: arbitrary(),
  };

  t.throws(() => AssertTotal.operations(operationName, shouldDefine, defines));
  t.end();
});

test('throws an error if an operation is defined for an extra type', (t) => {
  const operationName = arbitrary();
  const shouldDefine = {
    Type1: arbitrary(),
  };
  const defines = {
    Type1: arbitrary(),
    ExtraType: arbitrary(),
  };

  t.throws(() => AssertTotal.operations(operationName, shouldDefine, defines));
  t.end();
});

test('does NOT throw an error if no types are already defined', (t) => {
  const operationName = arbitrary();
  const shouldDefine = {};
  const defines = {
    arbitraryName: arbitrary(),
  };

  t.doesNotThrow(() => AssertTotal.operations(operationName, shouldDefine, defines));
  t.end();
});
