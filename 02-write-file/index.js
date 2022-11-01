// подключение модулей
const fs = require('fs')
const path = require('path')
const readline = require('readline')
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

// создание файла
fs.open(path.join(__dirname, path.sep, 'result.txt'), 'w', (err) => {
  if (err) throw err
})
// функция приветствия, записи текста в файл, завершения программы
function ask(question) {
  rl.question(question, (answer) => {
    if (answer === 'exit') {
      console.log('Goodbuy! Your message is:')
      console.log(
        fs.readFileSync(path.join(__dirname, path.sep, 'result.txt'), 'utf8')
      )
      process.exit()
    }
    process.on('beforeExit', () => {
      console.log('Goodbuy! Your message is:')
      console.log(
        fs.readFileSync(path.join(__dirname, path.sep, 'result.txt'), 'utf8')
      )
      process.exit()
    })

    fs.appendFile(
      path.join(__dirname, path.sep, 'result.txt'),
      `${answer}\n`,
      () => {}
    )

    ask(question)
  })
}

ask('Please type your message: ')
