/* =========================
   TABLE PAGE LOGIC
   ========================= */
document.querySelectorAll(".case-row").forEach((row) => {
  row.addEventListener("click", () => {
    const caseId = row.dataset.id;
    window.location.href = `details.html?id=${caseId}`;
  });
});

/* =========================
   DETAILS PAGE LOGIC
   ========================= */
const params = new URLSearchParams(window.location.search);
const caseId = params.get("id");

// run ONLY if cards exist (details.html)
const cards = document.querySelectorAll(".card");

if (cards.length > 0 && caseId) {
  // hide all cards
  cards.forEach((card) => {
    card.classList.add("hidden");
  });

  // find matching card
  const activeCard = document.querySelector(`.card[data-id="${caseId}"]`);

  if (activeCard) {
    activeCard.classList.remove("hidden");
  } else {
    document.body.innerHTML = "<h2>მონაცემები ვერ მოიძებნა</h2>";
  }
}

/*error message*/
document.addEventListener("DOMContentLoaded", () => {
  // First, let's make sure we show the correct card
  // Get the case ID from URL or use first card
  const urlParams = new URLSearchParams(window.location.search);
  const caseId = urlParams.get("id") || "A-77801";

  // Show the card with matching data-id
  const allCards = document.querySelectorAll(".card");
  let currentCard = null;

  allCards.forEach((card) => {
    if (card.getAttribute("data-id") === caseId) {
      card.classList.remove("hidden");
      currentCard = card;
    } else {
      card.classList.add("hidden");
    }
  });

  if (!currentCard) {
    // Fallback to first card if no match
    currentCard = allCards[0];
    currentCard.classList.remove("hidden");
  }

  // Now get elements from the CURRENT visible card
  const textarea = currentCard.querySelector("textarea");
  const error = currentCard.querySelector(".commentError");
  const btnRisk = currentCard.querySelector(".btnRisk");
  const btnHead = currentCard.querySelector(".btnHead");

  if (!textarea || !error) return;

  // helper: count words
  function wordCount(text) {
    return text.trim().split(/\s+/).filter(Boolean).length;
  }

  function validateComment() {
    const isValid = wordCount(textarea.value) >= 3;
    error.classList.toggle("hidden", isValid);
    return isValid;
  }

  // 🔴 Validate on escalation
  function handleEscalation(actionText) {
    if (!validateComment()) {
      textarea.focus();
      return;
    }
    alert(`✅ ${actionText} (UI prototype)`);
  }

  // ✍️ LIVE validation while typing
  textarea.addEventListener("input", validateComment);

  // Add event listeners if buttons exist
  btnRisk?.addEventListener("click", () =>
    handleEscalation("Escalated to Risk Manager")
  );

  btnHead?.addEventListener("click", () =>
    handleEscalation("Escalated to Department Head")
  );

  // Optional: File upload functionality
  const fileInput = currentCard.querySelector(".docUpload");
  const uploadPicked = currentCard.querySelector(".upload-picked");
  const fileInfo = currentCard.querySelector(".file-info");
  const removeFileBtn = currentCard.querySelector(".remove-file");

  if (fileInput && uploadPicked && fileInfo && removeFileBtn) {
    fileInput.addEventListener("change", function (e) {
      if (this.files.length > 0) {
        const fileName = this.files[0].name;
        fileInfo.textContent = fileName;
        uploadPicked.classList.remove("hidden");
      }
    });

    removeFileBtn.addEventListener("click", function () {
      fileInput.value = "";
      uploadPicked.classList.add("hidden");
    });
  }
});

/*upload file */
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".upload-box").forEach((box) => {
    const input = box.querySelector(".docUpload");
    const picked = box.querySelector(".upload-picked");
    const fileInfo = box.querySelector(".file-info");
    const removeBtn = box.querySelector(".remove-file");

    if (!input || !picked || !fileInfo || !removeBtn) return;

    input.addEventListener("change", () => {
      const file = input.files?.[0];
      if (!file) return;

      const sizeKB = Math.round(file.size / 1024);
      fileInfo.textContent = `${file.name} (${sizeKB} KB)`;
      picked.classList.remove("hidden");
    });

    removeBtn.addEventListener("click", () => {
      input.value = ""; // clear file input
      picked.classList.add("hidden");
      fileInfo.textContent = "";
    });
  });
});
