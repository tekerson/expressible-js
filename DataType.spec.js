const test = require('tape'); // eslint-disable-line import/no-extraneous-dependencies

const DataType = require('./DataType');

test('makeConstructor creates a new constructor', (t) => {
  const Type = DataType.makeConstructor();
  const OtherType = DataType.makeConstructor();

  const instance = Type();

  t.true(instance instanceof Type);
  t.false(instance instanceof OtherType);
  t.end();
});

test('`makeProperty` creates a property that can be added to a prototype', (t) => {
  const expected = {};

  const Type = DataType.makeConstructor();
  Object.defineProperty(Type.prototype, 'value', DataType.makeProperty(() => expected));

  const instance = Type();

  t.strictEqual(instance.value, expected);
  t.end();
});

test('`makeProperty` provides access to the constructor arguments', (t) => {
  const Type = DataType.makeConstructor();

  Object.defineProperty(Type.prototype, 'first', DataType.makeProperty((fst) => fst));
  Object.defineProperty(Type.prototype, 'second', DataType.makeProperty((fst, snd) => snd));

  const expectedFirst = {};
  const expectedSecond = {};
  const instance = Type(expectedFirst, expectedSecond);

  t.strictEqual(instance.first, expectedFirst);
  t.strictEqual(instance.second, expectedSecond);
  t.end();
});

test('`makeProperty` can be used to create methods', (t) => {
  const Type = DataType.makeConstructor();

  Object.defineProperty(
    Type.prototype, 'add', DataType.makeProperty((fst, snd) => (third) => fst + snd + third)
  );

  const instance = Type(7, 5);

  t.strictEqual(instance.add(3), 15);
  t.end();
});
