var listContainer = document.getElementById('list-container');
var listDisplayer = document.getElementById('list-displayer');

function renderList(list) {
    console.log(list);
    listContainer.innerHTML = "";
    var size = list.length;
    window.rateToFillContainer = (listContainer.clientHeight - 20) / list.length;
    var newUlContent = "";
    list.forEach(item => {
        newUlContent += `<div id="item-${item}" style="height:${item * window.rateToFillContainer}px;">${listContainer.clientWidth/size > 17 ? item : ''}</div>`
    });
    listContainer.innerHTML = newUlContent;
}

function prepareSwappingStep(firstId, secondId) {
    changeBackgroundColor(firstId, 'red');
    changeBackgroundColor(secondId, 'red');
}

function swap(firstId, secondId) {
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
    }, 0);
}

function endSwappingStep(firstId, secondId) {
    changeBackgroundColor(firstId, '#343a40');
    changeBackgroundColor(secondId, '#343a40');
}

function changeBackgroundColor(itemId, color) {
    setTimeout(() => {
        $(`#item-${itemId}`).css('backgroundColor', color);
    }, 0);
}