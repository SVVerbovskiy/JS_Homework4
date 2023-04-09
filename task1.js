function getPasswordChecker(password) {
    return function(userPassword) {
        return password === userPassword;
    }
}

const correctPassword = "correct123"

const checkPassword = getPasswordChecker(correctPassword)

console.log(checkPassword("wrong"))
console.log(checkPassword("correct123"))
console.log(checkPassword("qwerty"))