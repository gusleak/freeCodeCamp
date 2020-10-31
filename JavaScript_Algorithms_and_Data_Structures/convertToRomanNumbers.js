function convertToRoman(num) {
    const romanChars = {
        1: 'I',
        5: 'V',
        10: 'X',
        50: 'L',
        100: 'C',
        500: 'D',
        1000: 'M'
    }
    let digit;
    let arr = [];
    let numLength = num.toString().length;
    switch (numLength) {

        case 4:
            digit = num % 10000;
            for (let i = 1000; i <= digit; i += 1000) {
                arr.push(romanChars[1000]);
            }
            numLength--;

        case 3:
            digit = num % 1000;
            if (digit <= 399) {
                for (let i = 100; i <= digit; i += 100) {
                arr.push(romanChars[100]);
                }
            } else if (digit <= 899) {
                if (digit === 500) {
                    arr.push(romanChars[500]);
                } else if (digit - 500 > 0) {
                    arr.push(romanChars[500]);
                    for (let i = 600; i <= digit; i += 100) {
                        arr.push(romanChars[100]);
                } 
                } else {
                    arr.push(romanChars[100]);
                    arr.push(romanChars[500]);
                }
            } else {
                arr.push(romanChars[100]);
                arr.push(romanChars[1000]);
            }
            numLength--;

        case 2:
            digit = num % 100;
            if (digit <= 39) {
                for (let i = 10; i <= digit; i += 10) {
                arr.push(romanChars[10]);
                }
            } else if (digit <= 89) {
                if (digit === 50) {
                    arr.push(romanChars[50]);
                } else if (digit - 50 > 0) {
                    arr.push(romanChars[50]);
                    for (let i = 60; i <= digit; i += 10) {
                        arr.push(romanChars[10]);
                } 
                } else {
                    arr.push(romanChars[10]);
                    arr.push(romanChars[50]);
                }
            } else {
                arr.push(romanChars[10]);
                arr.push(romanChars[100]);
            }
            numLength--;

        case 1:
            digit = num % 10;
            if (digit <= 3) {
                for (let i = 1; i <= digit; i++) {
                arr.push(romanChars[1]);
                }
            } else if (digit <= 8) {
                if (digit === 5) {
                    arr.push(romanChars[5]);
                } else if (digit - 5 > 0) {
                    arr.push(romanChars[5]);
                    for (let i = 6; i <= digit; i++) {
                        arr.push(romanChars[1]);
                } 
                } else {
                    arr.push(romanChars[1]);
                    arr.push(romanChars[5]);
                }
            } else {
                arr.push(romanChars[1]);
                arr.push(romanChars[10]);
            }
            numLength--;
    }
 return arr.join('');
}
