// function reverseString(str) {
//     var newString = "";
//     for (var i = str.length - 1; i >= 0; i--) {
//         newString += str[i];
//     }
//     return newString;
// }

/** Answer Starts from here */
//This is an object car with properties of doors, tyres, rearseats, windShield and Side mirrors.
let car = {
    doors: 2,
    tyres: 4,
    rearSeats: 2,
    windShield: 1,
    sideMirrors: 2,
    //This is a function that take in a car object and return the number of rearSeats of the car object
    carSideMirrorChecker: function  (){
       return this.rearSeats;

    }
};
console.log(car.carSideMirrorChecker());


// //This is a function called average which takes an array of integers as parameter and return its average;
let numberArray =  [2,7,8,10,5];
function average(input) {
       result = 0;
    for (let x = 0; x < input.length; x++) {
    result = result + input[x];
          finalResult = (result / (input.length));
           }
       return finalResult;
    }
     console.log(average(numberArray));
