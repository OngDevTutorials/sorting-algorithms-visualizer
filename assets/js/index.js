var resetListButton = document.getElementById('reset-list-button');
var generateListButton = document.getElementById('generate-button');
var sortButton = document.getElementById('sort-button');
var algoSelector = document.getElementById('algo-selector');
var sortingAlgorithms = ["Basic Bubble Sort", "Enhanced Bubble Sort", "Insertion Sort", "Quick Sort"];
var currentAlgorithm = "";
var sortingList = [];

(function() {
    sortingAlgorithms.forEach((item, index) => {
        var option = document.createElement("option");
        option.value = index;
        option.innerHTML = item;
        algoSelector.appendChild(option);
    });
})();

// Event handlers
generateListButton.onclick = function() {
    var size = document.getElementById('listSizeSlider').value;
    window.list = generateRandomList(size);
    renderList(window.list);
};

sortButton.onclick = async function() {
    resetListButton.disabled = false;
    sortButton.disabled = true;
    sortingList = [...window.list];
    await getSortingAlgorithm(sortingList);
    console.log(window.list);
};

resetListButton.onclick = function() {
    resetListButton.disabled = true;
    sortButton.disabled = false;
    renderList(window.list);
};

algoSelector.onchange = function() {
    sortButton.disabled = isNaN(algoSelector.value);
    renderList(window.list);
};

$('#listSize').blur(() => {
    var size = $('#listSize').val();
    $('#listSizeSlider').val(size);
    generateRandomListAndRender(size);
})

$('#listSize').on('keyup', (e) => {
    if (e.which == 13) {
        $('#listSize').blur();
    }
});
// End Event handlers

async function getSortingAlgorithm(list) {
    switch (algoSelector.value) {
        case '0':
            return await doBubbleSort(list);
        case '1':
            return await doEnhancedBubbleSort(list);
        case '2':
            return await doInsertionSort(list);
        default:
            return 'err';
    }
}

function generateRandomListAndRender(size) {
    window.list = generateRandomList(size);
    renderList(window.list);
}

function swapArrItem(array, firstIndex, secondIndex) {
    var temp = array[firstIndex];
    array[firstIndex] = array[secondIndex];
    array[secondIndex] = temp;
}