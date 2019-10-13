async function doQuickSort(array) {
    await quickSort(array, 0, array.length - 1);
}

async function quickSort(items, left, right) {
    if (isStopTriggered) return;
    var index;
    if (items.length > 1) {
        index = await partition(items, left, right); //index returned from partition
        if (left < index - 1) { //more elements on the left side of the pivot
            await quickSort(items, left, index - 1);
        }
        if (index < right) { //more elements on the right side of the pivot
            await quickSort(items, index, right);
        }
    }
    return items;
}

async function partition(items, left, right) {
    if (isStopTriggered) return;
    var pivot = await getPivot(items, left, right);
    debugger;
    await changeBackgroundColor(pivot, 'green');

    i = left, //left pointer
        j = right; //right pointer
    while (i <= j) {
        if (isStopTriggered) {
            await endSwappingStep(items[i], items[j]);
            return;
        }
        await changeBackgroundColor(items[i], 'blue');
        await changeBackgroundColor(items[j], 'red');
        while (items[i] < pivot) {
            await changeBackgroundColor(items[i], window.baseColor);
            i++;
            if (i > j) {
                await changeBackgroundColor(items[j], 'red');
            }
            await changeBackgroundColor(items[i], 'blue');
        }

        while (items[j] > pivot) {
            await changeBackgroundColor(items[j], window.baseColor);
            j--;
            if (j < i) {
                await changeBackgroundColor(items[i], 'blue');
            }
            await changeBackgroundColor(items[j], 'red');
        }
        if (i <= j) {
            await swap(items[i], items[j]);
            swapArrItem(items, i, j); //sawpping two elements

            await endSwappingStep(items[i], items[j]);
            i++;
            j--;
            await changeBackgroundColor(items[i], 'blue');
            await changeBackgroundColor(items[j], 'red');
        }
        await changeBackgroundColor(pivot, 'green');
    }
    await endSwappingStep(items[i], items[j]);
    await changeBackgroundColor(pivot, window.baseColor);
    return i;
}

// Bring the median of left, right, middle to right, and take it to be pivot
async function getPivot(items, left, right) {
    let mid = Math.floor((left + right) / 2);
    if (items[mid] < items[left]) {
        await prepareSwappingStep(items[mid], items[left]);
        await swap(items[mid], items[left]);
        swapArrItem(items, mid, left);
        await endSwappingStep(items[mid], items[left]);
    }
    if (items[right] < items[left]) {
        await prepareSwappingStep(items[left], items[right]);
        await swap(items[left], items[right]);
        swapArrItem(items, left, right);
        await endSwappingStep(items[left], items[right]);
    }
    if (items[mid] < items[right]) {
        await prepareSwappingStep(items[mid], items[right]);
        await swap(items[mid], items[right]);
        swapArrItem(items, mid, right);
        await endSwappingStep(items[mid], items[right]);
    }

    return items[right];
}