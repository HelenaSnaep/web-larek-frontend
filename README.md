## Документация проекта "Веб-ларек"

**Стек:** HTML, SCSS, TypeScript, Webpack

### Структура проекта:

```
src/ — исходные файлы проекта
src/components/ — папка с компонентами
src/components/base/ — папка с базовыми классами
src/pages/index.html — HTML-файл главной страницы
src/types/index.ts — файл с интерфейсами и типами данных
src/index.ts — точка входа приложения
src/scss/styles.scss — корневой файл стилей
src/utils/constants.ts — файл с константами
src/utils/utils.ts — файл с утилитами
```

### Установка и запуск:

```
npm install
npm run start
```

или

```
yarn
yarn start
```

### Сборка:

```
npm run build
```

или

```
yarn build
```

Архитектура проекта

Проект реализован по архитектуре MVP с использованием брокера событий.

Model — отвечает за данные и бизнес-логику.

View — отображает интерфейс и реагирует на действия пользователя.

Presenter — посредник между моделью и представлением.

Event Broker — реализован через EventEmitter и обеспечивает обмен событиями между компонентами.



#### Принцип работы MVP с брокером событий следующий:

1. Пользователь взаимодействует с представлением.
2. Представление через брокер генерирует событие.
3. Брокер событий передает события в презентер, который подписан на эти события.
4. Презентер обрабатывает событие, взаимодействует с моделью, вызывает методы модели для изменения данных и подписывается на события об изменении данных.
5. Модель меняет состояние, брокер уведомляет об этом презентер.
6. Брокер событий передает события об изменении данных в презентер.
7. Презентер обрабатывает события об изменении данных и вызывает методы представления для обновления отображения данных.
8. Представление отображает данные и ждет новых событий от пользователя.

---

## Базовые классы

### Класс Component

Класс является дженериком и родительским классом для всех элементов отображения. 

**Конструктор:**

* `container: HTMLElement` — DOM-контейнер компонента.

**Методы:**

* `render()` — отвечает за сохранение полученных в параметре данных в полях компонттов через их сеттеры, возвращает обновленный контейнер компонента.


### Класс EventEmitter

Класс для обмена событиями между частями приложения, используется для реализации брокера событий в приложении.

Конструктор принимает экземпляр объекта Map и записывает его в свойство _events.

**Методы:**

* `on(event, handler)` — подписка на событие.
* `off(event, handler)` — отписка от события.
* `emit(event, payload)` — вызов события.
* `onAll(handler)` — подписка на все события.
* `offAll()` — удалить все подписки.
* `trigger` - возвращает функцию-триггер, генерирующую событие при вызове.

### Класс Api

Базовый класс для работы с API.

**Конструктор:**

* `baseUrl` - базовый URL API
* `options: RequestInit`- параметры запроса 

**Методы:**

* `handleResponse<T>(res: Response): Promise<T>` — обработка ответа.
* `get<T>(url: string)` — GET-запрос.
* `post<T>(url: string, data: unknown)` — POST-запрос.

---

## Классы Представления

### Класс CardMain

Расширяет класс Component. Отвечает за отображение товаров на главной странице.



**Конструктор:**

* container - ссылка на DOM-элемент
* actions - - хранилище событий

**Поля:**

* `_image` — изображение карточки
* `_title` — отображение заголовка карточки 
* `_price` — цена
* `_description` — описание
* `_category` — категория


**Методы и сеттеры:**

* `id` — устанавливает `data-id` контейнера
* `title`, `description`, `category`, `image`, `price` — отображают соответствующие поля товара


### Класс CardPreview


Расширяет класс Component. Отвечает за отображение карточки, выбранной пользователем.

Содержит следующие поля:

  *  _title - содержит заголовок карточки (тип: HTMLElement)
  * _description - содержит описание карточки (тип: HTMLElement)
  *  _category - содержит категорию карточки (тип: HTMLElement)
  *  _image - содержит изображение карточки (тип: HTMLElement)
  *  _price - содержит цену карточки (тип: HTMLElement)
  *  _button - содержит кнопку карточки (тип: HTMLElement)



### Класс CardBasket

Расширяет класс Component. Отвечает за отображение карточки товара в корзине.


### Класс Form

Класс Form наследуется от класса Component и отвечает за отображение формы. Принимает любую форму, позволяет проводить валидацию этой формы и управлять отображением доступных кнопок на основании валидности формы, в этом заключается универсальность этого класса.

**Конструктор:**

* container - ссылка на DOM-элемент
* events  - - хранилище событий


**Методы:**

* onInputChange - отвечает за обработку изменений ввода
* render - отвечает за отображение формы


**Сеттеры:**

* valid - отключает кнопку сабмита
* errors - отображает ошибки

### Класс Order

Расширяет класс Form и отвечает за отображение формы оформления заказа, выбор способа оплаты и адреса доставки.

Конструктор принимает следующие параметры:

    container - ссылка на DOM-элемент, в котором будет размещена форма
    events - хранилище событий


### Класс Contacts 

Расширяет класс  Form и отвечает за отображение контактной информации.

Конструктор принимает следующие параметры:

    container - ссылка на DOM-элемент, в котором будет размещена форма
    events - хранилище событий





### Класс Success

Класс Success наследуется от класса Component. Не имеет полей, но есть кнопка, которая отвечает за отображение сообщения об успешном выполнении операции при оплате товара.


**Конструктор:**

* container - ссылка на DOM-элемент
* actions - объект с функцией-обработчиком события закрытия (onClick).

**Поля:**

* _close: HTMLElement — кнопка, при нажатии на которую пользователь закрывает модальное окно и возвращается к каталогу товаров.




### Класс Page

Класс Page наследуется от класса Component. Управляет отображением каталога, счетчиком корзины и блокировкой интерфейса.


**Конструктор:**

* container - ссылка на DOM-элемент
* events  - - хранилище событий

**Поля:**
* _counter- счетчик товаров в корзине 
* _catalog - каталог продуктов 
* _basket - кнопка с иконкой корзины
* _wrapper - обёртка страницы — блокируется при модалках


**Сеттеры:**

* _counter - счетчик товаров в корзине 
* _locked - блокирует прокрутку страницы при открытом модальном окне




### Класс Basket

Класс Basket наследуется от класса Component и отвечает за отображение корзины.

**Конструктор:**

* container - ссылка на DOM-элемент
* events  - - хранилище событий


**Поля:**

* items - содержит элементы корзины 
* total - содержит общую стоимость 


**Сеттеры:**

* items - отвечает за отображение карточек в корзине
* total - отвечает за отображение общей стоимости


**Методы:**

* submitButtonLock - отвечает за блокировку кнопки оформления заказа




### Класс Modal

Класс Modal наследуется от класса Component. Будет родительским классом для всех модальных окон, которые будут созданы в проекте. Содержит общий функционал всех модальных окон.

**Конструктор:**

* container - ссылка на DOM-элемент
* events  - - хранилище событий

**Методы**

* open - открывает модальное окно
* close - закрывает модальное окно
* render - отвечает за отображение модального окна

---


## Классы моделей


### Класс AppData

Хранит все данные приложения, массив всех продуктов, корзину, данные о заказе, который оформляет пользователь.
Конструктор класса принимает экземпляр класса   EventEmitter. 

**Поля:**

* catalog: IProduct[] — массив всех товаров.

* basket: IBasket — объект корзины с полями item: string[] (id товаров) и total: number.

* order: IOrder — объект текущего заказа с полями: email, phone, address, payment, items.

* preview: IProduct | null — текущий выбранный товар для превью.

* formErrors: FormErrors — объект с ошибками валидации форм.


Содержит следующие **Методы и сеттеры** для работы с данными:

* `setItems` сохранение массива данных, получаемых с сервера и взывает событие 'items:changed' изменение данных о товарах

* `setPreview` - устанавливает превью товара, принимает элемент товара который хотим просмотреть и вызывает событие preview:changed

* `inBasket` проверяет, добавлен ли указанный товар в корзину

* `addToBasket` добавляет товар в корзину, если он ещё не добавлен. После обновления пересчитывает сумму заказа и отправляет событие basket:changed.

* `removeFromBasket` удаляет товар из корзины
 если в заказе верно указаны все данные, устанавливает окно с оформленным заказом

* `validateOrder` валидирует заказ, проверяет способ оплаты и адрес доставки

* `validateContacts` валидирует заказ, проверяет поля email, phone

* `setPayment` устанавливает способ оплаты заказа, отправляет событие  order:updated

* `setOrderField` устанавливает значение в поле для заказа

* `setFormError` устанавливает значение одного из полей заказа и отправляет событие form:error с описанием.

* `clearBasket` очищает корзину, вызывает событие basket:changed


## Типы данных

```ts


export interface IProduct {
  id: string;
  title: string;
  description: string;
  price: number | null;
  image: string;
  category: string;
}


export interface IBasket {
  items: string[];
  total: number;
}


export type PaymentMethod = 'cash' | 'card';



export interface IOrderForm {
	email: string;
	phone: string;
	address: string;
	payment: PaymentMethod;
}

export interface IOrder extends IOrderForm {
	items: string[];
}

export type FormErrors = Partial<Record<keyof IOrderForm, string>>;


export interface IOrderResult {
	id: string;
    total: number;
}
```

---

> 

# 📦 События в проекте Web-ларёк

В проекте используется событийная модель, основанная на EventEmitter. Ниже приведён список  событий, их назначение и формат передаваемых данных.

---

## 📄 Список событий

### `items:changed`
**Описание:** Загружается список товаров и отображается каталог.  
**Вызывается:** после загрузки данных с сервера.  
**Данные:** `IProduct[]` — массив товаров.

---

### `preview:changed`
**Описание:** Открытие карточки товара в модальном окне.  
**Вызывается:** при клике на карточку в каталоге.  
**Данные:** `IProduct` — выбранный товар.

---

### `basket:open`
**Описание:** Открытие корзины в модальном окне.  
**Вызывается:** при клике на кнопку «Корзина».  
**Данные:** нет.

---

### `basket:close`
**Описание:** Закрытие корзины.  
**Вызывается:** при клике на крестик или за пределами модального окна.  
**Данные:** нет.

---

### `basket:changed`
**Описание:** Обновление содержимого корзины — при добавлении или удалении товара.  
**Вызывается:** из `AppData` при изменении корзины.  
**Данные:** нет.

---

### `order:open`
**Описание:** Переход к оформлению заказа (форма доставки).  
**Вызывается:** при нажатии кнопки «Оформить» в корзине.  
**Данные:** нет.

---

### `order.{field}:change`
**Описание:** Изменение поля формы доставки.  
**Вызывается:** при вводе адреса или выборе способа оплаты.  
**Примеры:**  
- `order.address:change`  
- `order.payment:change`  
**Данные:** `{ field: string; value: string }`

---

### `order:submit`
**Описание:** Отправка формы доставки и переход к форме контактов.  
**Вызывается:** при нажатии на кнопку «Далее».  
**Данные:** нет.

---

### `contacts.{field}:change`
**Описание:** Изменение поля формы контактов.  
**Вызывается:** при вводе email или телефона.  
**Примеры:**  
- `contacts.email:change`  
- `contacts.phone:change`  
**Данные:** `{ field: string; value: string }`

---

### `contacts:submit`
**Описание:** Отправка формы контактов и оформление заказа через API.  
**Вызывается:** при нажатии на кнопку «Заказать».  
**Данные:** нет.

---

### `modal:open`
**Описание:** Блокировка прокрутки страницы при открытии модального окна.  
**Данные:** нет.

---

### `modal:close`
**Описание:** Разблокировка страницы после закрытия модального окна.  
**Данные:** нет.

---

## 🛠 Примечание

События с шаблоном `*.{field}:change`  обрабатываются с использованием регулярного выражения:

```ts
events.on(/^order\..*:change$/, handler);
events.on(/^contacts\..*:change$/, handler);
