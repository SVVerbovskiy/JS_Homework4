const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(prompt) {
  return new Promise((resolve, reject) => {
    rl.question(prompt, (answer) => {
      resolve(answer);
    });
  });
}

function playGame() {
  const secretNumber = Math.floor(Math.random() * 100) + 1;
  let guesses = 0;

  console.log('Я задумал число от 1 до 100. Вы можете его угадать?');

  function guessLoop() {
    question('> ')
      .then((input) => {
        const guess = parseInt(input);
        if (isNaN(guess)) {
          console.log('Пожалуйста введите корректное число');
          return guessLoop();
        }
        guesses++;
        if (guess === secretNumber) {
          console.log(`Поздравляем! Вы угадали число за ${guesses} попыток.`);
          const protocol = `Загаданное число: ${secretNumber}\nПопытки: ${guesses}`;
          fs.writeFile('protocol.txt', protocol, (err) => {
            if (err) throw err;
            console.log('Протокол сохранен в protocol.txt');
          });
          rl.close();
        } else if (guess < secretNumber) {
          console.log('Загаданное число больше. Попробуйте снова:');
          return guessLoop();
        } else {
          console.log('Загаданное число меньше. Попробуйте снова:');
          return guessLoop();
        }
      });
  }

  guessLoop();
}

playGame();