function showModule(module) {
    // Hide all sections
    document.querySelectorAll("section").forEach(sec => sec.style.display = "none");

    // Show the requested one
    const target = document.getElementById(module);
    if (target) {
        target.style.display = "block";
    }

    // Update URL hash
    window.location.hash = module;
}

window.addEventListener("DOMContentLoaded", () => {
    const hash = window.location.hash.substring(1);
    if (hash) {
        showModule(hash);
    } else {
        showModule("html"); // default
    }
});
function goBack() {
    // If you want to return to new.html
    window.location.href = 'new.html#languages';

    // OR if you want to just go back in browser history:
    // window.history.back();
}


    // Global variables
    let currentSection = 'basics';
    let fruits = ['apple', 'banana', 'orange'];
    let todos = [];
    let currentDisplay = '0';
    let shouldResetDisplay = false;
    let randomNumber = Math.floor(Math.random() * 100) + 1;
    let counterInterval;
    let progress = 0;

    // Initialize the page
    window.onload = function() {
        updateProgressBar();
        setupEventListeners();
    };

    // Section navigation
    function showSection(sectionId) {
        document.querySelector(`.section.active`).classList.remove('active');
        document.getElementById(sectionId).classList.add('active');
        
        // Update active button
        document.querySelector('.nav-btn.active').classList.remove('active');
        event.target.classList.add('active');
        
        currentSection = sectionId;
        updateProgressBar();
    }

    // Update progress bar based on current section
    function updateProgressBar() {
        const sections = ['basics', 'variables', 'operators', 'control', 'functions', 
                         'arrays', 'objects', 'dom', 'events', 'async', 'projects'];
        const currentIndex = sections.indexOf(currentSection);
        progress = (currentIndex / (sections.length - 1)) * 100;
        document.getElementById('progressFill').style.width = progress + '%';
    }

    // Setup event listeners for interactive demos
    function setupEventListeners() {
        // Event section demo
        document.getElementById('eventButton').addEventListener('click', function() {
            document.getElementById('eventOutput').textContent = 'Button was clicked!';
        });

        document.getElementById('hoverButton').addEventListener('mouseover', function() {
            document.getElementById('eventOutput').textContent = 'Mouse hovered over button!';
        });

        document.getElementById('eventInput').addEventListener('input', function(e) {
            document.getElementById('eventOutput').textContent = 'Typed: ' + e.target.value;
        });

        // Mouse tracker
        const mouseTracker = document.getElementById('mouseTracker');
        mouseTracker.addEventListener('mousemove', function(e) {
            const rect = mouseTracker.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            document.getElementById('mouseOutput').textContent = `Mouse position: X=${x}, Y=${y}`;
        });
    }

    // Section 1: Basics
    function runBasicExample() {
        document.getElementById('basicOutput').textContent = 'Check your browser console!';
        console.log("Hello, World!");
        alert("Welcome to JavaScript!");
    }

    function showMessage() {
        alert("This is a message from JavaScript!");
    }

    function changeColor() {
        document.body.style.background = 'linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)';
        setTimeout(() => {
            document.body.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        }, 2000);
    }

    function getCurrentTime() {
        const now = new Date();
        document.getElementById('basicOutput').textContent = 'Current time: ' + now.toLocaleTimeString();
    }

    // Section 2: Variables
    function variableExamples() {
        let output = '';
        let name = "Alice";
        const age = 28;
        var oldWay = "deprecated";
        
        output += `Name: ${name}, Age: ${age}\n`;
        name = "Bob";
        output += `Changed name: ${name}\n`;
        output += `Old way: ${oldWay}\n`;
        
        document.getElementById('variableOutput').textContent = output;
    }

    function createPersonalMessage() {
        const name = document.getElementById('userName').value || 'Anonymous';
        const age = document.getElementById('userAge').value || 'unknown';
        
        document.getElementById('personalOutput').textContent = 
            `Hello ${name}! You are ${age} years old.`;
    }

    // Section 3: Operators
    function calculate() {
        const num1 = parseFloat(document.getElementById('num1').value);
        const num2 = parseFloat(document.getElementById('num2').value);
        const operator = document.getElementById('operator').value;
        
        let result;
        switch(operator) {
            case '+': result = num1 + num2; break;
            case '-': result = num1 - num2; break;
            case '*': result = num1 * num2; break;
            case '/': result = num1 / num2; break;
            case '%': result = num1 % num2; break;
            default: result = 'Invalid operator';
        }
        
        document.getElementById('calcOutput').textContent = `Result: ${result}`;
    }

    function comparisonExamples() {
        let output = '';
        let x = 5;
        let y = "5";
        
        output += `x == y: ${x == y}\n`;
        output += `x === y: ${x === y}\n`;
        output += `x != y: ${x != y}\n`;
        output += `x !== y: ${x !== y}\n`;
        
        document.getElementById('comparisonOutput').textContent = output;
    }

    // Section 4: Control Flow
    function classifyAge() {
        const age = parseInt(document.getElementById('ageInput').value);
        let message;
        
        if (age >= 65) {
            message = "Senior";
        } else if (age >= 18) {
            message = "Adult";
        } else if (age >= 13) {
            message = "Teenager";
        } else if (age >= 0) {
            message = "Child";
        } else {
            message = "Invalid age";
        }
        
        document.getElementById('ageOutput').textContent = message;
    }

    function loopExamples() {
        let output = '';
        
        // For loop
        output += "For loop:\n";
        for (let i = 0; i < 5; i++) {
            output += `Count: ${i}\n`;
        }
        
        // While loop
        output += "\nWhile loop:\n";
        let count = 0;
        while (count < 3) {
            output += `While count: ${count}\n`;
            count++;
        }
        
        document.getElementById('loopOutput').textContent = output;
    }

    // Section 5: Functions
    function testGreetFunction() {
        const name = document.getElementById('functionInput').value || 'stranger';
        document.getElementById('functionOutput').textContent = greet(name);
    }

    function greet(name) {
        return `Hello, ${name}!`;
    }

    function calculateAreaExample() {
        const length = parseFloat(document.getElementById('length').value);
        const width = parseFloat(document.getElementById('width').value);
        
        if (isNaN(length) || isNaN(width)) {
            document.getElementById('areaOutput').textContent = 'Please enter valid numbers';
            return;
        }
        
        const area = calculateArea(length, width);
        document.getElementById('areaOutput').textContent = `Area: ${area}`;
    }

    function calculateArea(length, width) {
        return length * width;
    }

    // Section 6: Arrays
    function addToArray() {
        const fruit = document.getElementById('arrayInput').value;
        if (fruit) {
            fruits.push(fruit);
            document.getElementById('arrayInput').value = '';
            showArray();
        }
    }

    function removeFromArray() {
        fruits.pop();
        showArray();
    }

    function showArray() {
        document.getElementById('arrayOutput').textContent = `Fruits: ${fruits.join(', ')}`;
    }

    function arrayMethodsDemo() {
        const numbers = [1, 2, 3, 4, 5];
        let output = '';
        
        output += `Original: ${numbers}\n`;
        output += `Mapped (x2): ${numbers.map(x => x * 2)}\n`;
        output += `Filtered (even): ${numbers.filter(x => x % 2 === 0)}\n`;
        output += `Reduced (sum): ${numbers.reduce((total, num) => total + num, 0)}\n`;
        
        document.getElementById('arrayMethodsOutput').textContent = output;
    }

    // Section 7: Objects
    function createPerson() {
        const name = document.getElementById('personName').value || 'Anonymous';
        const age = document.getElementById('personAge').value || 'unknown';
        const city = document.getElementById('personCity').value || 'unknown';
        
        const person = {
            name,
            age,
            city,
            greet() {
                return `Hello, I'm ${this.name} from ${this.city}!`;
            },
            getBirthYear() {
                return new Date().getFullYear() - this.age;
            }
        };
        
        let output = '';
        output += `Name: ${person.name}\n`;
        output += `Age: ${person.age}\n`;
        output += `City: ${person.city}\n`;
        output += `Greeting: ${person.greet()}\n`;
        
        if (!isNaN(age)) {
            output += `Estimated birth year: ${person.getBirthYear()}\n`;
        }
        
        document.getElementById('personOutput').textContent = output;
    }

    function objectMethodsDemo() {
        const car = {
            brand: "Toyota",
            model: "Camry",
            year: 2020,
            start() {
                return `${this.brand} ${this.model} is starting!`;
            },
            getAge() {
                return new Date().getFullYear() - this.year;
            }
        };
        
        let output = '';
        output += `Car: ${car.brand} ${car.model}\n`;
        output += `Start: ${car.start()}\n`;
        output += `Age: ${car.getAge()} years\n`;
        
        document.getElementById('objectMethodsOutput').textContent = output;
    }

    // Section 8: DOM Manipulation
    function changeText() {
        document.getElementById('demoText').textContent = 'Text changed with JavaScript!';
        document.getElementById('domOutput').textContent = 'Text content changed.';
    }

    function changeStyle() {
        const demoText = document.getElementById('demoText');
        demoText.style.color = 'red';
        demoText.style.fontWeight = 'bold';
        demoText.style.fontSize = '1.2em';
        document.getElementById('domOutput').textContent = 'Styles applied.';
    }

    function addClass() {
        document.getElementById('demoText').classList.add('highlight');
        document.getElementById('domOutput').textContent = 'CSS class added.';
    }

    function createNewElement() {
        const text = document.getElementById('elementText').value;
        if (!text) return;
        
        const newElement = document.createElement('div');
        newElement.textContent = text;
        newElement.className = 'todo-item';
        
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'delete-btn';
        deleteBtn.onclick = function() {
            newElement.remove();
        };
        
        newElement.appendChild(deleteBtn);
        document.getElementById('elementContainer').appendChild(newElement);
        
        document.getElementById('elementText').value = '';
    }

    function clearElements() {
        document.getElementById('elementContainer').innerHTML = '';
    }

    // Section 9: Events
    // Event listeners are set up in setupEventListeners()

    // Section 10: Asynchronous JavaScript
    function startTimer() {
        document.getElementById('timerOutput').textContent = 'Timer started (5 seconds)...';
        
        setTimeout(() => {
            document.getElementById('timerOutput').textContent = 'Timer finished!';
        }, 5000);
    }

    let counter = 0;
    function startCounter() {
        stopCounter(); // Clear any existing interval
        counter = 0;
        document.getElementById('timerOutput').textContent = 'Counter: 0';
        
        counterInterval = setInterval(() => {
            counter++;
            document.getElementById('timerOutput').textContent = `Counter: ${counter}`;
        }, 1000);
    }

    function stopCounter() {
        clearInterval(counterInterval);
    }

    function promiseDemo() {
        document.getElementById('promiseOutput').textContent = 'Promise in progress...';
        
        const myPromise = new Promise((resolve, reject) => {
            const success = Math.random() > 0.3; // 70% chance of success
            
            setTimeout(() => {
                if (success) {
                    resolve("Operation completed successfully!");
                } else {
                    reject("Operation failed!");
                }
            }, 2000);
        });
        
        myPromise
            .then(result => {
                document.getElementById('promiseOutput').textContent = result;
            })
            .catch(error => {
                document.getElementById('promiseOutput').textContent = error;
            });
    }

    // Section 11: Projects
    // Calculator functions
    function appendToCalc(value) {
        if (currentDisplay === '0' || shouldResetDisplay) {
            currentDisplay = value;
            shouldResetDisplay = false;
        } else {
            currentDisplay += value;
        }
        updateCalcDisplay();
    }

    function clearCalc() {
        currentDisplay = '0';
        updateCalcDisplay();
    }

    function deleteLast() {
        if (currentDisplay.length === 1) {
            currentDisplay = '0';
        } else {
            currentDisplay = currentDisplay.slice(0, -1);
        }
        updateCalcDisplay();
    }

    function calculateResult() {
        try {
            currentDisplay = eval(currentDisplay).toString();
        } catch (e) {
            currentDisplay = 'Error';
        }
        shouldResetDisplay = true;
        updateCalcDisplay();
    }

    function updateCalcDisplay() {
        document.getElementById('calcDisplay').textContent = currentDisplay;
    }

    // Todo List functions
    function addTodo() {
        const input = document.getElementById('todoInput');
        const text = input.value.trim();
        
        if (text) {
            todos.push({ text, completed: false });
            input.value = '';
            renderTodoList();
        }
    }

    function renderTodoList() {
        const todoList = document.getElementById('todoList');
        todoList.innerHTML = '';
        
        todos.forEach((todo, index) => {
            const todoItem = document.createElement('div');
            todoItem.className = `todo-item ${todo.completed ? 'completed' : ''}`;
            todoItem.innerHTML = `
                <span>${todo.text}</span>
                <div>
                    <button onclick="toggleTodo(${index})">${todo.completed ? 'Undo' : 'Complete'}</button>
                    <button class="delete-btn" onclick="removeTodo(${index})">Delete</button>
                </div>
            `;
            todoList.appendChild(todoItem);
        });
    }

    function toggleTodo(index) {
        todos[index].completed = !todos[index].completed;
        renderTodoList();
    }

    function removeTodo(index) {
        todos.splice(index, 1);
        renderTodoList();
    }

    // Number Guessing Game
    function makeGuess() {
        const guessInput = document.getElementById('guessInput');
        const guess = parseInt(guessInput.value);
        const output = document.getElementById('gameOutput');
        
        if (isNaNguess) {
            output.textContent = 'Please enter a valid number';
            return;
        }
        
        if (guess < randomNumber) {
            output.textContent = 'Too low! Try again.';
        } else if (guess > randomNumber) {
            output.textContent = 'Too high! Try again.';
        } else {
            output.textContent = `Congratulations! You guessed the number ${randomNumber}!`;
        }
        
        guessInput.value = '';
        guessInput.focus();
    }

    function resetGame() {
        randomNumber = Math.floor(Math.random() * 100) + 1;
        document.getElementById('gameOutput').textContent = 'New game started. Guess a number between 1-100!';
        docum
    }ent.getElementById('guessInput').value = '';
    //add html



