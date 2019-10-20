async function doSelectionSort(array) {
    let size = array.length;
    let i, j;
    for (i = 0; i < size - 1; i++) {
        let minIndex = i;
        await changeBackgroundColor(array[minIndex], 'yellow');
        for (j = i + 1; j < size; j++) {
            if (isStopTriggered) return;
            await changeBackgroundColor(array[j], 'red');
            if (array[j] < array[minIndex]) {
                await changeBackgroundColor(array[minIndex], '#343a40');
                minIndex = j;
                await changeBackgroundColor(array[minIndex], 'yellow');
            } else {
                await changeBackgroundColor(array[j], '#343a40');
            }
        }
        if (minIndex != i) {
            await swap(array[minIndex], array[i]);
            swapArrItem(array, minIndex, i);
            await endSwappingStep(array[minIndex], array[i]);
        }
        await changeBackgroundColor(array[minIndex], '#343a40');
    }
}