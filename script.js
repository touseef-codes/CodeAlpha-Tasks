// Elements
const filterButtons = document.querySelectorAll(".filter-btn");
const searchInput = document.getElementById("searchInput");
const galleryItems = document.querySelectorAll(".gallery-item");

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxCaption = document.getElementById("lightboxCaption");
const lightboxClose = document.getElementById("lightboxClose");

let activeFilter = "all";

// Apply filter + search together
function updateGallery() {
  const query = searchInput.value.trim().toLowerCase();

  galleryItems.forEach((item) => {
    const category = item.dataset.category.toLowerCase();
    const title = item.dataset.title.toLowerCase();

    const matchesFilter = activeFilter === "all" || category === activeFilter;
    const matchesSearch = title.includes(query) || category.includes(query);

    if (matchesFilter && matchesSearch) {
      item.classList.remove("hide");
    } else {
      item.classList.add("hide");
    }
  });
}

// Filter button click
filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    activeFilter = btn.dataset.filter;
    updateGallery();
  });
});

// Search input typing
searchInput.addEventListener("input", updateGallery);

// Lightbox open
galleryItems.forEach((item) => {
  item.addEventListener("click", () => {
    const img = item.querySelector("img");
    const caption = item.dataset.title;

    lightboxImage.src = img.src;
    lightboxImage.alt = img.alt;
    lightboxCaption.textContent = caption;

    lightbox.classList.add("show");
    document.body.style.overflow = "hidden";
  });
});

// Lightbox close function
function closeLightbox() {
  lightbox.classList.remove("show");
  document.body.style.overflow = "auto";
}

lightboxClose.addEventListener("click", closeLightbox);

// Close on outside click
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});

// Close on Esc
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && lightbox.classList.contains("show")) {
    closeLightbox();
  }
});

const uploadBtn = document.getElementById("uploadBtn");
const fileInput = document.getElementById("fileInput");
const gallery = document.getElementById("gallery");

// button click → file open
uploadBtn.addEventListener("click", () => {
  fileInput.click();
});

// file select → image show
fileInput.addEventListener("change", () => {
  const file = fileInput.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = function (e) {
      const imgBox = document.createElement("div");
      imgBox.classList.add("img-box");

      const img = document.createElement("img");
      img.src = e.target.result;

      imgBox.appendChild(img);
      gallery.appendChild(imgBox);
    };

    reader.readAsDataURL(file);
  }
});