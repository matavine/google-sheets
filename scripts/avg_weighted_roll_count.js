/**
 * Calculates the average number of rolls required to see all items of specified weights.
 *
 * @param {number|Array<number>} input The value or range of cells to simulate rolls for.
 * @return The average number of rolls required after running multiple simulations.
 * @customfunction
 */
function AVG_WEIGHTED_ROLL_COUNT(weights) {
  if (!Array.isArray(weights)) {
    return 1;
  }

  let nonEmptyWeights = new Array();
  let weightsSum = 0;
  for (let itemId = 0; itemId < weights.length; itemId++) {
    const itemWeight = weights[itemId][0];
    if (itemWeight === "" || itemWeight === 0) {
      continue;
    }

    nonEmptyWeights.push(itemWeight);
    weightsSum += itemWeight;
  }

  let totalNumRolls = 0;
  let itemsSeen = new Set();
  let maxRolls = 0;
  let minRolls = Infinity;
  const numSimulations = 1000;

  for (let sim_num = 0; sim_num < numSimulations; sim_num++) {
    let numRolls = 0;

    while (itemsSeen.size < nonEmptyWeights.length) {
      itemsSeen.add(_get_random_weighted_index(nonEmptyWeights, weightsSum))
      numRolls++;
    }

    if (numRolls < minRolls) {
      minRolls = numRolls;
    }

    if (numRolls > maxRolls) {
      maxRolls = numRolls;
    }

    totalNumRolls += numRolls;
    itemsSeen.clear();
  }

  return (
    "Avg: " + Math.round((totalNumRolls / numSimulations) + 0.5) + 
    " Min: " + minRolls +
    " Max: " + maxRolls
  );
}

function _get_random_weighted_index(weights, weightsSum) {
  const randValue = Math.random() * weightsSum;
  let accValue = 0;

  let itemId = 0;
  for (; itemId < weights.length; itemId++) {
    accValue += weights[itemId];
    if (randValue < accValue) {
      return itemId;
    }
  }

  return itemId;
}

