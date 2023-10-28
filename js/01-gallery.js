import { galleryItems } from './gallery-items.js';
// Change code below this line

console.log(galleryItems);
// Доступ до пустої галереї в html
const galleryList = document.querySelector('.gallery');
console.log(galleryList);

// Функція, яка повертає рядок із всіма картинками 
// description, original,  preview - структура однієї картинки з галереї

function galleryMarcupItem(items) {
    return items
    .map(({description, original, preview}) => {
        return `
        <li class="gallery__item">
        <a class="gallery__link" href="${original}">
          <img class="gallery__image" src="${preview}" data-source="${original}" alt="Image description"">
        </a>
      </li>
        `;
    })
   .join('');
}

// Створюємо всі картки функцією galleryMarcupItem
const galleryMarcup = galleryMarcupItem(galleryItems);

// Додаємо в DOM всі картки
galleryList.innerHTML = galleryMarcup;

// Додаємо слухача на список галереї
galleryList.addEventListener("click", onImageClick);

// Функція відкрити картинки
function onImageClick(event) {
  event.preventDefault();
  if (event.target.tagName !== "IMG") {
    return;
  }

  let instance = null;

  const closeOnEscape = (event) => {
    if (event.code === "Escape") {
      instance.close();
      document.removeEventListener("keydown", closeOnEscape);
    }
  };

  instance = basicLightbox.create(
    `
    <img src="${event.target.dataset.source}" width="800" height="600">
    `,
    {
      onShow: (instance) => {
        // Додавання слухача клавіші Escape для закриття модалки
        document.addEventListener("keydown", closeOnEscape);
      },
      onClose: () => {
        // Видалення слухача клавіші Escape після закриття модалки
        document.removeEventListener("keydown", closeOnEscape);
      },
    }
  );

  // Відкриття модалки
  instance.show();
}
