const DataType = require('./DataType');

const nullary = (impl) => DataType.makeProperty(
  (...args) => () => impl(...args)
);

module.exports = {
  nullary,
};
