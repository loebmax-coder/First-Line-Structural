(function () {
  const SCRIPT_URL = "YOUR_SCRIPT_URL_HERE"; // replace with your Apps Script URL

  function handleSubmit(formId, statusId, payloadBuilder) {
    const form = document.getElementById(formId);
    if (!form) return;

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const status = document.getElementById(statusId);
      if (status) status.innerText = "Submitting...";

      const data = Object.fromEntries(new FormData(form));
      const payload = payloadBuilder ? payloadBuilder(data) : data;

      try {
        await fetch(SCRIPT_URL, {
          method: "POST",
          body: JSON.stringify(payload),
        });

        if (status) status.innerText = "Submitted successfully.";
        form.reset();
      } catch (err) {
        if (status) status.innerText = "Something went wrong. Try again.";
      }
    });
  }

  // Project intake form (contact page)
  handleSubmit("projectForm", "formStatus", (data) => ({
    type: "project",
    ...data,
  }));

  // Expert signup form (expert-network page)
  handleSubmit("expertForm", "expertStatus", (data) => ({
    type: "expert",
    ...data,
  }));

  // Footer year
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();
