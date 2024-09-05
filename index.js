const display = document.getElementById("display");
const historyElement = document.getElementById("history-list");

function appendToDisplay(input) {
    display.value += input;
    display.classList.remove("error"); // Убираем выделение красным при новых вводах
}

function clearDisplay() {
    display.value = '';
}

function backspace() {
    display.value = display.value.slice(0, -1);
}

function calculate() {
    try {
        // Проверяем, если display пустой или заканчивается на оператор, не выполняем вычисление
        if (display.value === '' || /[\+\-\*\/]$/.test(display.value)) {
            display.value = "Error";
            display.classList.add("error");
            addToHistory("Invalid Input", "Error");
            return;
        }

        const result = eval(display.value);

        if (result !== undefined && !isNaN(result)) {
            addToHistory(display.value, result); // Добавляем в историю только валидные результаты
            display.value = result;
        } else {
            display.value = "Error";
            display.classList.add("error"); // Выделяем красным при ошибке
            addToHistory(display.value, "Error");
        }
    } catch (error) {
        display.value = "Error";
        display.classList.add("error"); // Выделение экрана красным при ошибке
        addToHistory("Invalid Input", "Error");
    }
}

function addToHistory(expression, result) {
    const li = document.createElement("li");

    // Если результат является объектом (например, ошибка), приводим его к строке
    if (typeof result === "object") {
        result = "Error";
    }

    li.textContent = `${expression} = ${result}`;
    historyElement.appendChild(li);
}

function toggleTheme() {
    document.body.classList.toggle("light-theme");
    document.body.classList.toggle("dark-theme");
}
