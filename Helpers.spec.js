const test = require('tape'); // eslint-disable-line import/no-extraneous-dependencies

const DataType = require('./DataType');

const Helpers = require('./Helpers');

test('`nullary` creates a method that takes no parameters', (t) => {
  const expected = {};

  const Type = DataType.makeConstructor();
  Object.defineProperty(Type.prototype, 'value', Helpers.nullary((x) => x));

  const instance = Type(expected);

  t.strictEqual(instance.value(), expected);
  t.end();
});
