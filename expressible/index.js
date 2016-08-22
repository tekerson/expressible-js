const Expressible = require('./Expressible');

const AssertTotal = require('./AssertTotal');
const AllowPartial = require('./AllowPartial');

const DataType = require('./DataType');

module.exports = Object.assign({},
  Expressible,
  DataType,
  {
    total: Expressible(AssertTotal.types, AssertTotal.operations),
    partial: Expressible(AllowPartial.types, AllowPartial.operations),
  }
);
