const fs = require('fs')
const path = require('path')

fs.readdir(
  path.join(__dirname, 'secret-folder'),
  { withFileTypes: true },
  (err, files) => {
    files.forEach((file) => {
      // итоговый вывод
      fs.stat(
        path.join(__dirname, 'secret-folder', file.name),
        (err, stats) => {
          // проверка, является ли файлом
          if (file.isFile() === true) {
            console.log(
              `${path.basename(file.name, path.extname(file.name))} - ${path
                .extname(file.name)
                .slice(1)} - ${stats.size}b`
            )
          }
        }
      )
    })
  }
)
