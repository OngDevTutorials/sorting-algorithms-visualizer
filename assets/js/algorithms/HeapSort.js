async function doHeapSort(array) {
    let length = array.length;
    let lastParentIndex = Math.floor(length / 2 - 1);
    while (lastParentIndex >= 0) {
        await heapify(array, length, lastParentIndex);
        lastParentIndex--;
    }

    for (let i = length - 1; i >= 0; i--) {
        if (isStopTriggered) return;
        await changeBackgroundColor(array[0], 'orange');
        await changeBackgroundColor(array[i], 'red');
        await swap(array[0], array[i]);
        swapArrItem(array, i, 0);
        await endSwappingStep(array[0], array[i]);
        await heapify(array, i, 0);
    }
}

async function heapify(array, length, index) {
    if (isStopTriggered) return;
    let largestIndex = lastLargestIndex = index;
    await changeBackgroundColor(array[largestIndex], 'orange');
    let left = index * 2 + 1;
    let right = left + 1;
    await changeBackgroundColor(array[left], 'red');
    await changeBackgroundColor(array[right], 'blue');


    if (left < length && array[left] > array[largestIndex]) {

        largestIndex = left;

    }

    if (right < length && array[right] > array[largestIndex]) {
        // await changeBackgroundColor(array[largestIndex], '#343a40');
        largestIndex = right;
        // await changeBackgroundColor(array[largestIndex], 'orange');
    }
    await changeBackgroundColor(array[lastLargestIndex], '#343a40');
    await changeBackgroundColor(array[largestIndex], 'orange');
    if (largestIndex != index) {
        await swap(array[index], array[largestIndex]);
        swapArrItem(array, index, largestIndex);
        await resetHeapColor(array, index, left, right);
        await heapify(array, length, largestIndex);
    } else {
        await resetHeapColor(array, index, left, right);
    }

}

async function resetHeapColor(array, index, left, right) {
    await changeBackgroundColor(array[index], '#343a40');
    await changeBackgroundColor(array[left], '#343a40');
    await changeBackgroundColor(array[right], '#343a40');
}