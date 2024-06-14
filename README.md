# Сервис для заказа навыков
![](https://github.com/NoKaLoKa/web-larek-frontend/assets/34033274/c8319297-2785-4693-9d5c-f7dff194f0d3)

## О проекте

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
- `handleResponse(response: Response): Promise<object>` — обрабатывает запрос с сервера. `if (response.ok)` возвращает `response.json`, иначе выводит сообщение об ошибке.
- `get(uri: string)` — получает данные с сервера, после чего вызывает метод `handleResponse`.
- `post(uri: string, data: object, method: ApiPostMethods = 'POST')` — отправляет данные на сервер, после чего вызывает метод `handleResponse`.

### 2. Класс `EventEmitter`
Реализует паттерн «Наблюдатель» и позволяет подписываться на события и уведомлять подписчиков о наступлении события.

Класс имеет такие методы:
```
on<T extends object>(eventName: EventName, callback: (event: T) => void), 
onAll(callback: (event: EmitterEvent) => void)
```
устанавливают обработчик(и) на событи(е/я).

```
off(eventName: EventName, callback: Subscriber), 
offAll()
```
снимают обработчик(и) с событи(я/й).
- `emit<T extends object>(eventName: string, data?: T)` — уведомляет о наступлении события.
- `trigger<T extends object>(eventName: string, context?: Partial<T>)` — генерирует событие при вызове.

### 3. Класс `Component`
Предоставляет другим классам методы для управления разметкой.

Конструктор принимает такие аргументы:
- `container: HTMLElement` — корневой DOM-элемент.

Класс имеет такие методы:
- `toggleClass(element: HTMLElement, className: string, force?: boolean)` — переключает класса.
- `setText(element: HTMLElement, value: unknown)` — устанавливает текстовое содержимое.
- `setDisabled(element: HTMLElement, state: boolean)` — отключает элемента.
- `setHidden(element: HTMLElement)` — скрывает элемента.
- `setVisible(element: HTMLElement)` — показывает элемента.
- `setImage(element: HTMLImageElement, src: string, alt?: string)` — устанавливает изображение с алтернативным текстом.
- `render(data?: Partial<T>): HTMLElement` — возвращает корневой DOM-элемент.

### 4. Класс `Model`
Предназначен для создания модельных данных, используемых для управления данными приложения. Напрямую взаимодействует с `EventEmitter`, принимая в конструктор данные модели и аргумент `events`.

Конструктор принимает такие аргументы:
- `data: Partial<T>` — данные модели.
- `events: IEvents` — объект управления событиями.

Класс имеет такой метод:
- `emitChanges(event: string, payload?: object)` — cообщает всем что модель поменялась.

## Описание данных
### 1. Интерфейс `IProduct`
Интерфейс описывает данные карточки.

- `id`, `description`, `image`, `title`, `category`, `price` — данные о карточке получаемые с сервера.

### 2. Интерфейс `IDeliveryForm`
Описывает данные о способе оплаты и адресе доставке.

- `payment` — способ оплаты.
- `adress` — адрес доставки.

### 3. Интерфейс `IContactsForm`
Описывает данные о пользователе.

- `email` — электронная почта.
- `phone` — номер телефона.

### 4. Интерфейс `IOrder`
Описывает данные о заказе.

- `total` — сумма заказа.
- `items` — массив товаров в заказе.

### 5. Интерфейс `IOrderResult`
Описывает ответ сервера на заказ.

- `total` — сумма заказа.
- `id` — id заказа.

### 6. Интерфейс `FormErrors`
Описывает ошибки форм.

### 7. Интерфейс `ICard`
Описывает карточку отображаемую на странице.
- `index?` — индекс товара.
- `buttonTitle?` — заголовок для кнопки.

### 8. Интерфейс `IActions`
Описывает действие.
- `onClick` — выполняет `MouseEvent` при клике.

## Компоненты модели данных (бизнес-логика)
### 1. Класс `AppState`
Класс для хранения актуального состояния приложения.

Свойства класса:
- `catalog: IProduct[]` — массив товаров в каталоге.
- `basket: IProduct[] = []` — массив товаров в корзине.
- `order: IOrder = {...}` — объект данных о заказе.
- `preview: string | null` — предпросмотр продукта.
- `formErrors: FormErrors = {}` — объект с ошибками форм.

Класс имеет такие методы:
- `clearBasket()` — для очистки данных корзины.
- `clearOrder()` — для очистки данных заказа.
- `setCard(items: IProduct[])` — для отрисовки каталога товаров.
- `setPreview(items: IProduct)` — для открытия предпросмотра товара.
- `addProduct(items: IProduct)` — для добавления продукта в корзину.
- `removeProduct(item: IProduct)` — для удаления продукта из корзины.
- `updateBasket()` — для обновления корзины
- `setDeliveryField(field: keyof IDeliveryForm, value: string)` — для установки данных по доставке заказа.
- `setContactsField(field: keyof IContactForm, value: string)` — для установки данных о контактах.
- `validateDelivery()` — для валидации формы заказа.
- `validateContact()` — для валидации формы заказа.

### 2. Класс `LarekAPI`
Расширяет базовый класс Api, позволяет получить список продуктов, информацию о конкретном продукте и оформить заказ.

Свойства класса:
- `cdn(string)` — ссылка для загрузки изображений продуктов.

Конструктор принимает такие аргументы:
- `cdn: string` — ссылка для загрузки изображений продуктов.
- `baseUrl: string` — базовая ссылка на API.
- `options?: RequestInit = {}` — список настроек запроса.

Класс имеет такие методы:
- `getProductList(): Promise<IProduct[]>` — Получение списка всех продуктов с сервера.
- `getProductItem(id: string): Promise<IProduct>` — Получение детальной информации о продукте по его ID.
- `orderProducts(order: IOrder): Promise<IOrderResult>` — Отправка информации о заказе на сервер и получение результата.

## Базовые компоненты представления
### 1. Класс `Modal`
Класс для отображения элемента модального окна, открытия, закрытия, управления его содержимым.

Свойства класса:
- `_closeButton: HTMLButtonElement` — кнопка закрытия окна.
- `_content: HTMLElement` — содержимое окна.

Конструктор принимает такие аргументы:
- `container: HTMLFormElement` — элемент формы.
- `events: IEvents` — объект управления событиями.

Класс имеет такие методы:
- `set content(value: HTMLElement)` — содержимое модального окна.
- `open()` — открывает окно и вызывает событие открытия.
- `close()` — закрывает окно и вызывает событие закрытия.
- `render(data: IModalData): HTMLElement` — отображает состояние окна.

### 2. Класс `Basket`
Свойства класса:
- `_list: HTMLElement` — список покупок.
- `_total: HTMLElement` — общая стоимость продуктов.
- `_button: HTMLButtonElement` — кнопка для оформления заказа.

Конструктор принимает такие аргументы:
- `container: HTMLElement` — элемент корзины.
- `events: EventEmitter` — объект управления событиями.

Класс имеет такие методы:
- `toggleButton(isDisabled: boolean)` — включает или выключает кнопку оформления заказа в зависимости от наличия товаров в корзине.
- `set items(items: HTMLElement[])` — устанавливает товары в корзине.
- `set total(total: number)` — устанавливает общую стоимость товаров в корзине.

### 3. Класс `Form`
Отвечает за работу форм.

Свойства класса:
- `_submit: HTMLButtonElement` — кнопка подтверждения формы.
- `_errors: HTMLElement` — элемент отвечающий за ошибки.

Конструктор принимает такие аргументы:
- `container: HTMLFormElement` — элемент формы.
- `events: IEvents` — объект управления событиями.

Класс имеет такие методы:
- `onInputChange(field: keyof T, value: string)` — генерирует события изменения для каждого поля в форме.
- `set valid(value: boolean)` — включает и выключает кнопку взависимости от валидации.
- `set errors(value: string)` — отображает ошибки валидации.
- `render(state: Partial<T> & IFormState)` — отображает состояние формы.

### 4. Класс `Success`
Отображает успешное выполнение операции.

Свойства класса:
- `_close: HTMLElement` — кнопка закрытия.
- `_total: HTMLElement` — общая сумма оплаты.

Конструктор принимает такие аргументы:
- `container: HTMLElement` — элемент модального окна.
- `actions: ISuccessActions` — выполняет действие при клике.

Класс имеет такой метод:
- `set total(value: string)` — обновляет информацию о стоимости и других данных, связанных с успешным завершением операции.

## Дополнительные компоненты представления
### 1. Класс `Card`
Управляет отображением информации о продукте.

Свойства класса:
- `_title: HTMLElement` — заголовок продукта.
- `_price: HTMLElement` — цена продукта.
- `_image: HTMLImageElement` — изображение продукта.
- `_description: HTMLElement` — описание продукта.
- `_button: HTMLButtonElement` — кнопка действия на карточке продукта.
- `_category: HTMLElement` — категория продукта.
- `_index: HTMLElement` — индикатор порядкового номера продукта в корзине.
- `_buttonTitle: string` — заголовок кнопки.

Конструктор принимает такие аргументы:
- `container: HTMLElement` — элемент карточки.
- `actions: IActions` — выполняет действие при клике на кнопку.

Класс имеет такие методы:
- `disablePriceButton(value: number | null)` — проверяет цену и делает кнопку покупки неактивной если цена не указана.
- `set id(value: string)/get id` — управляет индификатором карточки.
- `set title(value: string)/get title` — управляет названием товара.
- `set price(value: number | null)/get price` — управляет ценой товара.
- `set category(value: string)/get category()` — управляет категорией и ее цветом.
- `set index(value: string)/get index()`
- `set image()` — устанавливает изображение товара.
- `set description()` — устанавливает описание товара.
- `set buttonTitle()` — устанавливает textContent кнопки.

### 2. Класс `Page`
Управляет счетчиком корзины, каталогом продуктов и оберткой страницы.

Свойства класса:
- `_counter: HTMLElement` — счетчик корзины.
- `_catalog: HTMLElement` — каталог продуктов.
- `_wrapper: HTMLElement` — обертка страницы.
- `_basket: HTMLElement` — корзина.

Конструктор принимает такие аргументы:
- `container: HTMLElement` — элемент страницы.
- `events: IEvents` — объект управления событиями.

Класс имеет такие методы:
- `set counter(value: number)` — обновляет счетчик.
- `set catalog(items: HTMLElement[])` — обновляет каталог.
- `set locked(value: boolean)` — управляет блокировкой страницы.

### 3. Класс `DeliveryForm`
Класс для отображения и управления формой доставки.

Свойства класса:
- `_cardButton` — кнопка выбора оплаты картой;
- `_cashButton` — кнопка выбора оплаты наличными.

Конструктор принимает такие аргументы:
- `container: HTMLFormElement` — элемент формы.
- `events: IEvents` — объект управления событиями.
- `actions: IActions` — выполняет действие при клике на кнопку.

Класс имеет такие методы:
- `toggleButtons(target: HTMLElement)` — включает и выключает кнопки способа оплаты.
- `set address(value: string)` — устанавливает адрес доставки.

### 4. Класс `ContactsForm`
Класс для отображения и управления формой контактных данных.

Конструктор принимает такие аргументы:
- `container: HTMLFormElement` — элемент формы.
- `events: IEvents` — объект управления событиями.

Класс имеет такие методы:
- `set phone(value: string)` — устанавливает номер телефона.
- `set email(value: string)` — устанавливает электронную почту.
