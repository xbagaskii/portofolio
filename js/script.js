const yearEl = document.getElementById("year");
const contactForm = document.getElementById("contactForm");
const contactFeedback = document.getElementById("contactFeedback");
const contactSubmitButton = document.getElementById("contactSubmitButton");
const previewLinks = document.querySelectorAll(".preview-link");
const previewModalImage = document.getElementById("previewModalImage");
const previewModalTitle = document.getElementById("previewModalTitle");
const contactTargetEmail = "rizkibagasprasongko@gmail.com";

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach((triggerEl) => {
  new bootstrap.Tooltip(triggerEl);
});

if (contactForm && contactFeedback && contactSubmitButton) {
  const setFeedback = (message, type = "success") => {
    contactFeedback.textContent = message;
    contactFeedback.classList.remove("d-none", "alert-success", "alert-danger");
    contactFeedback.classList.add(type === "success" ? "alert-success" : "alert-danger");
  };

  const setLoadingState = (isLoading) => {
    contactSubmitButton.disabled = isLoading;
    contactSubmitButton.textContent = isLoading ? "Sending..." : "Send Message";
  };

  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!contactForm.checkValidity()) {
      event.stopPropagation();
      contactFeedback.classList.add("d-none");
      contactForm.classList.add("was-validated");
      return;
    }

    setLoadingState(true);

    const formData = new FormData(contactForm);
    formData.append("_subject", "New message from portfolio contact form");
    formData.append("_template", "table");
    formData.append("_captcha", "false");

    const replyTo = formData.get("email");
    if (replyTo) {
      formData.append("_replyto", String(replyTo));
    }

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${contactTargetEmail}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      setFeedback("Message sent successfully. Please check your email inbox.", "success");
      contactForm.reset();
      contactForm.classList.remove("was-validated");
    } catch (error) {
      setFeedback("Failed to send message. Please try again in a moment.", "danger");
    } finally {
      setLoadingState(false);
    }
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
