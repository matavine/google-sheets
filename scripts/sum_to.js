
/**
 * Calculates the total sum of item prices from a cell conraining line-separated "item name - price" values.
 *
 * @param {string} data A string containing line-separated "item name - price" values.
 * @param {string} maxValueThreshold Name of a top-level key to sort the JSON array objects by prior to returning their values (optional). The value referenced by the sortKey must be a number.
 * @returns {Number} The total sum of item prices from the specified data.
 * @customfunction
 */
function GET_ITEM_PRICE_SUM(data, maxValueThreshold = 100) {
    const items = data.split("\n");
    let totalSum = 0;

    for (const item of items) {
        const itemNameAndPrice = item.split("-");
        const priceStr = itemNameAndPrice[itemNameAndPrice.length - 1].trim();

        const price = Number(priceStr);
        if (price === null || isNaN(price) || price >= maxValueThreshold) {
            continue;
        }

        totalSum += price;
    }

    return totalSum;
}
