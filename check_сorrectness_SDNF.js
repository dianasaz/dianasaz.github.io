var unaryOrBinaryComplexFormula = new RegExp('([(][!]([A-Z])[)])|([(]([A-Z])((&)|(\\|)|(->)|(~))([A-Z])[)])','g');
var unaryOrBinaryComplexFormula1 = new RegExp('([(][!]([A-Z])[)])|([(]([A-Z])((&)|(\\|)|(->)|(~))([A-Z])[)])');
var atomOrConstant = new RegExp('([A-Z]|[0-1])', 'g');
var replaceFormula = "R";

function checkCorrectnessSDNF() {
    let formula = document.getElementById("probablySDNF").value;
    let answer = document.getElementById("answer");

    if (isFormula(formula)) {
        answer.innerHTML = checkCorrectnessConjunctions(formula);  //Проверка корректности конъюнкций
    }
    else 
        answer.innerHTML = "Не формула";
}

function checkCorrectnessConjunctions(formula) {
    //Разбиение исходной формулы на конъюнкции
    let arrayOfDisjunctions = formula.split("|"); 
    let arrayOfUsedVariables = [];
    for (let i = 0; i < arrayOfDisjunctions.length; i++) {
        for (let j = 0; j < arrayOfDisjunctions.length; j++) {
            if (i != j) {  
                //Определение используемых в конъюнкции переменных
                arrayOfUsedVariables = arrayOfDisjunctions[i].match(/([A-Z]|(![A-Z]))+/g);

                //Поиск одинаковых конъюнкций
                let equals = 0;
                for (let k = 0; k < arrayOfUsedVariables.length; k++) {
                    if (arrayOfUsedVariables[k] == arrayOfDisjunctions[j].match(/([A-Z]|(![A-Z]))+/g)[k])
                        equals++;
                    else 
                        equals--;
                }
                if (equals == arrayOfUsedVariables.length)
                    return "Формула не является СДНФ. Найдены одинаковые конъюнкции " + arrayOfDisjunctions[i] + ".";

                //Проверка каждой конъюнкции на использование всех переменных
                for (let k = 0; k < arrayOfUsedVariables.length; k++) {
                    if (arrayOfUsedVariables[k].length == 1)
                        equals = arrayOfDisjunctions[j].indexOf(arrayOfUsedVariables[k]);
                    else 
                        equals = arrayOfDisjunctions[j].indexOf(arrayOfUsedVariables[k][1]);
                    if (equals == -1)
                        return "Формула не является СДНФ. Найдена конъюнкция " + arrayOfDisjunctions[j] + ", содержащая не все переменные.";
                }
            }
        }
    }
    return "Формула является СДНФ.";
}

function isFormula(formula) { //проверка является ли строка формулой
    let tempFormula
    while (formula != tempFormula) {
        tempFormula = formula;
        formula = formula.replace(unaryOrBinaryComplexFormula, replaceFormula);
    }
    tempFormula = 0;
    if ((formula.length == 1)) {
        return true;
    } else {
        return false;
    }
}