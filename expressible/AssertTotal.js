/**
 * @module AssertTotal
 */

const quote = (o) => Object.keys(o).map(v => `'${v}'`).join(', ');

/**
 * A factory for Asserters
 *
 * @private
 * @param {string} kind The kind (DataType/Operation) being checked
 * @returns {function} A new DataType/Operation assertion
 */
const assertTotal = (kind) => (defining, shouldDefine, defined) => {
  if (!Object.keys(shouldDefine).length) {
    return defined;
  }

  Object.keys(defined).forEach(candidate => {
    if (!shouldDefine[candidate]) {
      throw new Error(
        `Found definition for '${candidate}' when defining ${kind}: '${defining}',`
          + ` should have definitions for ${quote(shouldDefine)}`
      );
    }
  });

  Object.keys(shouldDefine).forEach(definition => {
    if (!defined[definition]) {
      throw new Error(
        `Missing definition for '${definition}' when defining ${kind}: '${defining}',`
          + ` should have definitions for ${quote(shouldDefine)}`
      );
    }
  });

  return defined;
};

module.exports = {
  /**
   * An assertion that ensures that all types have an implementation of any new operation
   * @type {module:Expressible~checkDataTypes}
   */
  types: assertTotal('Type'),

  /**
   * An assertion that ensures that all operations have an implementation of any new type
   * @type {module:Expressible~checkOperations}
   */
  operations: assertTotal('Operation'),
};
