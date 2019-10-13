async function doMergeSort(array) {
    await mergeSort(array, array, 0);
}

async function mergeSort(originalArray, array, startIndex) {
    if (isStopTriggered) return;
    if (array.length < 2) {
        return array;
    }
    var middle = Math.floor(array.length / 2);
    var leftArray = array.slice(0, middle);
    var rightArray = array.slice(middle, array.length);

    var leftSortedArray = await mergeSort(originalArray, leftArray, startIndex);
    var rightSortedArray = await mergeSort(originalArray, rightArray, startIndex + leftSortedArray.length);

    return mergeSortedArrays(originalArray, leftSortedArray, rightSortedArray, startIndex);
}

async function mergeSortedArrays(originalArray, leftSortedArray, rightSortedArray, startIndex) {
    var sortedArray = [],
        leftArrIndex = 0,
        rightArrIndex = 0;

    while (leftArrIndex < leftSortedArray.length && rightArrIndex < rightSortedArray.length) {
        let leftMinValue = leftSortedArray[leftArrIndex],
            rightMinValue = rightSortedArray[rightArrIndex],
            minimumValue = 0;
        await changeBackgroundColor(leftMinValue, 'green');
        await changeBackgroundColor(rightMinValue, 'green');
        if (leftMinValue <= rightMinValue) {
            minimumValue = leftMinValue;
            leftArrIndex++;
        } else {
            minimumValue = rightMinValue;
            rightArrIndex++;
        }

        sortedArray.push(minimumValue);
        await changeBackgroundColor(leftMinValue, window.baseColor);
        await changeBackgroundColor(rightMinValue, window.baseColor);
    }

    if (leftArrIndex < leftSortedArray.length) {
        sortedArray = sortedArray.concat(leftSortedArray.slice(leftArrIndex));
    }

    if (rightArrIndex < rightSortedArray.length) {
        sortedArray = sortedArray.concat(rightSortedArray.slice(rightArrIndex));
    }

    originalArray.splice(startIndex, sortedArray.length, ...sortedArray);
    await renderList(originalArray);

    return sortedArray;
}