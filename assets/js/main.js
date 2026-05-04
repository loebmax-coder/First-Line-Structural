document.addEventListener("DOMContentLoaded", function () {

  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const endpoint = "https://script.google.com/macros/s/AKfycbyv_VHNBKjAFQ46uFwd40w71wnFc8k643-leiUKpRQOxH1I5sKZBK3suiUs-tRkScqcUA/exec";

  const form = document.getElementById("expertForm");

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const status = document.getElementById("expertFormStatus");
      const data = Object.fromEntries(new FormData(form).entries());

      try {
        await fetch(endpoint, {
          method: "POST",
          body: JSON.stringify(data),
          headers: { "Content-Type": "application/json" }
        });

        status.textContent = "Submission received. Thank you.";
        form.reset();

      } catch (err) {
        status.textContent = "Error submitting form. Please try again.";
      }
    });
  }

});