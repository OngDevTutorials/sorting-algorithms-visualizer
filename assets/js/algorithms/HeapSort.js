async function doHeapSort(array) {
    let length = array.length;
    let lastParentIndex = Math.floor(length / 2 - 1);
    while (lastParentIndex >= 0) {
        heapify(array, length, lastParentIndex);
        lastParentIndex--;
    }

    for (let i = length - 1; i >= 0; i--) {
        swapArrItem(array, i, 0);
        heapify(array, i, 0);
    }
    console.log(array);
    await renderList(array);
}

function heapify(array, length, index) {
    let largestIndex = index;
    let left = index * 2 + 1;
    let right = left + 1;

    if (left < length && array[left] > array[largestIndex]) {
        largestIndex = left;
    }

    if (right < length && array[right] > array[largestIndex]) {
        largestIndex = right;
    }

    if (largestIndex != index) {
        swapArrItem(array, index, largestIndex);
        heapify(array, length, largestIndex);
    }
}