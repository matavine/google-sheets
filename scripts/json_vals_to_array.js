const _ASCENDING_ORDER = "asc"
const _DESCENDING_ORDER = "desc"

/**
 * Extracts the value of every top-level key of every object in the specified JSON array.
 *
 * @param {string} jsonArray A JSON string containing an array of objects.
 * @param {string} sortKey Name of a top-level key to sort the JSON array objects by prior to returning their values (optional).
 * @param {string} order The order by which to sort the array of JSON objects: "asc" for ascending order (default), "desc" for descending order. Requires sortKey to be applied (optional).
 * @returns {Array} An array of values from every top-level key of every object in the specified JSON array.
 * @customfunction
 */
function JSON_VALS_TO_ARRAY(jsonArray, sortKey = "", order = _ASCENDING_ORDER) {
  let data = JSON.parse(jsonArray);
  const outputVals = new Array();

  if (sortKey) {
    order = order.toLowerCase();
    if (order !== _ASCENDING_ORDER && order !== _DESCENDING_ORDER) {
      return [`Invalid order specified, must be either: ${_ASCENDING_ORDER} or ${_DESCENDING_ORDER}`];
    }

    const orderMultiplier = (order == _ASCENDING_ORDER) ? 1 : -1;
    data = data.sort((a, b) => ((a[sortKey] || 0) - (b[sortKey] || 0)) * orderMultiplier);
  }

  for (const elem of data) {
    const keys = Object.keys(elem);
    for (const key of keys) {
      value = elem[key];
      outputVals.push(value);
    }
  }

  return outputVals;
}