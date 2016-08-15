const DataType = require('./DataType');

const Expressible = (checkProperties, checkTypes) => (initialTypes) => {
  const types = {};
  const operations = {};

  function AbstractType() {
    throw new TypeError('Cannot instantiate Abstract Type');
  }

  const makePrototype = () => Object.create(AbstractType.prototype);

  const addProperty = (type, op, prop) => {
    operations[op] = true;
    Object.defineProperty(types[type].prototype, op, prop);
  };

  const addOperation = (name, op) => {
    Object.keys(checkTypes(name, types, op)).forEach(type => {
      addProperty(type, name, op[type]);
    });
  };

  const addOperations = (ops) => {
    Object.keys(ops).forEach(op => {
      addOperation(op, ops[op]);
    });
  };

  const addDataType = (type, ops) => {
    const ctor = DataType.makeConstructor();

    const Type = ctor;
    Type.prototype = makePrototype({});
    Type.prototype.constructor = ctor;
    types[type] = ctor;

    Object.keys(checkProperties(type, operations, ops)).forEach(op => {
      addProperty(type, op, ops[op]);
    });

    return Type;
  };

  Object.keys(initialTypes).forEach(type => {
    addDataType(type, initialTypes[type]);
  });

  return Object.assign(AbstractType, {
    addDataType,
    addOperation,
    addOperations,

    types,
  });
};

module.exports = Expressible;
