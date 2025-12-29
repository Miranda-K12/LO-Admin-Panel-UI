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
  const textarea = document.querySelector("textarea");
  const error = document.getElementById("commentError");

  const btnRisk = document.getElementById("btnRisk");
  const btnHead = document.getElementById("btnHead");

  if (!textarea || !error) return;

  // helper: count words
  function wordCount(text) {
    return text.trim().split(/\s+/).filter(Boolean).length;
  }

  function validateComment() {
    if (wordCount(textarea.value) >= 3) {
      error.classList.add("hidden");
      return true;
    }
    return false;
  }

  // 🔴 Validate on escalation
  function handleEscalation(actionText) {
    if (!validateComment()) {
      error.classList.remove("hidden");
      textarea.focus();
      return;
    }
    alert(`✅ ${actionText} (UI prototype)`);
  }

  // ✍️ LIVE validation while typing
  textarea.addEventListener("input", () => {
    validateComment();
  });

  btnRisk?.addEventListener("click", () =>
    handleEscalation("Escalated to Risk Manager")
  );

  btnHead?.addEventListener("click", () =>
    handleEscalation("Escalated to Department Head")
  );
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
