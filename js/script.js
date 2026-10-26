/* =========================================================
   IRONZONE GYM — main script
   Plain JavaScript only. No libraries, no server.
   ========================================================= */

// ---------- 1. Grab the page elements we need ----------
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const joinForm = document.getElementById("joinForm");
const formMessage = document.getElementById("formMessage");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const planInput = document.getElementById("plan");
const planCards = document.querySelectorAll("[data-plan]");
const yearSpan = document.getElementById("year");

// ---------- 2. Footer year ----------
// Always show the current year so the copyright never goes stale.
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

/* =========================================================
   3. RESPONSIVE MOBILE MENU
   ========================================================= */

function closeMenu() {
  navLinks.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.textContent = "☰";
}

function openMenu() {
  navLinks.classList.add("open");
  menuToggle.setAttribute("aria-expanded", "true");
  menuToggle.textContent = "✕";
}

// Open / close when the hamburger button is pressed
menuToggle.addEventListener("click", () => {
  if (navLinks.classList.contains("open")) {
    closeMenu();
  } else {
    openMenu();
  }
});

// Close the menu after a navigation link is clicked
navLinks.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    closeMenu();
  }
});

// Close the menu when the user presses the Escape key
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && navLinks.classList.contains("open")) {
    closeMenu();
    menuToggle.focus();
  }
});

// Close the menu when clicking outside of it
document.addEventListener("click", (event) => {
  const clickedInsideMenu = navLinks.contains(event.target);
  const clickedToggle = menuToggle.contains(event.target);

  if (!clickedInsideMenu && !clickedToggle) {
    closeMenu();
  }
});

// If the window is resized back to desktop size, reset the menu state
window.addEventListener("resize", () => {
  if (window.innerWidth > 680) {
    closeMenu();
  }
});

/* =========================================================
   4. MEMBERSHIP PLAN BUTTONS
   Clicking "CHOOSE MONTHLY" etc. scrolls to the form
   and pre-selects that plan in the dropdown.
   ========================================================= */

planCards.forEach((link) => {
  link.addEventListener("click", () => {
    const chosenPlan = link.dataset.plan;

    // Wait a moment so the smooth scroll starts before the value changes.
    setTimeout(() => {
      planInput.value = chosenPlan;
      planInput.removeAttribute("aria-invalid");
      setFieldError("plan", "");
    }, 250);
  });
});

/* =========================================================
   5. ENQUIRY FORM VALIDATION (demo only, no backend)
   ========================================================= */

// Show or clear the small red message under a field
function setFieldError(fieldId, message) {
  const errorElement = document.getElementById(fieldId + "Error");
  if (errorElement) {
    errorElement.textContent = message;
  }

  const field = document.getElementById(fieldId);
  if (field) {
    if (message) {
      field.setAttribute("aria-invalid", "true");
    } else {
      field.removeAttribute("aria-invalid");
    }
  }
}

// Show the main message above the submit button
function setFormMessage(text, isError) {
  formMessage.textContent = text;
  formMessage.classList.toggle("is-error", Boolean(isError));
}

// Check the whole form. Returns true when everything is valid.
function validateForm() {
  let isValid = true;
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const plan = planInput.value;

  // Name: required, at least 2 characters
  if (!name) {
    setFieldError("name", "Please enter your name.");
    isValid = false;
  } else if (name.length < 2) {
    setFieldError("name", "Your name must be at least 2 characters.");
    isValid = false;
  } else {
    setFieldError("name", "");
  }

  // Email: required, must look like an email address
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!email) {
    setFieldError("email", "Please enter your email address.");
    isValid = false;
  } else if (!emailPattern.test(email)) {
    setFieldError("email", "Please enter a valid email, like you@example.com");
    isValid = false;
  } else {
    setFieldError("email", "");
  }

  // Plan: required
  if (!plan) {
    setFieldError("plan", "Please choose a membership plan.");
    isValid = false;
  } else {
    setFieldError("plan", "");
  }

  return isValid;
}

// Re-validate a single field as soon as the user corrects it
[nameInput, emailInput, planInput].forEach((field) => {
  field.addEventListener("input", () => {
    // Only clear the error while typing. Full checks happen on submit.
    if (field.id === "email") {
      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(field.value.trim());
      if (emailOk) setFieldError("email", "");
    } else if (field.value.trim()) {
      setFieldError(field.id, "");
    }
  });
});

joinForm.addEventListener("submit", (event) => {
  // Stop the page from reloading
  event.preventDefault();

  if (!validateForm()) {
    setFormMessage("Please fix the highlighted fields and try again.", true);
    // Move focus to the first invalid field for keyboard / screen-reader users
    const firstInvalid = joinForm.querySelector('[aria-invalid="true"]');
    if (firstInvalid) firstInvalid.focus();
    return;
  }

  const name = nameInput.value.trim();
  const plan = planInput.value;
  const goal = document.getElementById("message").value.trim();

  setFormMessage(
    `Thanks, ${name}! Your ${plan} membership enquiry is ready` +
      (goal ? ` for your goal: "${goal}". ` : ". ") +
      "This is a demo form, so nothing was sent or saved.",
    false
  );

  joinForm.reset();
  // Clear field-level errors after a successful demo submission
  setTimeout(() => {
    ["name", "email", "plan"].forEach((id) => setFieldError(id, ""));
  }, 0);
});

/* =========================================================
   6. IMAGE FALLBACKS
   If a free online photo cannot load, show a local
   SVG illustration instead so no empty boxes appear.
   ========================================================= */

document.querySelectorAll("img[data-fallback]").forEach((img) => {
  img.addEventListener("error", () => {
    const fallback = img.dataset.fallback;
    if (fallback && !img.src.endsWith(fallback)) {
      img.src = fallback;
    }
  });
});
