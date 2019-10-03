function doQuickSort(array) {
    quickSort(array, 0, array.length - 1);
    renderList(array);
}

function quickSort(items, left, right) {
    var index;
    if (items.length > 1) {
        index = partition(items, left, right); //index returned from partition
        if (left < index - 1) { //more elements on the left side of the pivot
            quickSort(items, left, index - 1);
        }
        if (index < right) { //more elements on the right side of the pivot
            quickSort(items, index, right);
        }
    }
    return items;
}

function partition(items, left, right) {
    var pivot = getPivot(items, left, right);
    i = left, //left pointer
        j = right; //right pointer
    while (i <= j) {
        while (items[i] < pivot) {
            i++;
        }
        while (items[j] > pivot) {
            j--;
        }
        if (i <= j) {
            swapArrItem(items, i, j); //sawpping two elements
            i++;
            j--;
        }
    }
    return i;
}

// Bring the median of left, right, middle to right, and take it to be pivot
function getPivot(items, left, right) {
    let mid = Math.floor((left + right) / 2);
    if (items[mid] < items[left]) {
        swapArrItem(items, left, mid);
    }
    if (items[right] < items[left]) {
        swapArrItem(items, left, right);
    }
    if (items[mid] < items[right]) {
        swapArrItem(items, mid, right);
    }

    return items[right];
}