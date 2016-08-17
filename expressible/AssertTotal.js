const quote = (o) => Object.keys(o).map(v => `'${v}'`).join(', ');

/**
 * A factory for Asserters
 *
 * @private
 * @param {string} kind The kind (DataType/Operation) being checked
 * @returns {AssertTotal}
 */
const assertTotal = (kind) => (defining, shouldDefine, defined) => {
  if (!Object.keys(shouldDefine).length) {
    return defined;
  }

  Object.keys(defined).forEach(candidate => {
    if (!shouldDefine[candidate]) {
      throw new Error(
        `Found definition for '${candidate}' when defining ${kind}: '${defining}',`
          + ` should define ${quote(shouldDefine)}`
      );
    }
  });

  Object.keys(shouldDefine).forEach(definition => {
    if (!defined[definition]) {
      throw new Error(
        `Missing definition for '${definition}' when defining ${kind}: '${defining}', found `
          + ` should define ${quote(shouldDefine)}`
      );
    }
  });

  return defined;
};

module.exports = {
  types: assertTotal('Type'),
  operations: assertTotal('Operation'),
};

/**
 * A filter that ensures that the the complete set of operations/data types are accounted for
 *
 * Exposed as #types and #operations
 *
 * @callback AssertTotal
 * @param {string} defining The name of the operation that is being added
 * @param {object} shouldDefine A map of the operations that sibling DataTypes implement
 * @param {object} defined A map of the operations that are defined for the DataType
 * @throws {Error} If there are too many/not enough definitions provided
 * @returns {object} A map of the operations to be defined for the DataType
 */
