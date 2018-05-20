"use strict";
/**
 * JS Smart Sort
 *
 * @constructor
 */
function JSSmartSort() {
    // Initializes some constants
    var TYPEOF_NUMBER = 'number'
        , TYPE_OF_STRING = 'string'
        , TYPEOF_OBJECT = 'object';


    /**
     * Smart Sort will dictate which sort algorithm to use depending on contextual data provided in the array itself
     * For instance, sorting an array of numbers/strings is easier for quick sort while sorting an array fo objects
     * is easier for merge sort.
     *
     * Through time, I will come up with more comprehensive tests to determine exactly when to each algorithm (hopefully)
     *
     * *Note: THIS IS THE MOST SUBJECTIVE PART OF THE MODULE, Feedback will be much appreciated as I will try to do my
     * own research for this portion
     *
     * @param arr
     * @param field
     */
    function smartSort(arr, field) {
        /**
         * UNDER CONSTANT CONSTRUCTION
         */
        // We want to dictate certain cases to use which sorting algorithm
        // For instance, bubble sort is usually a worse one to use than merge sort/ quick sort almost 100% of the time
        // The decision to choose which algorithm to use becomes hard to decide so I've chosen to go with the whichever
        // one has better benchmarks in certain categories and then to use that one

        /**
         * ARRAY TYPE
         */
        // Sorting an array of objects is easier for mergeSort to handle than say quick sort
        if (typeof arr[0] === TYPEOF_OBJECT) {
            return mergeSort(arr, field);
        }

        /**
         * ARRAY LENGTH
         */
        // It seems benchmark tests for mergeSort stops becoming optimal once it hits around 8000 elements and stdSort
        // and quick sort seems to be
        // Needs more testing and will be tweaked
        // For now, it seems as though once, its over 100, quick sorts dominates as opposed to insertion sort
        if (arr.length <= 100) {
            return insertionSort(arr, field);
        }

        // If no other cases is found, quick sort seems to be the best answer
        return quickSort(arr, field);
    }

    /**
     * Bubble Sort
     *
     * @description: Bubble sort, sometimes referred to as sinking sort, is a simple sorting algorithm that repeatedly
     * steps through the list to be sorted, compares each pair of adjacent items and swaps them if they are in the wrong
     * order. The pass through the list is repeated until no swaps are needed, which indicates that the list is sorted.
     *
     * @param arr
     * @param field
     * @returns {*}
     */
    function bubbleSort(arr, field) {
        // Validate array first
        validateArray(arr, field);

        // Return original array if array length is just one
        if (arr.length === 1) return arr;

        // We need to determine the elements of the array and the consistency of
        // i.e. If we are sorting an array of numbers, we should not detect any string or objects
        // If sorting by keys of an object, every element should have that key or throw an error
        // Special case for sorting by objects as opposed string or numbers
        var sortObjects = typeof arr[0] === TYPEOF_OBJECT
            // Initialize variable to determine if additional loop is needed
            // Variable represents a switch has occurred during loop
            // Must continue looping until no switches are needed thus, array should be sorted at this point
            , switched
            // Initialize left and right values in the case that we are sorting objects
            , leftValue
            , rightValue;

        // Do - While loop for iterating as many times as needed to
        do {
            // Set value to false as default and test all elements in the array to see if a switch is needed
            switched = false;
            for (var i = 0; i < arr.length - 1; i++) {
                // We want to find the correct items to compare, if string or number, the element itself is fine
                // However, if it is an object, we want to check the element's value
                leftValue = sortObjects ? arr[i][field] : arr[i];
                rightValue = sortObjects ? arr[i + 1][field] : arr[i + 1];

                // In the case of the left index value is greater than the right, a switch is needed
                if (leftValue > rightValue) {
                    switchIndexValues(arr, i, i + 1);

                    // We set this variable to true to let the code know to repeat this do while loop once more
                    // To see if another switch is needed
                    switched = true;
                }
            }
        } while (switched);

        // After the loop has detected that the no elements were switched, it is completely sorted and now we just
        // return the array
        return arr;
    }

    /**
     * Selection Sort
     *
     * @description: The algorithm divides the input list into two parts: the sublist of items already sorted, which is
     * built up from left to right at the front (left) of the list, and the sublist of items remaining to be sorted that
     * occupy the rest of the list. Initially, the sorted sublist is empty and the unsorted sublist is the entire input
     * list. The algorithm proceeds by finding the smallest (or largest, depending on sorting order) element in the
     * unsorted sublist, exchanging (swapping) it with the leftmost unsorted element (putting it in sorted order), and
     * moving the sublist boundaries one element to the right.
     *
     * @param arr
     * @param field
     * @returns {*}
     */
    function selectionSort(arr, field) {
        // Validate array first
        validateArray(arr, field);

        // If length is just one, return original array
        if (arr.length === 1) return arr;

        // We initialize minimumId as the index of which the smallest value exists
        var minimumId
            // We need to determine the elements of the array and the consistency of
            // i.e. If we are sorting an array of numbers, we should not detect any string or objects
            // If sorting by keys of an object, every element should have that key or throw an error
            // Special case for sorting by objects as opposed string or numbers
            , sortObjects = typeof arr[0] === TYPEOF_OBJECT
            // Initialize current and min values in the case that we are sorting objects
            , currentValue
            , minimumValue;

        // Overarching loop to find and switch each element with the proper value from smallest to largest
        for (var i = 0; i < arr.length; i++) {
            // Set the beginning of the array to the smallest value
            // From here, its just a basic loop algorithm to find the smallest value in the array
            // Please note that during each iteration of the loop, it becomes smaller as it becomes sorted
            minimumId = i;
            for (var j = i + 1; j < arr.length; j++) {
                currentValue = sortObjects ? arr[j][field] : arr[j];
                minimumValue = sortObjects ? arr[minimumId][field] : arr[minimumId];

                // If current value smaller than the smallest value so far, set the current value's index as the minimum
                // index
                if (currentValue < minimumValue) {
                    minimumId = j;
                }
            }

            // Once the index is found to have the smallest value, we will switch the values with the current index the
            // Overarching loop is on
            switchIndexValues(arr, arr[i], arr[minimumId]);
        }

        // Return the sorted array
        return arr;
    }

    /**
     * Insertion Sort
     *
     * @description: Insertion sort is a simple sorting algorithm that builds the final sorted array (or list) one item
     * at a time. Insertion sort iterates, consuming one input element each repetition, and growing a sorted output
     * list. At each iteration, insertion sort removes one element from the input data, finds the location it belongs
     * within the sorted list, and inserts it there. It repeats until no input elements remain.
     *
     * @param arr
     * @param field
     * @returns {*}
     */
    function insertionSort(arr, field) {
        // Validate array first
        validateArray(arr, field);

        // If length is just one, return original array
        if (arr.length === 1) return arr;

        // We need to determine the elements of the array and the consistency of
        // i.e. If we are sorting an array of numbers, we should not detect any string or objects
        // If sorting by keys of an object, every element should have that key or throw an error
        // Special case for sorting by objects as opposed string or numbers
        var sortObjects = typeof arr[0] === TYPEOF_OBJECT
            , currentValue
            , comparedValue;

        // The idea of this algorithm is to loop through an array of elements and find a value in which the current
        // element is smaller than the current index's value.
        for (var i = 0; i < arr.length; i++) {
            currentValue = sortObjects ? arr[i][field] : arr[i];

            // This part will keep looping closer to the head of the array until we find a value that's smaller than the
            // current indexes value and slide the indexes over almost like an unshift
            for (var j = i - 1; j > -1; j--) {
                comparedValue = sortObjects ? arr[j][field] : arr[j];
                if (comparedValue > currentValue) continue;
                arr[j + 1] = arr[j]
            }
            arr[j + 1] = arr[i];
        }

        // Return sorted array
        return arr;
    }

    /**
     * Merge Sort
     *
     * @description: Merge sort is a sorting technique based on divide and conquer technique.
     * Divide the unsorted list into n sublists, each containing 1 element (a list of 1 element is considered sorted).
     * Repeatedly merge sublists to produce new sorted sublists until there is only 1 sublist remaining. This will be
     * the sorted list.
     *
     * @param arr
     * @param field
     * @returns {*}
     */
    function mergeSort(arr, field) {
        // Validate array first
        validateArray(arr, field);

        // If length is just one, return original array
        if (arr.length === 1) return arr;

        // We need to determine the elements of the array and the consistency of
        // i.e. If we are sorting an array of numbers, we should not detect any string or objects
        // If sorting by keys of an object, every element should have that key or throw an error
        // Special case for sorting by objects as opposed string or numbers
        var sortObjects = typeof arr[0] === TYPEOF_OBJECT
            // Initializes constants on where to separate array to two parts to sort individual arrays
            , middle = Math.floor(arr.length / 2)
            , left = arr.slice(0, middle)
            , right = arr.slice(middle);

        // Recursively merge the two sorted arrays back into one
        return merge(mergeSort(left, field), mergeSort(right, field), sortObjects, field);

        /**
         * Merging two arrays into a single sorted array
         *
         * @param left
         * @param right
         * @param sortObjects
         * @param field
         * @returns {*[]}
         */
        function merge(left, right, sortObjects, field) {
            // Initializes variables to be used
            var result = []
                , indexLeft = 0
                , indexRight = 0
                , leftValue
                , rightValue;

            // Merge arrays into a single sorted array by checking index values
            while (indexLeft < left.length && indexRight < right.length) {
                leftValue = sortObjects ? left[indexLeft][field] : left[indexLeft];
                rightValue = sortObjects ? right[indexRight][field] : right[indexRight];

                if (leftValue < rightValue) {
                    result.push(left[indexLeft]);
                    indexLeft++;
                } else {
                    result.push(right[indexRight]);
                    indexRight++;
                }
            }

            // Return combined sorted arrays into one
            return result.concat(left.slice(indexLeft)).concat(right.slice(indexRight));
        }
    }

    /**
     *
     * @param arr
     * @param field
     * @param sortObjects
     * @param left
     * @param right
     */
    function quickSort(arr, field, left, right) {
        // Validate array first
        validateArray(arr, field);

        // If length is just one, return original array
        if (arr.length === 1) return arr;

        // Set default values to the left and right indexes if beginning of the sort
        left = left || 0; // 0
        right = right || arr.length - 1; // 10

        // Lets designate a pivot that we will compare one side of the array to
        var pivot = partition(arr, field, left, right);

        // Sort the left side of the pivot recursively
        if (left < pivot - 1) {
            quickSort(arr, field, left, pivot - 1);
        }

        // Sort the right side of the pivot recursively
        if (right > pivot) {
            quickSort(arr, field, pivot, right);
        }

        // Returned sorted array
        return arr;

        /**
         * Partitioning is to
         *
         * @param arr
         * @param field
         * @param left
         * @param right
         * @returns {*}
         */
        function partition(arr, field, left, right) {
            // Initializes values that we ware to compare values to the pivot value
            var pivot = right
                , i = left
                , leftValue
                , pivotValue;

            // During loop, we will compare values to the pivot value to decide which side it will go on
            for (var j = left; j < right; j++) {
                leftValue = typeof arr[0] === TYPEOF_OBJECT ? arr[j][field] : arr[j];
                pivotValue = typeof arr[0] === TYPEOF_OBJECT ? arr[pivot][field] : arr[pivot];

                // Switch values of pivot index and looped index if looped index value is smaller than the pivot index
                // value
                if (leftValue <= pivotValue) {
                    switchIndexValues(arr, i, j);
                    i = i + 1;
                }
            }

            // Lastly, switch original pivot value with the first iteration index to move on to the next comparison
            switchIndexValues(arr, i, j);
            return i;
        }
    }

    /**
     * Validation method to determine if passed in array is valid enough to sort
     * i.e if all elements are the same data type, or if it is an array of objects, that
     * a key is provided and that key exists in every element of the array
     *
     * @param arr
     * @param field
     */
    function validateArray(arr, field) {
        // Initial validations
        if (arr[0] === 'undefined' || arr[0] === undefined) throw "Invalid data was used to be sorted. Please ensure than an array of more than 1 element is be asked to be sorted.";

        // We need to determine the elements of the array and the consistency of it
        // i.e. If we are sorting an array of numbers, we should not detect any string or objects
        // If sorting by keys of an object, every element should have that key or throw an error
        var arrayType = typeof arr[0] === TYPEOF_OBJECT;
        for (var i = 1; i < arr.length; i++) {
            if (arrayType === TYPEOF_OBJECT) {
                if (!field) throw "Can\'t sorry this array without a field to sort by, please enter a second parameter to sort by.";
                if (field && !(field in arr[i])) throw "While sorting array of objects, element on index " + i + " doesn\'t have the property " + field + " you wanted to sort by.";
            }
            if (typeof arr[i] !== arrayType) throw "Inconsistent data types throughout the array.";
        }
    }

    /**
     * Swap values of two indexes next to each other that are being compared
     *
     * @param arr
     * @param leftIndex
     * @param rightIndex
     */
    function switchIndexValues(arr, leftIndex, rightIndex) {
        // Hold the left indexes value because it will get overridden;
        var placeholder = arr[leftIndex];

        // Set the left indexes value to the right
        arr[leftIndex] = arr[rightIndex];

        // Set the right indexes value to the left
        arr[rightIndex] = placeholder;
    }
}

module.exports = JSSmartSort;