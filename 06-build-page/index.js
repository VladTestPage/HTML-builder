// подключение модулей
const fs = require('fs')
const { getDefaultSettings } = require('http2')
const path = require('path')

// создание папки project-dist
fs.mkdir(path.join(__dirname, 'project-dist'), { recursive: true }, (err) => {
  if (err) throw err
})

//*** HTML ***
// создание файла index.html
fs.open(path.join(__dirname, 'project-dist', 'index.html'), 'w', (err) => {
  if (err) throw err
})

// переменные
let template = ''
let parts = []

// чтение файла template.html
const readStream = fs.createReadStream(path.join(__dirname, 'template.html'))
readStream.on('data', (data) => {
  template = data.toString()

  fs.readdir(
    path.join(__dirname, 'components'),
    { withFileTypes: true },
    (err, files) => {
      // добавляем имена файлов из папки компонентов в массив
      files.forEach((file) => {
        // проверка, является ли добавляемый компонент html файлом
        if (path.extname(file.name) === '.html') {
          blockName = path.basename(file.name, path.extname(file.name))
          parts.push(blockName)
        }
      })
      /*
       проходимся по массиву имен, берем значения имен, 
       ищем их по этому значению в директории -> 
       замена блоков в переменной -> 
       перезапись обновленной переменной в файл
      */
      let blockTemp = ''
      for (let i = 0; i < parts.length; i++) {
        fs.readFile(
          path.join(__dirname, 'components', `${parts[i]}.html`),
          (error, block) => {
            blockTemp = block.toString()
            // замена тегов на блоки в переменной
            template = template.replace(`{{${parts[i]}}}`, blockTemp)
            // перезапись в файл index.html
            fs.writeFile(
              path.join(__dirname, 'project-dist', 'index.html'),
              template,
              (err) => {
                if (err) throw err
                console.log('--- index.html file has been saved ---')
              }
            )
          }
        )
      }
    }
  )
})

// *** CSS ***
// назначенией путей переменным
const directoryStyles = path.join(__dirname, 'styles')
const directoryDistBundle = path.join(__dirname, 'project-dist', 'style.css')

// создание файла сборки
fs.open(directoryDistBundle, 'w', (err) => {
  if (err) throw err
})

// запись стилей в style.css
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
  console.log('--- style.css file has been saved ---')
})

// *** ASSETS ***
// создание новой assets папки
fs.mkdir(
  path.join(__dirname, 'project-dist', 'assets'),
  { recursive: true },
  () => {}
)

// назначенией путей переменным
const directorySource = path.join(__dirname, 'assets')
const directoryCopy = path.join(__dirname, 'project-dist', 'assets')

fs.readdir(directorySource, { withFileTypes: true }, (err, files) => {
  files.forEach((file) => {
    fs.stat(directorySource, (err, stats) => {
      // проверка является ли папкой
      if (file.isFile() !== true) {
        // создание новых папок в новой директории
        fs.mkdir(
          path.join(directoryCopy, file.name),
          { recursive: true },
          () => {}
        )

        // заходим в подпапку и копируем все элементы
        fs.readdir(
          path.join(directorySource, file.name),
          { withFileTypes: true },
          (err, files) => {
            for (const item of files) {
              fs.copyFile(
                path.join(directorySource, file.name, item.name),
                path.join(directoryCopy, file.name, item.name),
                () => {}
              )
            }
            console.log(`--- ${file.name} folder's files have been copied  ---`)
          }
        )
      }
    })
  })
  console.log('--- new asset folder and subfolders have been created ---')
})

// node 06-build-page
