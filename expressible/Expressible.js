const DataType = require('./DataType');

const META = Symbol('META');

/**
 * @module
 *
 * @param {module:Expressible~checkOperations} checkOperations A function to check the properties to be defined
 * @param {module:Expressible~checkDataTypes} checkDataTypes A function to check the data types to be defined
 * @returns {function}
 */
const Expressible = (checkOperations, checkDataTypes) => (initialTypes) => {
  const operations = {};

  function AbstractType() {
    throw new TypeError('Cannot instantiate Abstract Type');
  }

  const makePrototype = () => Object.create(AbstractType.prototype);

  const addProperty = (type, op, prop) => {
    operations[op] = true;
    Object.defineProperty(AbstractType[type].prototype, op, prop);
  };

  const addOperation = (name, op) => {
    Object.keys(checkDataTypes(name, AbstractType, op)).forEach(type => {
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
    AbstractType[type] = ctor;

    Object.keys(checkOperations(type, operations, ops)).forEach(op => {
      addProperty(type, op, ops[op]);
    });

    return Type;
  };

  Object.keys(initialTypes).forEach(type => {
    addDataType(type, initialTypes[type]);
  });

  return Object.assign(AbstractType, {
    [META]: {
      addDataType,
      addOperation,
      addOperations,
    },
  });
};

module.exports = Object.assign(Expressible, {
  /**
   * Add a new DataType to an AbstractType, defining the associated operations.
   *
   * @alias module:Expressible.addDataType
   * @param {AbstractType} target The parent Abstract Type to add to
   * @param {TypeName} type The name of the new DataType to create
   * @param {Object.<TypeName,PropertyDefinition>} operations The property definitions for the new DataType
   * @returns {DataType}
   */
  addDataType: (target, type, operations) => target[META].addDataType(type, operations),

  /**
   * Add a new Operation to all DataTypes for an AbstractType
   *
   * @alias module:Expressible.addOperation
   * @param {AbstractType} target The parent AbstractType to add to
   * @param {PropertyName} operation The name of the new operation to create
   * @param {Object.<TypeName,PropertyDefinition>} operations The property definitions for the new DataType
   * @returns {DataType}
   */
  addOperation: (target, operation, types) => target[META].addOperation(operation, types),

  /**
   * Add a new Operation to all DataTypes for an AbstractType
   *
   * @alias module:Expressible.addOperations
   * @param {AbstractType} target The parent AbstractType to add to
   * @param {Object.<PropertyName,Object.<TypeName,PropertyDefinition>>} operations The property definitions to add
   * @returns {DataType}
   */
  addOperations: (target, ...args) => target[META].addOperations(...args),
});

/** @typedef {string} TypeName */
/** @typedef {string} PropertyName */
/** @typedef {object} PropertyDefinition */

/**
 * @callback module:Expressible~checkOperations
 * @param {PropertyName} defining The name of the operation that is being defined
 * @param {Map.<Property>} shouldDefine The operations the type *should* define
 * @param {object} defined The operations that *are* defined
 * @returns {object} A map of the operations to be defined for the DataType
 */

/**
 * @callback module:Expressible~checkDataTypes
 * @param {TypeName} defining The name of the type that is being defined
 * @param {Map.<Property>} shouldDefine The operations the type *should* define
 * @param {object} defined The operations that *are* defined
 * @returns {object} A map of the operations to be defined for the DataType
 */
