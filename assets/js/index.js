var resetListButton = document.getElementById('reset-list-button');
var generateListButton = document.getElementById('generate-button');
var sortButton = document.getElementById('sort-button');
var algoSelector = document.getElementById('algo-selector');
var delaySpeed;
var sortingAlgorithms = [{
        "name": "Basic Bubble Sort",
        "timeComplexity": {
            "best": "&Theta;(n)",
            "average": "&Theta;(n<sup>2</sup>)",
            "worst": "&Theta;(n<sup>2</sup>)"
        },
        "memoryComplexity": {
            "worst": "&Theta;(1)"
        }
    },
    {
        "name": "Enhanced Bubble Sort",
        "timeComplexity": {
            "best": "&Theta;(n)",
            "average": "&Theta;(n<sup>2</sup>)",
            "worst": "&Theta;(n<sup>2</sup>)"
        },
        "memoryComplexity": {
            "worst": "&Theta;(1)"
        }
    },
    {
        "name": "Insertion Sort",
        "timeComplexity": {
            "best": "&Theta;(n)",
            "average": "&Theta;(n<sup>2</sup>)",
            "worst": "&Theta;(n<sup>2</sup>)"
        },
        "memoryComplexity": {
            "worst": "&Theta;(1)"
        }
    },
    {
        "name": "Quick Sort",
        "timeComplexity": {
            "best": "&Theta;(nlogn)",
            "average": "&Theta;(nlogn)",
            "worst": "&Theta;(n<sup>2</sup>)"
        },
        "memoryComplexity": {
            "worst": "&Theta;(logn)"
        }
    },
    {
        "name": "Merge Sort",
        "timeComplexity": {
            "best": "&Theta;(nlogn)",
            "average": "&Theta;(nlogn)",
            "worst": "&Theta;(nlogn)"
        },
        "memoryComplexity": {
            "worst": "&Theta;(n)"
        }
    },
    {
        "name": "Selection Sort",
        "timeComplexity": {
            "best": "&Theta;(n<sup>2</sup>)",
            "average": "&Theta;(n<sup>2</sup>)",
            "worst": "&Theta;(n<sup>2</sup>)"
        },
        "memoryComplexity": {
            "worst": "&Theta;(1)"
        }
    },
    {
        "name": "Heap Sort",
        "timeComplexity": {
            "best": "&Theta;(nlogn)",
            "average": "&Theta;(nlogn)",
            "worst": "&Theta;(nlogn)"
        },
        "memoryComplexity": {
            "worst": "&Theta;(1)"
        }
    }
];
var currentAlgorithm = "";
var sortingList = [];
var isStopTriggered = false;
var baseColor = '#343a40';

(function() {
    var listSize = document.getElementById('listSize');
    var listSizeSlider = document.getElementById('listSizeSlider');
    listSize.value = listSizeSlider.value;
    window.list = generateRandomList(listSizeSlider.value);
    renderList(window.list);
    listSizeSlider.oninput = function() {
        listSize.value = listSizeSlider.value;
        window.list = generateRandomList(listSizeSlider.value);
        sortButton.disabled = isNaN(algoSelector.value);
        isStopTriggered = true;
        renderList(window.list);
    }
})();

(function() {
    var delaySpeedElement = document.getElementById('delaySpeed');
    var delaySpeedSlider = document.getElementById('delaySpeedSlider');
    window.delaySpeed = delaySpeedElement.value = delaySpeedSlider.value;
    delaySpeedSlider.oninput = function() {
        window.delaySpeed = delaySpeedElement.value = delaySpeedSlider.value;
        //isStopTriggered = true;
        //sortButton.disabled = isNaN(algoSelector.value);
    }
})();

(function() {
    sortingAlgorithms.forEach((item, index) => {
        var option = document.createElement("option");
        option.value = index;
        option.innerHTML = item.name;
        algoSelector.appendChild(option);
    });
})();

// Event handlers
generateListButton.onclick = function() {
    var size = document.getElementById('listSizeSlider').value;
    window.list = generateRandomList(size);
    sortButton.disabled = isNaN(algoSelector.value);
    isStopTriggered = true;
    renderList(window.list);
};

sortButton.onclick = async function() {
    resetListButton.disabled = false;
    sortButton.disabled = true;
    sortingList = [...window.list];
    isStopTriggered = false;
    await getSortingAlgorithm(sortingList);
};

resetListButton.onclick = function() {
    resetListButton.disabled = true;
    sortButton.disabled = false;
    isStopTriggered = true;
    renderList(window.list);
};

algoSelector.onchange = function() {
    updateAlgoInfo(algoSelector.value);
    sortButton.disabled = isNaN(algoSelector.value);
    isStopTriggered = true;
    renderList(window.list);
};

$('#listSize').blur(() => {
    var size = $('#listSize').val();
    $('#listSizeSlider').val(size);
    isStopTriggered = true;
    sortButton.disabled = isNaN(algoSelector.value);
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
        case '3':
            return await doQuickSort(list);
        case '4':
            return await doMergeSort(list);
        case '5':
            return await doSelectionSort(list);
        case '6':
            return await doHeapSort(list);
        default:
            return 'err';
    }
}

function updateAlgoInfo(algo) {
    updateTimeComplexity(algo);
    updateMemoryComplexity(algo);
}

function updateTimeComplexity(algo) {
    let isInvalidAlgo = isNaN(algo);
    $(`#bestCaseTimeComplex`).html(isInvalidAlgo ? "" : sortingAlgorithms[algo].timeComplexity.best);
    $(`#averageCaseTimeComplex`).html(isInvalidAlgo ? "" : sortingAlgorithms[algo].timeComplexity.average);
    $(`#worstCaseTimeComplex`).html(isInvalidAlgo ? "" : sortingAlgorithms[algo].timeComplexity.worst);
}

function updateMemoryComplexity(algo) {
    $(`#worstCaseMemoryComplex`).html(isNaN(algo) ? "" : sortingAlgorithms[algo].memoryComplexity.worst);
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