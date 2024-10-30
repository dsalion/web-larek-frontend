# Проектная работа "Веб-ларек"

Приветствую, дорогой %Username%! Перед тобой моя реализация проекта "Веб-ларек". Вместе с тобой мы осуществим покупку невероятных товаров с Я.Склада(**Будь внимательней, это все понарошку**). При загрузке страницы ты увидишь список товаров. Ты можешь добавить в корзину любой товар, кроме тех что не имеют цены(**бесценны**). К сожалению товаров на складе не слишком много, и любой товар можно добавить только в единственном экземпляре. 
>!Но не волнуйся, я уверен что склад регулярно пополняется!\   Чуть ниже инструкция для запуска этого проекта, а так же его документация. Проект выполнен согласно парадигме **MVP:** 

- слой представления, отвечает за отображение данных на странице, 
- слой данных, отвечает за хранение и изменение данных
- презентер, отвечает за связь представления и данных.

**Стек: HTML, SCSS, TS, Webpack**

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом
- src/components/common/ - папка для переиспользуемых родительских классов

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
