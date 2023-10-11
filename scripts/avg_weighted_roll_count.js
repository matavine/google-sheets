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

  let non_empty_weights = new Array();
  let weights_sum = 0;
  for (let item_id = 0; item_id < weights.length; item_id++) {
    const item_weight = weights[item_id][0];
    if (item_weight === "" || item_weight === 0) {
      continue;
    }

    non_empty_weights.push(item_weight);
    weights_sum += item_weight;
  }

  let total_num_rolls = 0;
  let items_seen = new Set();
  let max_rolls = 0;
  let min_rolls = Infinity;
  const num_simulations = 1000;

  for (let sim_num = 0; sim_num < num_simulations; sim_num++) {
    let num_rolls = 0;

    while (items_seen.size < non_empty_weights.length) {
      items_seen.add(_get_random_weighted_index(non_empty_weights, weights_sum))
      num_rolls++;
    }

    if (num_rolls < min_rolls) {
      min_rolls = num_rolls;
    }

    if (num_rolls > max_rolls) {
      max_rolls = num_rolls;
    }

    total_num_rolls += num_rolls;
    items_seen.clear();
  }

  return (
    "Avg: " + Math.round((total_num_rolls / num_simulations) + 0.5) + 
    " Min: " + min_rolls +
    " Max: " + max_rolls
  );
}

function _get_random_weighted_index(weights, weights_sum) {
  const rand_value = Math.random() * weights_sum;
  let acc_value = 0;

  let item_id = 0;
  for (; item_id < weights.length; item_id++) {
    acc_value += weights[item_id];
    if (rand_value < acc_value) {
      return item_id;
    }
  }

  return item_id;
}

