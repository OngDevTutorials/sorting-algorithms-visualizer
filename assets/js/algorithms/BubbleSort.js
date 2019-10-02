async function doBubbleSort(array) {
    var length = array.length;
    for (var i = 0; i < length; i++) {
        for (var j = 0; j < length - 1; j++) {
            if (isStopTriggered) return;
            await prepareSwappingStep(array[j], array[j + 1]);
            if (array[j] > array[j + 1]) {
                swapArrItem(array, j, j + 1);
                await swap(array[j], array[j + 1]);
            }
            await endSwappingStep(array[j], array[j + 1]);
        }
    }
    return array;
}

async function doEnhancedBubbleSort(array) {
    var length = array.length;
    var isSwapped;
    var count = 1;
    do {
        isSwapped = false;
        for (var i = 0; i < length - count; i++) {
            if (isStopTriggered) return;
            await prepareSwappingStep(array[i], array[i + 1]);
            if (array[i] > array[i + 1]) {
                isSwapped = true;
                swapArrItem(array, i, i + 1);
                await swap(array[i], array[i + 1]);
            }
            await endSwappingStep(array[i], array[i + 1]);
        }
        count++;
    }
    while (isSwapped == true)
    return array;
}