"use strict";

function checkCorrectnessSDNF() {
    let formula = document.getElementById("probablySDNF").value.toString();
    let answer = document.getElementById("answer");

    //Проверка наличия скобок
    if (formula.match(/\(|\)/g) == null) {
        answer.innerHTML = "Отсутствуют скобки.";
        return;
    }
    let allBrackets = formula.match(/\(|\)/g);

    //Проверка наличия лишних символов
    if (formula.match(/(?!([A-Z]|&|\||\(|\)|!))./g)) {  //(?!) - искать любые символы, кроме заключённых в данные скобки
        answer.innerHTML = "Некорректные символы.";
        return;
    }

    //Проверка чётности количества скобок
    if (allBrackets.length % 2 == 0) {
        if (checkGrammar(formula)) {  //Проверка соответствия грамматике
            if (formula.match(/\)\|\(/g))  //Проверка наличия конъюнкций
                answer.innerHTML = checkCorrectnessConjunctions(formula);  //Проверка корректности конъюнкций
            else
                answer.innerHTML = "Конъюнкции не найдены.";
        }
        else
            answer.innerHTML = "Формула не соответствует правилам грамматики.";
    }
    else
        answer.innerHTML = "Нечётное количество скобок.";
}


function checkGrammar(formula) {
    //Массивы унарных и бинарных сложных подформул 
    let arrayUnaryComplexFormulas, arrayBinaryComplexFormulas; 
    do {
        //Поиск унарных сложных подформул 
        arrayUnaryComplexFormulas = formula.match(/\(![A-Z01]\)/g);
        //Если найдены унарные сложные подформулы
        if (arrayUnaryComplexFormulas) 
            arrayUnaryComplexFormulas.forEach(function (unaryComplexFormula) {
                formula = formula.replace(unaryComplexFormula, 1); //Замена унарных сложных подформул на константу
            });
        
        //Поиск бинарных сложных подформул 
        arrayBinaryComplexFormulas = formula.match(/\([A-Z01](([&|~]|(->))[A-Z01])*\)/g);
        //Если найдены бинарные сложные подформулы
        if (arrayBinaryComplexFormulas) 
            arrayBinaryComplexFormulas.forEach(function (binaryComplexFormula) {
                formula = formula.replace(binaryComplexFormula, "1"); //Замена бинарных сложных подформул на константу
            });
    } while (arrayUnaryComplexFormulas || arrayBinaryComplexFormulas); //Пока в выражении есть унарные или бинарные сложные подформулы
    
	
	
    //Если вы выражении остались атомы или другие константы, то происходит их замена
	if (formula != "1")
		formula = formula.replace(/\([A-Z01](([&|~]|(->))[A-Z01])*\)/g, "1");
 
        
    //Если выражение соответствует грамматике, то в конце проверки в выражении останется только одна константа
    return formula == "1"; 
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