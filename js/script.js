const yearEl = document.getElementById("year");
const contactForm = document.getElementById("contactForm");
const contactSuccess = document.getElementById("contactSuccess");
const previewLinks = document.querySelectorAll(".preview-link");
const previewModalImage = document.getElementById("previewModalImage");
const previewModalTitle = document.getElementById("previewModalTitle");

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach((triggerEl) => {
  new bootstrap.Tooltip(triggerEl);
});

if (contactForm && contactSuccess) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!contactForm.checkValidity()) {
      event.stopPropagation();
      contactSuccess.classList.add("d-none");
      contactForm.classList.add("was-validated");
      return;
    }

    contactSuccess.classList.remove("d-none");
    contactForm.reset();
    contactForm.classList.remove("was-validated");
  });
}

if (previewLinks.length && previewModalImage && previewModalTitle) {
  previewLinks.forEach((link) => {
    link.addEventListener("click", () => {
      const imageSrc = link.dataset.previewSrc;
      const imageTitle = link.dataset.previewTitle || "Preview";

      if (!imageSrc) {
        return;
      }

      previewModalImage.src = imageSrc;
      previewModalImage.alt = imageTitle;
      previewModalTitle.textContent = imageTitle;
    });
  });
}
