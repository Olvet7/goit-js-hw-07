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

// відміна дефолтого нвідкриття за посиланням 
    event.preventDefault();
if (event.target.tagName !== "IMG") {
    return
} 

// відкриття великої картинки
const instance = basicLightbox.create(`
    <img src="${event.target.dataset.source}" width="800" height="600">
`);

instance.show()

// Функція закриття картинки
galleryList.addEventListener("keydown", (event) => {
    if (event.code === "Escape") {
        instance.close();
    }
  });
}

