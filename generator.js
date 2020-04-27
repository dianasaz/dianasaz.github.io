const left = '('
const right = ')'
const conjunction = '&'
const disjunction = '|'
const negation = '!'
const allLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

function generate() {
    let letters = ''
    let numberOfVariables = Math.round(Math.random() + 2)
    let result = ''

    letters += allLetters.substr(0, numberOfVariables)

    let rows = 2 ** numberOfVariables
    let tableOfTruth = []

    //fill table of truth
    for (let i = 0; i < rows; i++) {
        tableOfTruth[i] = []
        let bits = shift(numberOfVariables, i.toString(2))
        for (let j = 0; j < bits.length; j++) {
            tableOfTruth[i][j] = parseInt(bits.charAt(j))
        }
        tableOfTruth[i][numberOfVariables] = rand()

    }

    for (let i = 0; i < tableOfTruth.length; i++) {
        let temp = tableOfTruth[i][numberOfVariables]
        if (temp == 0){
            continue
        }
            if (result.length > 0){
                result += right + disjunction + left
            }
            for (let j = 0; j < numberOfVariables; j++) {
                if (tableOfTruth[i][j] == 1) {
                    result += left + negation + letters[j] + right
                } else {
                    result += letters[j]
                }
                if (j < letters.length- 1) {
                    result += conjunction
                }
            }
    }
    if (result.length > 0){
        result = left + result + right
    }
    document.getElementById('probablySDNF').value = left + result + right;

}

function shift(size, bits) {
    while (bits.length < size) {
        bits = '0' + bits
    }
    return bits
}

function rand() {
    if (Math.random() - 0.5 <= 0) {
        return 0
    } else {
        return 1
    }
}

function spoil() {
    let choice = rand()
    switch (choice) {
  case 0:
    return negation
    break;
  case 1:
    return ''
      break;
  default:
    return ''
}

}