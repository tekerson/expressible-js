const CONSTRUCTOR_ARGS = Symbol('CONSTRUCTOR_ARGS');

const getInstance = (self, ctor) =>
        (self instanceof ctor ? self : Object.create(ctor.prototype));

const makeConstructor = () => function Constructor(...args) {
  const instance = getInstance(this, Constructor);
  instance[CONSTRUCTOR_ARGS] = args;
  return instance;
};

const property = (impl) => ({
  get() {
    return impl(...this[CONSTRUCTOR_ARGS]);
  },
});

const nullary = (impl) => property(
  (...args) => () => impl(...args)
);

module.exports = {
  makeConstructor,
  property,
  nullary,
};
