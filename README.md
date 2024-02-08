# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/styles/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```

## Базовый код
### 1. Класс `Api`
Класс реализует методы для работы с сервером, получением и отправкой данных.

Конструктор принимает такие аргументы:
- `baseUrl: string` — базовая ссылка на API.
- `options: RequestInit = {}` — список настроек запроса.

Класс имеет такие методы:
- `handleResponse` — обрабатывает запрос с сервера. `if (response.ok)` возвращает `response.json`, иначе выводит сообщение об ошибке.
- `get` — получает данные с сервера, после чего вызывает метод `handleResponse`.
- `post` — отправляет данные на сервер, после чего вызывает метод `handleResponse`.

### 2. Класс `EventEmitter`
Реализует паттерн «Наблюдатель» и позволяет подписываться на события и уведомлять подписчиков
о наступлении события.

Класс имеет такие методы:
- `on`, `onAll` — устанавливают обработчик(и) на событи(е/я).
- `off`, `offAll` — снимают обработчик(и) с событи(я/й).
- `emit` — уведомляет о наступлении события.
- `trigger` — генерирует событие при вызове.

## Описание данных
### 1. Интерфейс `ICard`
Используется для хранения данных карточки.

- `id`, `description`, `image`, `title`, `category`, `price` — данные о карточке получаемые с сервера с помощью класса `API`.

### 2. Интерфейс `IBasket`
Хранит массив объектов с данными карточки.

- `title`, `price` — данные о карточке полученные после нажатия на кнопку добавления в корзину.

### 3. Интерфейс `IDeliveryForm`
Сохраняет данные о способе оплаты и адресе доставке.

- `payment` — способ оплаты.
- `adress` — адрес доставки.

### 4. Интерфейс `IOrderForm`
Сохраняет данные о пользователе.

- `email` — электронная почта.
- `phone` — номер телефона.

## Компоненты модели данных (бизнес-логика)
### 1. Класс `Cards`
Загружает массив карточек на страницу и отвечает за работу с ними.

Класс имеет такие методы:
- `set` — добавляет карточку в корзину.
- `delete` — удаляет карточку из корзины.
- `init` — инициализирует массив карточек.

### 2. Класс `Form`
Сохраняет заполнение форм при покупке и отвечает за валидацию полей.

Класс имеет такие методы:
- `isValid` — валидирует поля.
- `changeOnInput` — сохраняет данные введенные пользователем.

### 3. Класс `Order`
Отвечает за работу с данными о пользователе.

Класс имеет такой метод:
- `checkout` — оформляет заказ.