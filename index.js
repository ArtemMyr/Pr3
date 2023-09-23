const fs = require('fs');

const express = require('express');
const path = require('path');

const bodyParser = require('body-parser');

const app = express();
const port = 3000;



app.use(express.static('public'));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'signup'));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});





// Используем middleware для парсинга JSON
app.use(bodyParser.json());

// Обрабатываем POST-запрос на указанный маршрут
app.post('/test', (req, res) => {
  try {
    // Читаем существующие данные из data.json
    const existingData = JSON.parse(fs.readFileSync('data/data.json', 'utf8'));
  
  
    // Создаем новую запись
    const newUser = req.body;
  
    // Добавляем новую запись в существующие данные
    existingData.push(newUser);
  
    // Записываем обновленные данные обратно в файл data.json
    fs.writeFileSync('data/data.json', JSON.stringify(existingData));
  
    // Отправляем успешный ответ
    res.status(200).json({ message: 'Регистрация успешно завершена' });
  } catch (error) {
    console.error('Произошла ошибка:', error);
    res.status(500).json({ error: 'Произошла ошибка при регистрации' });
  }
});



