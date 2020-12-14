const toolbox = require('dynamodb-toolbox');
const getFirst = require('./get-first');
const validateKwargs = require('./validate-kwargs');

// todo: write unit test
module.exports = (kwargs) => {
  const {
    name,
    attributes,
    indices,
    DocumentClient
  } = validateKwargs(kwargs);

  const partitionKey = getFirst(attributes, ([k, v]) => v.partitionKey === true);
  const sortKey = getFirst(attributes, ([k, v]) => v.sortKey === true);

  const table = new toolbox.Table({
    name,
    ...(partitionKey === undefined ? {} : { partitionKey }),
    ...(sortKey === undefined ? {} : { sortKey }),
    indexes: indices,
    entityField: false,
    removeNullAttributes: false,
    DocumentClient
  });

  return {
    entity: new toolbox.Entity({
      name,
      timestamps: false,
      attributes,
      table
    }),
    // todo: generate schema (use structure from sls cloudformation) and put into output
    // todo: write more unit test (!)
    schema: {}
  };
};