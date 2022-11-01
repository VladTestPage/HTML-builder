// подключение модулей
const fs = require('fs')
const path = require('path')

// назначенией путей переменным
const directoryStyles = path.join(__dirname, 'styles')
const directoryDistBundle = path.join(__dirname, 'project-dist', 'bundle.css')

// создание файла сборки
fs.open(directoryDistBundle, 'w', (err) => {
  if (err) throw err
  console.log('File created')
})

// запись в новый файл
fs.readdir(directoryStyles, { withFileTypes: true }, (err, files) => {
  files.forEach((file) => {
    // проверка, является ли файлом
    fs.stat(directoryStyles, () => {
      if (file.isFile() === true && path.extname(file.name) === '.css') {
        // непосредственно запись
        fs.readFile(
          path.join(directoryStyles, file.name),
          'utf8',
          (err, data) => {
            fs.appendFile(directoryDistBundle, data, () => {})
          }
        )
      }
    })
  })
})

// node 05-merge-styles
