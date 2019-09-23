function doInsertionSort(array) {
    var length = array.length;
    for (var i = 1; i < length; i++) {
        var key = array[i];

        var j = i - 1;
        while (j >= 0) {
            if (array[j] > key) {
                array[j + 1] = array[j];
                j--;
            } else {
                break;
            }
        }
        array[j + 1] = key;
    }
    renderList(array);
    return array;
}