const test = require('tape'); // eslint-disable-line import/no-extraneous-dependencies

const Expressible = require('./Expressible');
const { makeProperty } = require('./DataType');
const { nullary } = require('./Helpers');
const { types: withTotalTypes, operations: withTotalOperations } = require('./AssertTotal');

const total = Expressible(withTotalTypes, withTotalOperations);

test('creates subtypes', (t) => {
  const Expr = total({
    Constant: {},
  });

  const constant = Expr.types.Constant(1);

  t.true(constant instanceof Expr);
  t.true(constant instanceof Expr.types.Constant);
  t.end();
});

test('can define multiple initial types', (t) => {
  const { types: { Constant, Add } } = total({
    Constant: {},
    Add: {},
  });

  const one = Constant(1);
  const add = Add(one, one);

  t.true(one instanceof Constant);
  t.true(add instanceof Add);
  t.end();
});

test('can add a type to an existing set', (t) => {
  const Expr = total({
    Constant: {},
  });

  Expr.addDataType('Add', {});

  const add = Expr.types.Add();

  t.true(add instanceof Expr.types.Add);
  t.true(add instanceof Expr);
  t.end();
});

test('can add an operation to existing types', (t) => {
  const Expr = total({
    Constant: {},
  });

  Expr.addOperation('value', {
    Constant: makeProperty((v) => v),
  });

  const one = Expr.types.Constant(1);

  t.equal(one.value, 1);
  t.end();
});

test('can add multiple operation to existing types', (t) => {
  const Expr = total({
    Constant: {},
  });

  Expr.addOperations({
    value: {
      Constant: makeProperty((v) => v),
    },
    negate: {
      Constant: makeProperty((v) => -v),
    },
  });

  const one = Expr.types.Constant(1);

  t.equal(one.value, 1);
  t.end();
});

test('full example', (t) => {
  const Expr = total({
    Constant: {
      show: nullary(v => v.toString()),
    },
    Add: {
      show: nullary((l, r) => `${l.show()} + ${r.show()}`),
    },
  });
  const { Constant, Add } = Expr.types;

  Expr.addOperation('val', {
    Constant: makeProperty((v) => v),
    Add: makeProperty((l, r) => l.val + r.val),
  });

  const Neg = Expr.addDataType('Neg', {
    show: nullary(v => `(-${v.show()})`),
    val: makeProperty(v => -v.val),
  });

  const one = Constant(1);
  const two = Constant(2);
  const expr = Add(Neg(one), two);

  t.equal(`${expr.show()} = ${expr.val}`, '(-1) + 2 = 1');
  t.end();
});
