const Expressible = require('./Expressible');

const AssertTotal = require('./AssertTotal');
const AllowPartial = require('./AllowPartial');

const Helpers = require('./Helpers');
const DataType = require('./DataType');

module.exports = Object.assign(Expressible, {
  total: Expressible(AssertTotal.types, AssertTotal.operations),
  partial: Expressible(AllowPartial.types, AllowPartial.operation),

  assertingTotal: AssertTotal,
  allowingPartial: AllowPartial,

  Helpers,
  DataType,
});
