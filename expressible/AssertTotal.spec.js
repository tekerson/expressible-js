const test = require('tape'); // eslint-disable-line import/no-extraneous-dependencies

const AssertTotal = require('./AssertTotal');

const arbitrary = () => ({});

test('AssertTotal.types throws an error if an not enough operations are defined', (t) => {
  const shouldDefine = {
    method1: arbitrary(),
    method2: arbitrary(),
  };
  const define = {
    method1: arbitrary(),
  };

  t.throws(() => AssertTotal.types('NewType', shouldDefine, define));
  t.end();
});

test('AssertTotal.types throws an error if an extra operation is defined', (t) => {
  const shouldDefine = {
    method1: arbitrary(),
  };
  const define = {
    method1: arbitrary(),
    extraMethod: arbitrary(),
  };

  t.throws(() => AssertTotal.types('NewType', shouldDefine, define));
  t.end();
});

test('AssertTotal.types does NOT throw an error if no operations are already defined', (t) => {
  const shouldDefine = {};
  const define = {
    arbitraryName: arbitrary(),
  };

  t.doesNotThrow(() => AssertTotal.types('NewType', shouldDefine, define));
  t.end();
});

test('AssertTotal.operations throws an error if an operation is not defined for all types', (t) => {
  const shouldDefine = {
    Type1: arbitrary(),
    Type2: arbitrary(),
  };
  const define = {
    Type1: arbitrary(),
  };

  t.throws(() => AssertTotal.operations('newOperation', shouldDefine, define));
  t.end();
});

test('AssertTotal.operations throws an error if an operation is defined for an extra type', (t) => {
  const shouldDefine = {
    Type1: arbitrary(),
  };
  const define = {
    Type1: arbitrary(),
    ExtraType: arbitrary(),
  };

  t.throws(() => AssertTotal.operations('newOperation', shouldDefine, define));
  t.end();
});

test('AssertTotal.operations does NOT throw an error if no types are already defined', (t) => {
  const shouldDefine = {};
  const define = {
    arbitraryName: arbitrary(),
  };

  t.doesNotThrow(() => AssertTotal.operations('newOperation', shouldDefine, define));
  t.end();
});
