
const left = '('
const right = ')'
const conjunction2 = '&'
const disjunction2 = '|'
const negation2 = '!'
const allLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

function generate2() {
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
    console.log(tableOfTruth)

    for (let i = 0; i < tableOfTruth.length; i++) {
        let temp = tableOfTruth[i][numberOfVariables]
        if (temp == 0){
            continue
        }
            if (result.length > 0){
                result += disjunction2
            }
            result += left
            for (let j = 0; j < numberOfVariables; j++) {
                if (tableOfTruth[i][j] == 1) {
                    result += left + negation2 + letters[j] + right
                } else {
                    result += letters[j]
                }
                if (j < letters.length- 1) {
                    result += conjunction2
                }
            }
            result += right
    }
    if (result.length > 0){
        result = left + result + right
    }
    document.getElementById('probablySDNF').value = result;

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
