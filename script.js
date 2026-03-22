function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function setMessage(element, text, isError) {
  if (!element) {
    return;
  }

  element.textContent = text;
  element.style.color = isError ? "red" : "green";
}

const registerPanel = document.getElementById("registerPanel");
const loginPanel = document.getElementById("loginPanel");
const showRegisterBtn = document.getElementById("showRegisterBtn");
const showLoginBtn = document.getElementById("showLoginBtn");

function showAuthPanel(panelName) {
  if (!registerPanel || !loginPanel || !showRegisterBtn || !showLoginBtn) {
    return;
  }

  const showRegister = panelName !== "login";

  registerPanel.hidden = !showRegister;
  loginPanel.hidden = showRegister;

  showRegisterBtn.classList.toggle("active", showRegister);
  showLoginBtn.classList.toggle("active", !showRegister);

  showRegisterBtn.setAttribute(
    "aria-selected",
    showRegister ? "true" : "false",
  );
  showLoginBtn.setAttribute("aria-selected", showRegister ? "false" : "true");
}

if (showRegisterBtn && showLoginBtn) {
  showRegisterBtn.addEventListener("click", function () {
    showAuthPanel("register");
  });

  showLoginBtn.addEventListener("click", function () {
    showAuthPanel("login");
  });

  if (window.location.hash === "#login") {
    showAuthPanel("login");
  }
}

// simple validation for register form
const registerForm = document.getElementById("registerForm");
const regMessage = document.getElementById("regMessage");

if (registerForm) {
  registerForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("regName").value.trim();
    const email = document.getElementById("regEmail").value.trim();
    const password = document.getElementById("regPassword").value;
    const confirmPassword = document.getElementById("regConfirmPassword").value;

    if (
      name === "" ||
      email === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      setMessage(regMessage, "Please fill all registration fields.", true);
      return;
    }

    if (!isValidEmail(email)) {
      setMessage(regMessage, "Please enter a valid email.", true);
      return;
    }

    if (password.length < 6) {
      setMessage(regMessage, "Password should be at least 6 characters.", true);
      return;
    }

    if (password !== confirmPassword) {
      setMessage(regMessage, "Passwords do not match.", true);
      return;
    }

    setMessage(regMessage, "Registration successful (demo).", false);
    registerForm.reset();
  });
}

// simple validation for login form
const loginForm = document.getElementById("loginForm");
const loginMessage = document.getElementById("loginMessage");

if (loginForm) {
  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;

    if (email === "" || password === "") {
      setMessage(loginMessage, "Please enter email and password.", true);
      return;
    }

    if (!isValidEmail(email)) {
      setMessage(loginMessage, "Please enter a valid email.", true);
      return;
    }

    if (password.length < 6) {
      setMessage(
        loginMessage,
        "Password should be at least 6 characters.",
        true,
      );
      return;
    }

    setMessage(loginMessage, "Login successful (demo).", false);
    loginForm.reset();
  });
}

// simple validation for contact form
const contactForm = document.getElementById("contactForm");
const contactMessageStatus = document.getElementById("contactMessageStatus");

if (contactForm) {
  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("contactName").value.trim();
    const email = document.getElementById("contactEmail").value.trim();
    const message = document.getElementById("contactMessage").value.trim();

    if (name === "" || email === "" || message === "") {
      setMessage(contactMessageStatus, "Please fill all inquiry fields.", true);
      return;
    }

    if (!isValidEmail(email)) {
      setMessage(contactMessageStatus, "Please enter a valid email.", true);
      return;
    }

    setMessage(
      contactMessageStatus,
      "Message sent successfully (demo).",
      false,
    );
    contactForm.reset();
  });
}
