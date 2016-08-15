const quote = (o) => Object.keys(o).map(v => `'${v}'`).join(', ');

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
