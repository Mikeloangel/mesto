# Проект: Место

### ヾ(･ω･*)ﾉ  `Варушичев Михаил x Я.Практикум ` ヾ(-_- )ゞ

## О чем проект?
Фронтэнд интерактивного сайта с адаптивной версткой для добавления фотографий из путешествий.
На основе макета Figma сверстан адаптивный сайт для экранов маленьких 320px да больших 1280px+.


## Что было сделано?
* Nested БЭМ
* Верстка HTML/CSS
    * CSS variables для удобства оптимизации кода в дальнейшем
    * flexbox / grid
    * медиа запросы для адаптивности сайта
* Манипуляция с классами CSS и элементами HTML при помощи JavaScript
* Обработка событий пользователя
    * редактирование профиля
    * добавление новых мест
    * удаление мест
    * постановка лайков
* Валидация форм
* Взаимодействие с backend API
* Объектно ориентированный подход
    * класс Card фабрика карточек с местами
    * класс FormValidator реализует валидацию форм
    * класс Api для взаимодействия с бэкендом
    * Класс Popup и его потомки для отображения различных типов модальных окон
      * PopupWithConfirmation окно для подтверждения операции
      * PopupWithForm окно для отображения форам
      * PopupWithImage окно для отображения фотографий из галлереи
      * PopupWithNotification модалное окно для отображения текстовой информации (используеся для обработки ошибок запроса API)
    * класс Section для отображения секции объектов (в данном проекте для отображения карточек мест)
    * класс UserInfo для хранения и отображения информации о текущем пользователе


## Какие технологии использованы?
* HTML
* CSS
* JavaSCript
* NPM
* WebPack
* Git


## Внешние ссылки

* [Ссылка на макет в Figma](https://www.figma.com/file/2cn9N9jSkmxD84oJik7xL7/JavaScript.-Sprint-4?node-id=0%3A1)

* [Ссылка на проект на GitHub Pages](https://mikeloangel.github.io/mesto/index.html)

## Что дальше?
* проект ждет портирование на фреймворк React.js
* будет реализован дополнительный функционал:
  * аутентификация пользователя
  * работа с локальным хранилищем и токеном
* создан бекенд на Node.JS / Express.js
  * реализовано хранение данных в БД (MongoDB)
  * реализован backend API
