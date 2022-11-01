// подключение модулей
const fs = require('fs')
const path = require('path')

// назначенией путей переменным
const directorySource = path.join(__dirname, 'files')
const directoryCopy = path.join(__dirname, 'files-copy')

// создание папки
fs.mkdir(path.join(__dirname, 'files-copy'), { recursive: true }, () => {})

// очистка папки
fs.readdir(directoryCopy, (err, files) => {
  if (err) throw err

  for (const file of files) {
    fs.unlink(path.join(directoryCopy, file), (err) => {
      if (err) throw err
    })
  }
})

// чтение содержания исходной папки и копирование файлов в новую папку
fs.readdir(directorySource, (err, files) => {
  for (const file of files) {
    fs.copyFile(
      path.join(directorySource, file),
      path.join(directoryCopy, file),
      () => {}
    )
  }
})
