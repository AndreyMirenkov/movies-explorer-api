# movies-explorer-api

## Описание
Это Backend часть дипломной работы Яндекс.Практикума. Приложение предназначено для обработки запросов с Front-end части приложения. Здесь обрабатываюся приходящие с фронтенда данные(сохраняются, удаляются, редактируются) и отпраляется ответ на клиентскую часть для отрисовки контента. Сервер проверяет валидность данных. Если находит не соответствующие схеме данные - отправляет ошибку на фронтенд, для дальнейшей обработки ответа на стороне клиента.

***Оновной функционал сервера:***

* 📖 🔐 Создание бызы данных пользователей
* ⌨ 🖱Редактирование информации пользователя
* 🎬 🗄 Создание базы данных с понравившимися фильмами

## _Директории_ 🗂

`/routes` — папка с файлами роутера  
`/controllers` — папка с файлами контроллеров пользователя и карточки   
`/models` — папка с файлами описания схем пользователя и карточки  
 
 ## _Стек технологий_ 🖥
<div display = 'flex' flex-wrap = 'wrap'>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original-wordmark.svg" alt = 'Express.js' width = '60' height = '60'/>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original-wordmark.svg" alt = 'MongoDB' width = '60' height = '60'/>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original-wordmark.svg" alt = 'Node.js' width = '60' height = '60'/>
</div>          

## _Запуск проекта_ 🚀
 1. Клонировать репозиторий
 2. `npm i` - устанавливаем все зависимости  
 3. `npm run start` — запускает сервер/`npm run dev` — запускает сервер с hot-reload
 
## Проект завершён ✅
