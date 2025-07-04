const display = document.getElementById('display');
const buttons = document.querySelectorAll('button');

// Focus on load
document.addEventListener('DOMContentLoaded', () => {
  display.focus();
});

// Handle input from both button click and keyboard
function inputHandler(key, fromKeyboard = false) {
  const current = display.value;
  const operators = ['+', '-', '*', '/', '×', '÷'];

  if (key === 'C' || key === 'Escape') {
    display.value = '';
    return;
  }

  if (key === 'Backspace') {
    display.value = current.slice(0, -1);
    return;
  }

  if (key === 'Enter' || key === '=') {
    try {
      const expression = current.replace(/÷/g, '/').replace(/×/g, '*');
      const result = eval(expression);
      display.value = result;
    } catch {
      display.value = 'Error';
    }
    return;
  }

  // Prevent double operators
  const lastChar = current.slice(-1);
  if (operators.includes(key) && operators.includes(lastChar)) return;

  // Replace × or ÷ if entered from keyboard
  if (key === '*') key = '×';
  if (key === '/') key = '÷';

  // Allow input
  if (/[0-9+\-×÷.]/.test(key)) {
    display.value += key;
  }
}

// Handle button clicks
buttons.forEach(button => {
  button.addEventListener('click', () => {
    const key = button.dataset.key;
    inputHandler(key);
    display.focus();
  });
});

// Handle keyboard input
document.addEventListener('keydown', (e) => {
  let key = e.key;

  if (key === 'c' || key === 'C') key = 'C';
  if (key === 'Escape') key = 'Escape';
  if (key === 'Enter' || key === '=') key = 'Enter';

  const validKeys = ['0','1','2','3','4','5','6','7','8','9',
                     '+','-','*','/','.','Enter','Backspace','C','Escape','=',];

  if (validKeys.includes(key)) {
    inputHandler(key, true);
    highlightKey(key);
  }
});

// Optional button highlight effect
function highlightKey(key) {
  const button = [...buttons].find(btn => btn.dataset.key === key);
  if (button) {
    button.classList.add('active');
    setTimeout(() => button.classList.remove('active'), 150);
  }
}
