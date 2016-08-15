const CONSTRUCTOR_ARGS = Symbol('CONSTRUCTOR_ARGS');

const getInstance = (self, ctor) =>
        (self instanceof ctor ? self : Object.create(ctor.prototype));

const makeConstructor = () => function Constructor(...args) {
  const instance = getInstance(this, Constructor);
  instance[CONSTRUCTOR_ARGS] = args;
  return instance;
};

const makeProperty = (impl) => ({
  get() {
    return impl(...this[CONSTRUCTOR_ARGS]);
  },
});

module.exports = {
  makeConstructor,
  makeProperty,
};
