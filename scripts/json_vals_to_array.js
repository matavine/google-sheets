/**
 * Extracts the value of every top-level key of every object in the specified JSON array.
 *
 * @param {string} jsonArray A JSON string containing an array of objects (e.g. [{"a": 1}, {"a": 2}])
 * @return An array of values from every top-level key of every object in the specified JSON array.
 * @customfunction
 */
function JSON_VALS_TO_ARRAY(jsonArray) {
  const data = JSON.parse(jsonArray);
  const outputVals = new Array();

  for (const elem of data) {
    const keys = Object.keys(elem);
    for (const key of keys) {
      value = elem[key];
      outputVals.push(value);
    }
  }

  return outputVals;
}

