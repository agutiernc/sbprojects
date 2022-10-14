const { BadRequestError } = require("../expressError");

// THIS NEEDS SOME GREAT DOCUMENTATION.

/**
 * Helper function to update selected queries.
 * 
 * The calling function will call this to set up the sql cols and update
 * with the given fields.
 * 
 * @param dataToUpdate { object } { field1: newVal, field2: newVal, ... }
 * @param {*} jsToSql { Object } maps data to database columns
 *     => { firstName: 'Bobby', email: 'ceobob@bobsplace.com' }
 * 
 * @returns { Object } { setCols, values }
 * 
 * @example {firstName: 'Aliya', age: 32} =>
 *   { setCols: '"first_name"=$1, "age"=$2',
 *     values: ['Aliya', 32] }
 */

function sqlForPartialUpdate(dataToUpdate, jsToSql) {
  const keys = Object.keys(dataToUpdate);
  
  if (keys.length === 0) throw new BadRequestError("No data");

  // {firstName: 'Aliya', age: 32} => ['"first_name"=$1', '"age"=$2']
  const cols = keys.map((colName, idx) =>
      `"${jsToSql[colName] || colName}"=$${idx + 1}`,
  );

  return {
    setCols: cols.join(", "),
    values: Object.values(dataToUpdate),
  };
}

module.exports = { sqlForPartialUpdate };
