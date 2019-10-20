var listContainer = document.getElementById('list-container');
var listDisplayer = document.getElementById('list-displayer');

async function renderList(list) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            listContainer.innerHTML = "";
            var size = list.length;
            window.rateToFillContainer = (listContainer.clientHeight - 20) / list.length;
            var newUlContent = "";
            list.forEach(item => {
                newUlContent += `<div id="item-${item}" style="height:${item * window.rateToFillContainer}px;">${listContainer.clientWidth/size > 17 ? item : ''}</div>`
            });
            listContainer.innerHTML = newUlContent;
            resolve();
        }, window.delaySpeed);
    });
}

async function prepareSwappingStep(firstId, secondId) {
    await changeBackgroundColor(firstId, 'red');
    await changeBackgroundColor(secondId, 'red');
}

async function swap(firstId, secondId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            var temp = $(`#item-${firstId}`).height();
            $(`#item-${firstId}`).height($(`#item-${secondId}`).height());
            $(`#item-${secondId}`).height(temp);

            $(`#item-${firstId}`).prop('id', 'firstTempId');
            $(`#item-${secondId}`).prop('id', 'secondTempId');
            $(`#firstTempId`).prop('id', `item-${secondId}`);
            $(`#secondTempId`).prop('id', `item-${firstId}`);

            var valTemp = $(`#item-${firstId}`).html();
            if (valTemp != '' && valTemp != undefined && valTemp != null) {
                $(`#item-${firstId}`).html($(`#item-${secondId}`).html());
                $(`#item-${secondId}`).html(valTemp);
            }
            resolve()
        }, window.delaySpeed);
    });
}

async function endSwappingStep(firstId, secondId) {
    await changeBackgroundColor(firstId, '#343a40');
    await changeBackgroundColor(secondId, '#343a40');
}

async function changeBackgroundColor(itemId, color) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            $(`#item-${itemId}`).css('backgroundColor', color);
            resolve()
        }, window.delaySpeed);
    });
}