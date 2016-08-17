const test = require('tape'); // eslint-disable-line import/no-extraneous-dependencies

const DataType = require('./DataType');

test('DataType.makeConstructor creates a new constructor', (t) => {
  const Type = DataType.makeConstructor();
  const OtherType = DataType.makeConstructor();

  const instance = Type();

  t.true(instance instanceof Type);
  t.false(instance instanceof OtherType);
  t.end();
});

test('DataType.property creates a property that can be added to a prototype', (t) => {
  const expected = {};

  const Type = DataType.makeConstructor();
  Object.defineProperty(Type.prototype, 'value', DataType.property(() => expected));

  const instance = Type();

  t.strictEqual(instance.value, expected);
  t.end();
});

test('DataType.property provides access to the constructor arguments', (t) => {
  const Type = DataType.makeConstructor();

  Object.defineProperty(Type.prototype, 'first', DataType.property((fst) => fst));
  Object.defineProperty(Type.prototype, 'second', DataType.property((fst, snd) => snd));

  const expectedFirst = {};
  const expectedSecond = {};
  const instance = Type(expectedFirst, expectedSecond);

  t.strictEqual(instance.first, expectedFirst);
  t.strictEqual(instance.second, expectedSecond);
  t.end();
});

test('DataType.property can be used to create methods', (t) => {
  const Type = DataType.makeConstructor();

  Object.defineProperty(
    Type.prototype, 'add',
    DataType.property((fst, snd) => (third) => fst + snd + third)
  );

  const instance = Type(7, 5);

  t.strictEqual(instance.add(3), 15);
  t.end();
});

test('DataType.nullary creates a method that takes no parameters', (t) => {
  const expected = {};

  const Type = DataType.makeConstructor();
  Object.defineProperty(
    Type.prototype, 'value',
    DataType.nullary((x) => x)
  );

  const instance = Type(expected);

  t.strictEqual(instance.value(), expected);
  t.end();
});
