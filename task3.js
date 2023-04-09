const readline = require('readline');
const fs = require('fs').promises;

// Генерируем случайное число от 1 до 100
const secretNumber = Math.floor(Math.random() * 100) + 1;

// Открываем файл для записи протокола игры
const stream = fs.open('game_log.txt', 'w');

// Счетчик попыток
let attempts = 0;

// Функция, запрашивающая у пользователя ввод числа
function question(prompt) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise((resolve) => {
    rl.question(prompt, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
}

// Функция, запрашивающая у пользователя ввод числа и возвращающая результат в виде промиса
async function guessNumber() {
  // Запрашиваем ввод числа от пользователя
  const input = await question('Угадайте число от 1 до 100: ');

  // Увеличиваем счетчик попыток
  attempts++;

  // Преобразуем введенный текст в число
  const guess = parseInt(input);

  // Записываем введенное число в протокол игры
  await stream.write(`Попытка №${attempts}: ${guess}\n`);

  if (guess === secretNumber) {
    console.log(`Поздравляем! Вы угадали число за ${attempts} попыток`);
    // Записываем результат игры в протокол
    await stream.write(`Результат: Успех (попыток: ${attempts})\n`);
    // Закрываем файл
    await stream.close();
  } else if (guess > secretNumber) {
    console.log('Загаданное число меньше');
    await guessNumber();
  } else {
    console.log('Загаданное число больше');
    await guessNumber();
  }
}

// Начинаем игру
guessNumber().catch((error) => {
  console.error(error);
  process.exit(1);
});