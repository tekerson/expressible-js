/**
 * A filter that does not enforce any requirements on the properties being defined.
 *
 * Exposed as #types and #operations
 *
 * @param {string} defining The name of the operation that is being added
 * @param {object} shouldDefine A map of the operations that sibling DataTypes implement
 * @param {object} defined A map of the operations that are defined for the DataType
 * @returns {object} A map of the operations to be defined for the DataType
 */
const allowPartial = (defining, shouldDefine, defined) => defined;

module.exports = {
  types: allowPartial,
  operations: allowPartial,
};
