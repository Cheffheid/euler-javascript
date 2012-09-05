var EULER = {
    helpers: {
        // ******************** HELPER FUNCTIONS ****************************************
        // These are functions that are necessary for solving some of the problems, 
        // but provide functionality generic enough for re-use.

        // Simple function to write the problem's answer to page, used on testing.html
        writeToPage: function (problem, stuff) {
            $("p.answer").html("The answer to problem #" + problem + " is: " + stuff);
        },

        // Reversing a string
        // Used for: Problem #4
        reverse: function (string) {
            var splitArray;
			var reversedString;

            // Split the string into an array
            splitArray = string.split("");

            // Reverse the array
            splitArray = splitArray.reverse();

            // Join the array back to a string, no delimiter
            reversedString = splitArray.join("");

            // Return the reversed String
            return reversedString;
        },

        // An inseperable pair of functions to calculate the GCD and LCM of two numbers
        // Used for: Problem #5
        gcd: function (a, b) {
            // Formula for GCD
            return ( b === 0 ) ? (a) : (EULER.helpers.gcd( b, a % b ) );
        },

        lcm: function (a, b) {
            // Formula for LCM
            return ( a * b / EULER.helpers.gcd( a, b ) );
        },

        // Function to determine if a number is a prime number
        // Used for: Problems #7, #10
        isPrime: function (number) {
            var isPrimeNr;
            // Even numbers are generally not primes, except 2
            if ( number % 2 === 0 ) {
                // Returns true if the number is 2(prime), false otherwise
                isPrimeNr = ( number === 2 );
            // Test the odd numbers
            } else {
                var sq = Math.sqrt( number );

                // Trial division: divide number by an i greather than 1 and less than the square of number
                for ( var i = 3; i <= sq; i += 2 ) {
                    if ( number % i === 0 ) {
                        // If it can be divided without remainders, it's not a prime
                        isPrimeNr = false;
                    }
                }
                // If the input passed through completely, it's a prime
                isPrimeNr = true;
            }
			return isPrimeNr;
        }
    },

    solutions: {

        // ******************** MAIN FUNCTIONS ***************************************************
        // From here are the main functions used to determine the answer to the specific problems.
        // They're all named "problemx", where x is the number of the problem as on projecteuler.net.
        // Generally speaking, parameters are named for their expected purpose.
        // ie. if a function expects a string or number, the parameter will be named "string" or "number"(Or even "numbers", for an array of numbers).
        // Exception for problems where a maximum is specified(like problem 2), 
        // the function in question will have a parameter "max", rather than "number".
        // Lastly, the return variable will be "answer" where applicable

        // Problem #1
        // If we list all the natural numbers below 10 that are multiples of 3 or 5, we get 3, 5, 6 and 9. The sum of these multiples is 23.
        // Find the sum of all the multiples of 3 or 5 below 1000.

        // Really simple for loop, goes without any further explanation I suppose.

        problem1: function ( number ) {
            var answer = 0;

            for ( var i = 0; i < number; i++ ) {
                if ( i % 3 === 0 || i % 5 === 0 ) {
                    answer += i;
                }
            }
            return answer;
        },

        // Problem #2
        // Each new term in the Fibonacci sequence is generated by adding the previous two terms. By starting with 1 and 2, the first 10 terms will be:
        // 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, ...
        // By considering the terms in the Fibonacci sequence whose values do not exceed four million, find the sum of the even-valued terms.

        problem2: function (max) {
            var answer = 0;

            // Starting out with an array with the two starting values of the Fibonnaci sequence
            var fibArray = [1, 1];

            // Run the while as long as the one-before-last value is under 4 million
            while ( fibArray[fibArray.length - 1] < max ) {

                // Add the sum of the last two array items to the end of the array
                fibArray.push(fibArray[fibArray.length - 1] + fibArray[fibArray.length - 2]);
            }

            // The problem requires we only find the sum of the even-valued terms, so we need to go over the array and add the even ones to sum
            for ( var i = 0; i < fibArray.length; i++ ) {
                if ( fibArray[i] % 2 === 0 ) {
                    answer += fibArray[i];
                }
            }

            return answer;
        },

        // Problem #3
        // The prime factors of 13195 are 5, 7, 13 and 29.
        // What is the largest prime factor of the number 600851475143 ?

        problem3: function (number) {
            // Define a new array to store prime factors
            var array = [];

            for( var i = 2; i <= number; i++ ){

                // Check if nr can be divided by i with no remainder
                if( number % i === 0 ){

                    // If so, reassign number to number / i and push i to the array
                    number = number / i;
                    array.push(i);
                }
            }

            // Return the largest prime factor in the array, which is the last in the array
            return array[ array.length - 1 ];
        },

        // Problem #4
        // A palindromic number reads the same both ways. The largest palindrome made from the product of two 2-digit numbers is 9009 = 91 99.
        // Find the largest palindrome made from the product of two 3-digit numbers.


        problem4: function() {
            var answer = 0;

            // Start at 100, count up to 999
            for( var i = 100; i < 1000; i++ ) {

                // Same, start at 100 and count up to 999
                for( var j = 100; j < 1000; j++ ) {

                    // temporarily store product of i and j
                    var temp = i * j;

                    // Check if temp is the same forwards as backwards
                    if ( temp.toString() === EULER.helpers.reverse( temp.toString() ) ) {
                        // Check if it's larger than variable answer and store it if it is
                        if ( temp > answer ) {
                            answer = temp;
                        }
                    }
                }
            }
            return answer;
        },

        // Problem #5
        // 2520 is the smallest number that can be divided by each of the numbers from 1 to 10 without any remainder.
        // What is the smallest positive number that is evenly divisible by all of the numbers from 1 to 20?

        // There's two ways to do this: Easy dirty or "complex" and neat

        // The easy way would be cheesing it by simply running a for loop and checking modulos 11 through 20 untill we've found a number that gets through it all
        // However, a faster way is by using maths, the Least Common Multiple(LCM) and Greatest Common Divisor(GCD). 
        // Functions with these formulas can be found under the helper functions(lcm() and gcd()).

        // This function will continually call itself untill there's only one item left in the array.
        // It takes the top pair and gets the LCM from them, using the lcm function above, and puts it at the end of the array
        // Using pop(), it ensures no numbers are processed more than once
                
        problem5: function (numbers) {
            if (numbers.length > 1) {
                numbers.push( EULER.helpers.lcm( numbers.pop(), numbers.pop() ) );
                return this.problem5( numbers );
            } else {
                return numbers[0];
            }
        },

        // Problem #6
        // The sum of the squares of the first ten natural numbers is,
        //     1� + 2� + ... + 10� = 385
        // The square of the sum of the first ten natural numbers is,
        //     (1 + 2 + ... + 10)� = 55� = 3025
        // Hence the difference between the sum of the squares of the first
        // ten natural numbers and the square of the sum is 3025 - 385 = 2640.
        //
        // Find the difference between the sum of the squares of the first one
        // hundred natural numbers and the square of the sum.

        problem6: function (number, power) {
            var sumSquares = 0;
            var squareSum = 0;

            for( var i = 1; i <= number; i++ ) {
                sumSquares += Math.pow(i, power);
                squareSum += i; // We'll square this later; saves another for loop adding it now
            }

            squareSum = Math.pow(squareSum, power);
            return squareSum - sumSquares;
        },

        // Problem #7
        // By listing the first six prime numbers: 2, 3, 5, 7, 11, and 13, we can see that the 6th prime is 13.
        // What is the 10 001st prime number?

        problem7: function (number) {
            var answer = 0;
            var j = 2; // Counter to test for primes
            var i = 0; // counter that compares to number parameter

            // Keep looping untill we've found the requested prime
            while (i !== number){
                if ( EULER.helpers.isPrime( j ) ){
                    answer = j; // We found a prime! Assign it to answer
                    i++;
                }
                j++;
            }

            return answer;
        },

        // Problem #8
        // Find the greatest product of five consecutive digits in the 1000-digit number.
        /*
            73167176531330624919225119674426574742355349194934
            96983520312774506326239578318016984801869478851843
            85861560789112949495459501737958331952853208805511
            12540698747158523863050715693290963295227443043557
            66896648950445244523161731856403098711121722383113
            62229893423380308135336276614282806444486645238749
            30358907296290491560440772390713810515859307960866
            70172427121883998797908792274921901699720888093776
            65727333001053367881220235421809751254540594752243
            52584907711670556013604839586446706324415722155397
            53697817977846174064955149290862569321978468622482
            83972241375657056057490261407972968652414535100474
            82166370484403199890008895243450658541227588666881
            16427171479924442928230863465674813919123162824586
            17866458359124566529476545682848912883142607690042
            24219022671055626321111109370544217506941658960408
            07198403850962455444362981230987879927244284909188
            84580156166097919133875499200524063689912560717606
            05886116467109405077541002256983155200055935729725
            71636269561882670428252483600823257530420752963450
        */

        // Interpreting the input as string for this one, because the number is larger than "Infinity", which makes splitting the number to an array impossible
        // It also allows for use of the substring() method to get the five numbers we need.

        problem8: function (string) {
            var product = 0; 
            var answer = 0;
            var stringLength = string.length; // obtain the length of the string, to make the function more flexible.

            // Using stringlength - 6, because the string's index starts at 0 and we add 1 through 5 to i to get the numbers we need. Therefor, we only need i to count up to 994 for this problem.
            for ( var i = 0; i < stringLength - 6; i++ ) {    
                product = string.substring(i, i + 1) * string.substring(i + 1, i + 2) * string.substring(i + 2, i + 3) * string.substring(i + 3, i + 4) * string.substring(i + 4, i + 5);

                if ( product > answer ) {
                    answer = product; // We found a new winner, assign it to answer!
                }
            }
            return answer;
        },

        // Problem #9
        // A Pythagorean triplet is a set of three natural numbers, a < b < c, for which,

        // a� + b� = c�
        // For example, 3� + 4� = 9 + 16 = 25 = 5�.

        // There exists exactly one Pythagorean triplet for which a + b + c = 1000.
        // Find the product abc.

        problem9: function (number) {
            var answer = 0;
            var a = 0;
            var b = 0;
            var c = 0;

            for ( a = 1; a <= number / 3; a++ ) { // a < b < c, so it stands to reason that a only goes up to a third of the sum of a, b and c
                for ( b = a + 1; b < number / 2; b++) { // Similarly, b could potentially be close to half to still be smaller than c and bigger than a. Odds are we'll find the answer before then.
                    c = number - a - b;    // c will be the remainder to make it easier and use less variables
 
                    if ( c > 0 && (( a * a ) + ( b * b ) === ( c * c )) ) {    // If c is larger than 0 and the three make a Pythagorean triplet
                        answer = a * b * c;                                // Get the product and return it
                    }
                }
            }
            return answer;
        },

        // Problem #10
        // The sum of the primes below 10 is 2 + 3 + 5 + 7 = 17.
        // Find the sum of all the primes below two million.

        // For this we're using the previously declared helper function "isPrime()". No need to declare it again.
        problem10: function (number) {
            var answer = 0;

            for( var i = 2; i < number; i++ ) {
                if ( EULER.helpers.isPrime(i) ) {
                    answer += i;
                }
            }

            return answer;
        },

        // Problem #11
        // In the 20x20 grid below, four numbers along a diagonal line have been marked in red.
        /* 
            08 02 22 97 38 15 00 40 00 75 04 05 07 78 52 12 50 77 91 08
            49 49 99 40 17 81 18 57 60 87 17 40 98 43 69 48 04 56 62 00
            81 49 31 73 55 79 14 29 93 71 40 67 53 88 30 03 49 13 36 65
            52 70 95 23 04 60 11 42 69 24 68 56 01 32 56 71 37 02 36 91
            22 31 16 71 51 67 63 89 41 92 36 54 22 40 40 28 66 33 13 80
            24 47 32 60 99 03 45 02 44 75 33 53 78 36 84 20 35 17 12 50
            32 98 81 28 64 23 67 10 26 38 40 67 59 54 70 66 18 38 64 70
            67 26 20 68 02 62 12 20 95 63 94 39 63 08 40 91 66 49 94 21
            24 55 58 05 66 73 99 26 97 17 78 78 96 83 14 88 34 89 63 72
            21 36 23 09 75 00 76 44 20 45 35 14 00 61 33 97 34 31 33 95
            78 17 53 28 22 75 31 67 15 94 03 80 04 62 16 14 09 53 56 92
            16 39 05 42 96 35 31 47 55 58 88 24 00 17 54 24 36 29 85 57
            86 56 00 48 35 71 89 07 05 44 44 37 44 60 21 58 51 54 17 58
            19 80 81 68 05 94 47 69 28 73 92 13 86 52 17 77 04 89 55 40
            04 52 08 83 97 35 99 16 07 97 57 32 16 26 26 79 33 27 98 66
            88 36 68 87 57 62 20 72 03 46 33 67 46 55 12 32 63 93 53 69
            04 42 16 73 38 25 39 11 24 94 72 18 08 46 29 32 40 62 76 36
            20 69 36 41 72 30 23 88 34 62 99 69 82 67 59 85 74 04 36 16
            20 73 35 29 78 31 90 01 74 31 49 71 48 86 81 16 23 57 05 54
            01 70 54 71 83 51 54 69 16 92 33 48 61 43 52 01 89 19 67 48
        */
        // The product of these numbers is 26  63  78  14 = 1788696.
        // What is the greatest product of four adjacent numbers in any direction (up, down, left, right, or diagonally) in the 20x20 grid?

        // This is one of the few problems where I've decided to follow the instructions, rather than making it as flexible as possible...
        // Reason being, the grid is somewhat awkward to input into the function
        // The way this function works is by going through the grid and only looking downward from a number and ensuring we don't run out of bounds
        // This should make it a lot faster than checking every number in every direction, especially as we reach the bottom of the grid

        problem11: function() {
            var answer = 0;
            var product = 0;
            var rows = 19; // 0 to 19 = 20
            var columns = 19; // 0 to 19 = 20
            
            var grid = [
                [8,2,22,97,38,15,0,4,0,75,4,5,7,78,52,12,50,77,91,8],
                [49,49,99,40,17,81,18,57,60,87,17,40,98,43,69,48,4,56,62,0],
                [81,49,31,73,55,79,14,29,93,71,40,67,53,88,30,3,49,13,36,65],
                [52,70,95,23,4,60,11,42,69,24,68,56,1,32,56,71,37,2,36,91],
                [22,31,16,71,51,67,63,89,41,92,36,54,22,40,40,28,66,33,13,80],
                [24,47,32,60,99,3,45,2,44,75,33,53,78,36,84,20,35,17,12,50],
                [32,98,81,28,64,23,67,10,26,38,40,67,59,54,70,66,18,38,64,70],
                [67,26,20,68,2,62,12,20,95,63,94,39,63,8,40,91,66,49,94,21],
                [24,55,58,5,66,73,99,26,97,17,78,78,96,83,14,88,34,89,63,72],
                [21,36,23,9,75,0,76,44,20,45,35,14,0,61,33,97,34,31,33,95],
                [78,17,53,28,22,75,31,67,15,94,3,80,4,62,16,14,9,53,56,92],
                [16,39,5,42,96,35,31,47,55,58,88,24,0,17,54,24,36,29,85,57],
                [86,56,0,48,35,71,89,7,5,44,44,37,44,60,21,58,51,54,17,58],
                [19,80,81,68,5,94,47,69,28,73,92,13,86,52,17,77,4,89,55,40],
                [4,52,8,83,97,35,99,16,7,97,57,32,16,26,26,79,33,27,98,66],
                [88,36,68,87,57,62,20,72,3,46,33,67,46,55,12,32,63,93,53,69],
                [4,42,16,73,38,25,39,11,24,94,72,18,8,46,29,32,40,62,76,36],
                [20,69,36,41,72,30,23,88,34,62,99,69,82,67,59,85,74,4,36,16],
                [20,73,35,29,78,31,90,1,74,31,49,71,48,86,81,16,23,57,5,54],
                [1,70,54,71,83,51,54,69,16,92,33,48,61,43,52,1,89,19,67,48]
            ];
            
            
            for ( var i = 0; i <= rows; i++ ) {
                for ( var j = 0; j < columns; j++ ) {

                    if ( j < columns - 3) {
                        // Horizontal
                        product = grid[i][j] * grid[i][j+1] * grid[i][j+2] * grid[i][j+3];
                        if ( product > answer ) {
                            answer = product;
                        }
                    }
                    if ( i < rows - 3 ) {
                        // Vertical
                        product = grid[i][j] * grid[i+1][j] * grid[i+2][j] * grid[i+3][j];
                        if ( product > answer ) {
                            answer = product;
                        }
                        // Diagonally to the right
                        if ( j < columns - 3) {
                            product = grid[i][j] * grid[i+1][j+1] * grid[i+2][j+2] * grid[i+3][j+3];
                            if ( product > answer ) {
                                answer = product;
                            }
                        }
                        // Diagonally to the left
                        if ( j > 3) {
                            product = grid[i][j] * grid[i+1][j-1] * grid[i+2][j-2] * grid[i+3][j-3];
                            if ( product > answer ) {
                                answer = product;
                            }
                        }
                    }
                }
            }
            return answer;
        }
    }
};