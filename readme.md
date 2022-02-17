# GoIT Node.js Course Template Homework

Выполните форк этого репозитория для выполнения домашних заданий (2-6).
Форк создаст репозиторий на вашем http://github.com

Добавьте ментора в коллаборацию.

Для каждой домашней работы создавайте свою ветку.

- hw02
- hw03
- hw04
- hw05
- hw06

Каждая новая ветка для дз должна делаться с master.

После того как вы закончили выполнять домашнее задание в своей ветке, необходимо сделать пулл-реквест (PR). Потом добавить ментора для ревью кода. Только после того как ментор заапрувит PR, вы можете выполнить мердж ветки с домашним заданием в мастер.

Внимательно читайте комментарии ментора. Исправьте замечания и сделайте коммит в ветке с домашним заданием. Изменения подтянуться в PR автоматически после того как вы отправите коммит с исправлениями на github.
После исправления снова добавьте ментора на ревью кода.

## Критерии приема дз #2-6

- Создан репозиторий с домашним заданием &mdash; REST API приложение.
- При создании репозитория использован [бойлерплейт](https://github.com/goitacademy/nodejs-homework-template)
- Пулл-реквест (PR) с соответствующим дз отправлен ментору в [schoology](https://app.schoology.com/login) на проверку (ссылка на PR).
- Код соответствует техническому заданию проекта.
- При выполнении кода не возникает необработанных ошибок.
- Название переменных, свойств и методов начинается со строчной буквы и записываются в нотации CamelCase. Используются английские существительные.
- Название функции или метода содержит глагол.
- JS-код чистый и понятный, для форматирования используется Prettier.
- В коде нет закомментированных участков кода.
- Проект корректно работает в актуальной LTS-версии Node.

### Команды:

- `npm start` &mdash; старт сервера в режиме production.
- `npm run start:dev` &mdash; старт сервера в режиме разработки (development).
- `npm run lint` &mdash; запустить выполнение проверки кода с eslint, необходимо выполнять перед каждым PR и исправлять все ошибки линтера.
- `npm run lint:fix` &mdash; та же проверка линтера, но с автоматическими исправлениями простых ошибок.

# Домашнее задание 2

Создай форк [репозитория](https://github.com/goitacademy/nodejs-homework-template) в свой github аккаунт.

Посмотри поясняющее видео как это сделать и сдавать ДЗ правильно: [<img src="./js.png" width="640">](https://www.youtube.com/watch?v=wabSW_sz_cM "Пояснение")

Написать REST API для работы с коллекцией контактов. Для работы с REST API используй [Postman](https://www.getpostman.com/).

Прочитай внимательно readme в клонированном бойлерплейте, там описан механизм сдачи домашних заданий. Приступай к выполнению ДЗ

## Шаг 1

Создай ветку `hw02-express` из ветки master.

Установи модули командой:

```bash
npm i
```

Следующие модули уже есть в проекте:

- [express](https://www.npmjs.com/package/express)
- [morgan](https://www.npmjs.com/package/morgan)
- [cors](https://www.npmjs.com/package/cors)

## Шаг 2

В app.js – веб сервер на express, добавлены прослойки `morgan` и `cors`. Начни настраивать раутинг для работы с коллекцией контактов.

REST API должен поддерживать следующие рауты.

### @ GET /api/contacts

- ничего не получает
- вызывает функцию `listContacts` для работы с json-файлом `contacts.json`
- возвращает массив всех контактов в json-формате со статусом `200`

### @ GET /api/contacts/:id

- Не получает `body`
- Получает параметр `id`
- вызывает функцию getById для работы с json-файлом contacts.json
- если такой id есть, возвращает объект контакта в json-формате со статусом `200`
- если такого id нет, возвращает json с ключом `"message": "Not found"` и статусом `404`

### @ POST /api/contacts

- Получает `body` в формате `{name, email, phone}` (все поля обязательны)
- Если в body нет каких-то обязательных полей, возвращает json с ключом `{"message": "missing required name field"}` и статусом `400`
- Если с `body` все хорошо, добавляет уникальный идентификатор в объект контакта
- Вызывает функцию `addContact(body)` для сохранения контакта в файле `contacts.json`
- По результату работы функции возвращает объект с добавленным `id` `{id, name, email, phone}` и статусом `201`

### @ DELETE /api/contacts/:id

- Не получает `body`
- Получает параметр `id`
- вызывает функцию `removeContact` для работы с json-файлом `contacts.json`
- если такой `id` есть, возвращает json формата `{"message": "contact deleted"}` и статусом `200`
- если такого `id` нет, возвращает json с ключом `"message": "Not found"` и статусом `404`

### @ PUT /api/contacts/:id

- Получает параметр `id`
- Получает `body` в json-формате c обновлением любых полей `name, email и phone`
- Если `body` нет, возвращает json с ключом `{"message": "missing fields"}` и статусом `400`
- Если с `body` все хорошо, вызывает функцию `updateContact(contactId, body)` (напиши ее) для обновления контакта в файле `contacts.json`
- По результату работы функции возвращает обновленный объект контакта и статусом `200`. В противном случае, возвращает json с ключом `"message": "Not found"` и статусом `404`

## Шаг 3

Для маршрутов, что принимают данные (`POST` и `PUT`), продумайте проверку (валидацию) принимаемых данных. Для валидации принимаемых данных используйте пакет [joi](https://github.com/sideway/joi)

# Домашнее задание 3

Создай ветку `hw03-mongodb` из ветки `master`.

Продолжи создание REST API для работы с коллекцией контактов.

## Шаг 1

Создай аккаунт на [MongoDB Atlas](https://www.mongodb.com/cloud/atlas). После чего в аккаунте создай новый проект и настрой **бесплатный кластер**. Во время настройки кластера выбери провайдера и регион как на скриншоте ниже. Если выбрать слишком удаленный регион, скорость ответа сервера будет дольше.

![atlas cluster setup](https://github.com/goitacademy/nodejs-homework/blob/master/homework-03/atlas-cluster.jpg)

## Шаг 2

Установи графический редактор [MongoDB Compass](https://www.mongodb.com/download-center/compass) для удобной работы с базой данных для MongoDB. Настрой подключение своей облачной базы данных к Compass. В MongoDB Atlas не забудь создать пользователя с правами администратора.

## Шаг 3

Через Compass создай базу данных `db-contacts` и в ней коллекцию `contacts`. Возьми [ссылка на json](https://github.com/goitacademy/nodejs-homework/blob/master/homework-03/contacts.json) и при помощи Compass наполни коллекцию `contacts` (сделай импорт) его содержимым.

![data](https://github.com/goitacademy/nodejs-homework/blob/master/homework-03/json-data.png)

Если вы все сделали правильно, данные должны появиться в вашей базе в коллекции `contacts`

![data](https://github.com/goitacademy/nodejs-homework/blob/master/homework-03/mongo-data.png)

## Шаг 4

Используйте исходный код [домашней работы #2](https://github.com/Eduard-Konovka/nodejs-homework-rest-api/tree/hw02-express) и замените хранение контактов из json-файла на созданную вами базу данных.

- Напишите код для создания подключения к MongoDB при помощи [Mongoose](https://mongoosejs.com/).
- При успешном подключении выведите в консоль сообщение `"Database connection successful"`.
- Обязательно обработайте ошибку подключения. Выведите в консоль сообщение ошибки и завершите процесс используя `process.exit(1)`.
- В функциях обработки запросов замените код CRUD-операций над контактами из файла, на Mongoose-методы для работы с коллекцией контактов в базе данных.

Схема модели для коллекции `contacts`:

```js
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  }
```

## Шаг 5

У нас появилось в контактах дополнительное поле статуса `favorite`, которое принимает логическое значение `true` или `false`. Оно отвечает за то, что в избранном или нет находится указанный контакт. Реализуй для обновления статуса контакта новый маршрут

### @ PATCH /api/contacts/:contactId/favorite

- Получает параметр `contactId`
- Получает `body` в json-формате c обновлением поля `favorite`
- Если `body` нет, возвращает json с ключом `{"message": "missing field favorite"}` и статусом `400`
- Если с `body` все хорошо, вызывает функцию `updateStatusContact(contactId, body)` (напиши ее) для обновления контакта в базе
- По результату работы функции возвращает обновленный объект контакта и статусом `200`. В противном случае, возвращает json с ключом `"message": "Not found"` и статусом `404`

Для роута `POST /api/contacts` внесите изменения: если поле `favorite` не указали в `body`, то при сохранении в базу нового контакта, сделайте поле `favorite` равным по умолчанию `false`. Не забываем про валидацию данных!

# Домашнее задание 4

Создайте ветку `hw04-auth` из ветки `master`.

Продолжите создание REST API для работы с коллекцией контактов. Добавьте логику аутентификации/авторизации пользователя с помощью [JWT](https://jwt.io/).

## Шаг 1

В коде создайте схему и модель пользователя для коллекции `users`.

```js
{
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter"
  },
  token: {
    type: String,
    default: null,
  },
}
```

Чтобы каждый пользователь работал и видел только свои контакты в схеме контактов добавьте свойство `owner`.

```js
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    }
```

Примечание: `'user'` - название коллекции (в единственном числе), в которой хранятся пользователи.

## Шаг 2

### Регистрация

Создайте эндпоинт [`/users/signup`](#registration-request).

Сделать валидацию всех обязательных полей (`email` и `password`). При ошибке валидации вернуть
[Ошибку валидации](#registration-validation-error).

В случае успешной валидации в модели `User` создать пользователя по данным которые прошли валидацию. Для засолки паролей используй [bcrypt](https://www.npmjs.com/package/bcrypt) или [bcryptjs](https://www.npmjs.com/package/bcryptjs).

- Если почта уже используется кем-то другим, вернуть [Ошибку Conflict](#registration-conflict-error).
- В противном случае вернуть [Успешный ответ](#registration-success-response).

#### Registration request

```shell
POST /users/signup
Content-Type: application/json
RequestBody: {
  "email": "example@example.com",
  "password": "examplepassword"
}
```

#### Registration validation error

```shell
Status: 400 Bad Request
Content-Type: application/json
ResponseBody: <Ошибка от Joi или другой библиотеки валидации>
```

#### Registration conflict error

```shell
Status: 409 Conflict
Content-Type: application/json
ResponseBody: {
  "message": "Email in use"
}
```

#### Registration success response

```shell
Status: 201 Created
Content-Type: application/json
ResponseBody: {
  "user": {
    "email": "example@example.com",
    "subscription": "starter"
  }
}
```

### Логин

Создайте эндпоинт [`/users/login`](#login-request).

В модели `User` найти пользователя по `email`.

Сделать валидацию всех обязательных полей (`email` и `password`). При ошибке валидации вернуть [Ошибку валидации](#validation-error-login).

- В противном случае, сравнить пароль для найденного юзера, если пароли совпадают создать токен, сохранить в текущем юзере и вернуть [Успешный ответ](#login-success-response).
- Если пароль или email неверный, вернуть [Ошибку Unauthorized](#login-auth-error).

#### Login request

```shell
POST /users/login
Content-Type: application/json
RequestBody: {
  "email": "example@example.com",
  "password": "examplepassword"
}
```

#### Login validation error

```shell
Status: 400 Bad Request
Content-Type: application/json
ResponseBody: <Ошибка от Joi или другой библиотеки  валидации>
```

#### Login success response

```shell
Status: 200 OK
Content-Type: application/json
ResponseBody: {
  "token": "exampletoken",
  "user": {
    "email": "example@example.com",
    "subscription": "starter"
  }
}
```

#### Login auth error

```shell
Status: 401 Unauthorized
ResponseBody: {
  "message": "Email or password is wrong"
}
```

## Шаг 3

### Проверка токена

Создайте мидлвар для проверки токена и добавь его ко всем маршрутам, которые должны быть защищены.

- Мидлвар берет токен из заголовков `Authorization`, проверяет токен на валидность.
- В случае ошибки вернуть [Ошибку Unauthorized](#middleware-unauthorized-error).
- Если валидация прошла успешно, получить из токена `id` пользователя. Найти пользователя в базе данных по этому id.
- Если пользователь существует и токен совпадает с тем, что находится в базе, записать его данные в `req.user` и вызвать метод`next()`.
- Если пользователя с таким `id` не существует или токены не совпадают, вернуть [Ошибку Unauthorized](#middleware-unauthorized-error).

#### Middleware unauthorized error

```shell
Status: 401 Unauthorized
Content-Type: application/json
ResponseBody: {
  "message": "Not authorized"
}
```

## Шаг 4

### Логаут

Создайте ендпоинт [`/users/logout`](#logout-request).

Добавьте в маршрут мидлвар проверки токена.

- В модели `User` найти пользователя по `_id`.
- Если пользователя не существует вернуть [Ошибку Unauthorized](#logout-unauthorized-error).
- В противном случае, удалить токен в текущем юзере и вернуть [Успешный ответ](#logout-success-response).

#### Logout request

```shell
GET /users/logout
Authorization: "Bearer {{token}}"
```

#### Logout unauthorized error

```shell
Status: 401 Unauthorized
Content-Type: application/json
ResponseBody: {
  "message": "Not authorized"
}
```

#### Logout success response

```shell
Status: 204 No Content
```

## Шаг 5

### Текущий пользователь - получить данные юзера по токену

Создайте эндпоинт [`/users/current`](#current-user-request).

Добавьте в маршрут мидлвар проверки токена.

- Если пользователя не существует вернуть [Ошибку Unauthorized](#current-user-unauthorized-error).
- В противном случае вернуть [Успешный ответ](#current-user-success-response).

#### Current user request

```shell
GET /users/current
Authorization: "Bearer {{token}}"
```

#### Current user unauthorized error

```shell
Status: 401 Unauthorized
Content-Type: application/json
ResponseBody: {
  "message": "Not authorized"
}
```

#### Current user success response

```shell
Status: 200 OK
Content-Type: application/json
ResponseBody: {
  "email": "example@example.com",
  "subscription": "starter"
}
```

## Дополнительное задание - необязательное

- Сделать пагинацию для коллекции контактов (GET /contacts?page=1&limit=20).
- Сделать фильтрацию контактов по полю избранного (GET /contacts?favorite=true).
- Обновление подписки (`subscription`) пользователя через эндпоинт `PATCH` `/users`. Подписка должна иметь одно из следующих значений `['starter', 'pro', 'business']`.

# Домашнее задание 5

Создай ветку `hw05-avatars` из ветки `master`.

Продолжи создание REST API для работы с коллекцией контактов. Добавь возможность загрузки аватарки пользователя через [Multer](https://github.com/expressjs/multer).

## Шаг 1

Создай папку `public` для раздачи статики. В этой папке сделай папку `avatars`. Настрой Express на раздачу статических файлов из папки `public`.

Положи любое изображение в папку `public/avatars` и проверь что раздача статики работает. При переходе по такому URL браузер отобразит изображение.

```shell
http://localhost:<порт>/avatars/<имя файла с расширением>
```

## Шаг 2

В схему пользователя добавь новое свойство `avatarURL` для хранения изображения.

```shell
{
  ...
  avatarURL: String,
  ...
}
```

- Используй пакет [gravatar](https://www.npmjs.com/package/gravatar) для того чтобы при регистрации нового пользователя сразу сгенерить ему аватар по его `email`.

## Шаг 3

При регистрации пользователя:

- Создавай ссылку на аватарку пользователя с помощью [gravatar](https://www.npmjs.com/package/gravatar).
- Полученный URL сохрани в поле `avatarURL` во время создания пользователя.

## Шаг 4

Добавь возможность обновления аватарки, создав эндпоинт `/users/avatars` и используя метод `PATCH`.

![avatar upload from postman](https://github.com/goitacademy/nodejs-homework/blob/master/homework-05/avatar-upload.png)

```shell
# Запрос
PATCH /users/avatars
Content-Type: multipart/form-data
Authorization: "Bearer {{token}}"
RequestBody: загруженный файл

# Успешный ответ
Status: 200 OK
Content-Type: application/json
ResponseBody: {
  "avatarURL": "тут будет ссылка на изображение"
}

# Неуспешный ответ
Status: 401 Unauthorized
Content-Type: application/json
ResponseBody: {
  "message": "Not authorized"
}
```

- Создай папку tmp в корне проекта и сохраняй в неё загруженную аватарку.
- Обработай аватарку пакетом [jimp](https://www.npmjs.com/package/jimp) и задай для нее размеры 250 на 250.
- Перенеси аватарку пользователя из папки tmp в папку `public/avatars` и дай ей уникальное имя для конкретного пользователя.
- Полученный `URL` `/avatars/<имя файла с расширением>` сохрани в поле `avatarURL` пользователя.

## Дополнительное задание - необязательное

### 1. Написать unit-тесты для контроллера входа (login/signin)

При помощи [Jest](https://jestjs.io/ru/docs/getting-started):

- ответ должен иметь статус-код 200;
- в ответе должен возвращаться токен;
- в ответе должен возвращаться объект `user` с 2 полями `email` и `subscription`, имеющие тип данных `String`.

# Домашнее задание 6

Создай ветку `hw06-email` из ветки `master`.

Продолжаем создание REST API для работы с коллекцией контактов. Добавьте верификацию email пользователя после регистрации при помощи сервиса [SendGrid](https://sendgrid.com/).

## Как процесс верификации должен работать

1. После регистрации, пользователь должен получить письмо на указанную при регистрации почту с ссылкой для верификации своего email.
2. Пройдя ссылке в полученном письме, в первый раз, пользователь должен получить [Ответ со статусом 200](#verification-success-response), что будет подразумевать успешную верификацию email.
3. Пройдя по ссылке повторно пользователь должен получить [Ошибку со статусом 404](#verification-user-not-found).

## Шаг 1

### Подготовка интеграции с SendGrid API

- Зарегистрируйся на [SendGrid](https://sendgrid.com/).
- Создай email-отправителя. Для это в административной панели SendGrid зайдите в меню Marketing в подменю senders и в правом верхнем углу нажмите кнопку "Create New Sender". Заполните необходимые поля в предложенной форме. Сохраните. Должен получится следующий как на картинке результат, только с вашим email:

![sender](https://github.com/goitacademy/nodejs-homework/blob/master/homework-06/sender-not-verify.png)

На указанный email должно прийти письмо верификации (проверьте спам если не видите письма). Кликните на ссылку в нем и завершите процесс. Результат должен изменится на:

![sender](https://github.com/goitacademy/nodejs-homework/blob/master/homework-06/sender-verify.png)

- Теперь необходимо создать API токен доступа. Выбираем меню "Email API", и подменю "Integration Guide". Здесь выбираем "Web API"

![api-key](https://github.com/goitacademy/nodejs-homework/blob/master/homework-06/web-api.png)

Дальше необходимо выбрать технологию Node.js

![api-key](https://github.com/goitacademy/nodejs-homework/blob/master/homework-06/node.png)

На третьем шаге даем имя нашему токену. Например systemcats, нажимаем кнопку сгенерировать и получаем результат как на скриншоте ниже. Необходимо скопировать этот токен (это важно, так как больше вы не сможете его посмотреть). После завершить процесс создания токена

![api-key](https://github.com/goitacademy/nodejs-homework/blob/master/homework-06/api-key.png)

- Полученный API-токен надо добавить в `.env` файл в нашем проекте.

## Шаг 2

### Создание ендпоинта для верификации email'а

- добавить в модель `User` два поля `verificationToken` и `verify`. Значение поля `verify` равное `false` будет означать, что его email еще не прошел верификацию:

```js
{
  verify: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
    required: [true, 'Verify token is required'],
  },
}
```

- создать эндпоинт GET [`/users/verify/:verificationToken`](#verification-request), где по параметру `verificationToken` мы будем искать пользователя в модели `User`;
- если пользователь с таким токеном не найден, необходимо вернуть [Ошибку 'Not Found'](#verification-user-not-found);
- если пользователь найден - устанавливаем `verificationToken` в `null`, а поле `verify` ставим равным `true` в документе пользователя и возвращаем [Успешный ответ](#verification-success-response).

### Verification request

```shell
GET /auth/verify/:verificationToken
```

### Verification user Not Found

```shell
Status: 404 Not Found
ResponseBody: {
  message: 'User not found'
}
```

### Verification success response

```shell
Status: 200 OK
ResponseBody: {
  message: 'Verification successful',
}
```

## Шаг 3

### Добавление отправки email пользователю с ссылкой для верификации

При создания пользователя при регистрации:

- создать `verificationToken` для пользователя и записать его в БД (для генерации токена используйте пакет [uuid](https://www.npmjs.com/package/uuid) или [nanoid](https://www.npmjs.com/package/nanoid));
- отправить email на почту пользователя и указать ссылку для верификации email'а (`/users/verify/:verificationToken`) в сообщении;
- nак же необходимо учитывать, что теперь логин пользователя не разрешен при не верифицированном email.

## Шаг 4

### Добавление повторной отправки email пользователю с ссылкой для верификации

Необходимо предусмотреть, вариант, что пользователь может случайно удалить письмо. Оно может не дойти по какой-то причине к адресату. Наш сервис отправки писем во время регистрации выдал ошибку и т.д.

#### @ POST /users/verify/

- Получает `body` в формате `{ email }`.
- Если в `body` нет обязательного поля `email`, возвращает json с ключом `{"message": "missing required field email"}` и статусом `400`.
- Если с `body` все хорошо, выполняем повторную отправку письма с `verificationToken` на указанный email, но только если пользователь не верифицирован.
- Если пользователь уже прошел верификацию отправить json с ключом `{ message: "Verification has already been passed"}` со статусом `400 Bad Request`.

#### Resending a email request

```shell
POST /users/verify
Content-Type: application/json
RequestBody: {
  "email": "example@example.com"
}
```

#### Resending a email validation error

```shell
Status: 400 Bad Request
Content-Type: application/json
ResponseBody: <Ошибка от Joi или другой библиотеки валидации>
```

#### Resending a email success response

```shell
Status: 200 Ok
Content-Type: application/json
ResponseBody: {
  "message": "Verification email sent"
}
```

#### Resend email for verified user

```shell
Status: 400 Bad Request
Content-Type: application/json
ResponseBody: {
  message: "Verification has already been passed"
}
```

> Примечание: Как альтернативу SendGrid можно использовать пакет [nodemailer](https://www.npmjs.com/package/nodemailer)

## Дополнительное задание - необязательное

### 1. Напишите dockerfile для вашего приложения
