const allowPartial = (defining, shouldDefine, defined) => defined;

/**
 * @module
 */
module.exports = {
  /**
   * An assertion that does not enforce any requirements on the types being defined.
   * @type {module:Expressible~checkDataTypes}
   */
  types: allowPartial,

  /**
   * A assertion that does not enforce any requirements on the operations being defined.
   * @type {module:Expressible~checkOperations}
   */
  operations: allowPartial,
};
