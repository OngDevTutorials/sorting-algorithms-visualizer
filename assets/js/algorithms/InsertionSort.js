async function doInsertionSort(array) {
    var length = array.length;
    for (var i = 1; i < length; i++) {
        var key = array[i];
        var keyHeight = $(`#item-${key}`).height();

        await changeBackgroundColor(array[i], 'red');
        await changeHeightAndId(key, 0, 'key');

        var j = i - 1;
        while (j >= 0) {
            if (isStopTriggered) return;
            if (array[j] > key) {
                await insert(array[j], 'key');
                array[j + 1] = array[j];
                j--;
            } else {
                break;
            }
        }
        array[j + 1] = key;

        await changeHeightAndId('key', keyHeight, key);
        await changeBackgroundColor(array[i], '#343a40');
    }
    return array;
}

async function changeHeightAndId(id, height, newId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            $(`#item-${id}`).height(height);
            $(`#item-${id}`).prop('id', `item-${newId}`);
            resolve()
        }, window.delaySpeed);
    });
}

async function insert(current, next) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log($(`#item-${current}`).height());
            $(`#item-${next}`).height($(`#item-${current}`).height());
            $(`#item-${current}`).height(0);

            var valTemp = $(`#item-${current}`).html();
            if (valTemp != '' && valTemp != undefined && valTemp != null) {
                $(`#item-${current}`).html($(`#item-${next}`).html());
                $(`#item-${next}`).html(valTemp);
            }

            $(`#item-${current}`).prop('id', 'current');
            $(`#item-${next}`).prop('id', 'next');
            $(`#current`).prop('id', `item-${next}`);
            $(`#next`).prop('id', `item-${current}`);

            resolve()
        }, window.delaySpeed);
    });
}