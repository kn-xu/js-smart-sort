# js-smart-sort
The basis of this module is to let users have an easy way to sort arrays optimally. Depending on the type/size/length of array that gets passed, a specific sorting algorithm is chosen. This logic will likely be constantly changed over time due to more benchmark testing.

No dependencies are needed, only this module.

## Installation
Using npm:
```npm
$ npm i js-smart-sort --save
```

## Usage
```javascript
var jsSmartSort = require('js-smart-sort');
```

## Available Commands
Below is a list of commands for the module.
+ First parameter arr: the array you want to sort
+ Second parameter field: (OPTIONAL) parameter, key of the object you want to sort by, not needed if only sorting by numbers or string

### Dynamic
An algorithm will be chosen depending on the size/length/type:
```javascript
jsSmartSort.smartSort(arr, field) 
```

### Manual
Merge Sort
```javascript
jsSmartSort.smartSort(arr, field) 

```
Quick Sort
```javascript
jsSmartSort.quickSort(arr, field) 

```
Bubble Sort
```javascript
jsSmartSort.bubbleSort(arr, field) 

```
Insertion Sort
```javascript
jsSmartSort.insertionSort(arr, field) 

```
Selection Sort
```javascript
jsSmartSort.selectionSort(arr, field) 

```

## Version
+ v1.0.1: Fixed some bugs with sorting algorithms
+ v1.0.0: Initial creation of the module, comes with five sorting algorithms (merge, quick, bubble, insertion, selection)

## License
This project is licensed under the MIT License - see the [LICENSE](https://github.com/kn-xu/js-smart-sort/blob/master/LICENSE) file for details

 