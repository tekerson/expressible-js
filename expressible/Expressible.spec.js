const test = require('tape'); // eslint-disable-line import/no-extraneous-dependencies

const Expressible = require('./Expressible');
const { property, nullary } = require('./DataType');
const { types: withTotalTypes, operations: withTotalOperations } = require('./AssertTotal');

const expressible = Expressible(withTotalTypes, withTotalOperations);

test('Expressible creates a DataType that is a valid `instancesof` the Abstract Type', (t) => {
  const Expr = expressible({
    Constant: {},
  });

  const constant = Expr.Constant(1);

  t.true(constant instanceof Expr);
  t.true(constant instanceof Expr.Constant);
  t.end();
});

test('Expressible defines multiple initial types', (t) => {
  const { Constant, Add } = expressible({
    Constant: {},
    Add: {},
  });

  const one = Constant(1);
  const add = Add(one, one);

  t.true(one instanceof Constant);
  t.true(add instanceof Add);
  t.end();
});

test('Expressible.addDataType adds Data Type to an existing set', (t) => {
  const Expr = expressible({
    Constant: {},
  });

  Expressible.addDataType(Expr, 'Add', {});

  const add = Expr.Add();

  t.true(add instanceof Expr.Add);
  t.true(add instanceof Expr);
  t.end();
});

test('Expressible.addOperation adds operation to Data Types in an existing set', (t) => {
  const Expr = expressible({
    Constant: {},
  });

  Expressible.addOperation(Expr, 'value', {
    Constant: property((v) => v),
  });

  const one = Expr.Constant(1);

  t.equal(one.value, 1);
  t.end();
});

test('Expressible.addOperations adds multiple operation to existing Data Types', (t) => {
  const Expr = expressible({
    Constant: {},
  });

  Expressible.addOperations(Expr, {
    value: {
      Constant: property((v) => v),
    },
    negate: {
      Constant: property((v) => -v),
    },
  });

  const one = Expr.Constant(1);

  t.equal(one.value, 1);
  t.end();
});
