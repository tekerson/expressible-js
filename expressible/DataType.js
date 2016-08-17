/**
 * @module
 */

/**
 * A Symbol to provide the "private" namespace on the DataType instance to store the arguments
 * that were passed to the Constructor
 *
 * @private
 */
const CONSTRUCTOR_ARGS = Symbol('CONSTRUCTOR_ARGS');

/**
 * Always returns an instance of the `ctor`
 *
 * Borrowed from https://github.com/fantasyland/fantasy-helpers/blob/master/src/get-instance.js
 *
 * @private
 * @param {?object} self A potential instance of `ctor`
 * @param {object} ctor The required prototype
 * @returns {object} An instance of `ctor`
 */
const getInstance = (self, ctor) =>
        (self instanceof ctor ? self : Object.create(ctor.prototype));

/**
 * Create a constructor for a new DataType
 *
 * @alias module:DataType.makeConstructor
 * @returns {function} A Constructor function for a new DataType
 */
const makeConstructor = () => function Constructor(...args) {
  const instance = getInstance(this, Constructor);
  instance[CONSTRUCTOR_ARGS] = args;
  return instance;
};

/**
 * Create a PropertyDescriptor by providing a function from the constructor arguments
 *
 * @alias module:DataType.property
 * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty
 * @param {function} impl A function that takes the DataType instances Constructor arguments
 * @returns {object} A Property Descriptor
 */
const property = (impl) => ({
  get() {
    return impl(...this[CONSTRUCTOR_ARGS]);
  },
});

/**
 * Create a PropertyDescriptor that is a nullary method
 *
 * @alias module:DataType.nullary
 * @param {PropertyFunction} impl The implementation of the nullary member property
 * @returns {PropertyDescriptor}
 */
const nullary = (impl) => property(
  (...args) => () => impl(...args)
);

module.exports = {
  makeConstructor,
  property,
  nullary,
};
