const readline = require('readline');
const fs = require('fs');

// Генерируем случайное число от 1 до 100
const secretNumber = Math.floor(Math.random() * 100) + 1;

// Открываем файл для записи протокола игры
const stream = fs.createWriteStream('game_log.txt');

// Устанавливаем кодировку файла
stream.setDefaultEncoding('utf8');

// Инициализируем интерфейс для чтения ввода пользователя
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Счетчик попыток
let attempts = 0;

// Функция, запрашивающая у пользователя ввод числа
function guessNumber() {
  rl.question('Угадайте число от 1 до 100: ', (input) => {
    // Увеличиваем счетчик попыток
    attempts++;

    // Преобразуем введенный текст в число
    const guess = parseInt(input);

    // Записываем введенное число в протокол игры
    stream.write(`Попытка №${attempts}: ${guess}\n`);

    if (guess === secretNumber) {
      console.log(`Поздравляем! Вы угадали число за ${attempts} попыток`);
      // Записываем результат игры в протокол
      stream.write(`Результат: Успех (попыток: ${attempts})\n`);
      // Закрываем файл
      stream.end();
      rl.close();
    } else if (guess > secretNumber) {
      console.log('Загаданное число меньше');
      guessNumber();
    } else {
      console.log('Загаданное число больше');
      guessNumber();
    }
  });
}

// Начинаем игру
guessNumber();