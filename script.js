document.addEventListener("DOMContentLoaded", () => {
  // ===== THEME TOGGLE =====
  const html = document.documentElement;
  const themeToggle = document.getElementById("themeToggle");
  const saved = localStorage.getItem("theme") || "dark";
  html.setAttribute("data-theme", saved);

  themeToggle.addEventListener("click", () => {
    const next = html.getAttribute("data-theme") === "dark" ? "light" : "dark";
    html.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  });

  // ===== LANGUAGE TOGGLE =====
  let currentLang = localStorage.getItem("lang") || "en";
  const langToggle = document.getElementById("langToggle");
  const langLabel = document.getElementById("langLabel");

  function applyLanguage(lang) {
    // text nodes
    document.querySelectorAll("[data-en]").forEach((el) => {
      if (!el.matches("input, textarea, button[type=submit]")) {
        el.textContent = lang === "en" ? el.dataset.en : el.dataset.pt;
      }
    });
    // placeholders
    document.querySelectorAll("[data-en-placeholder]").forEach((el) => {
      el.placeholder =
        lang === "en" ? el.dataset.enPlaceholder : el.dataset.ptPlaceholder;
    });
    // html lang attr
    document.documentElement.lang = lang === "en" ? "en" : "pt";
    // button label shows what you'll switch TO
    langLabel.textContent = lang === "en" ? "PT" : "EN";
    currentLang = lang;
    localStorage.setItem("lang", lang);
  }

  applyLanguage(currentLang);

  langToggle.addEventListener("click", () => {
    applyLanguage(currentLang === "en" ? "pt" : "en");
  });

  // ===== HAMBURGER MENU =====
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobileMenu");

  hamburger.addEventListener("click", () => {
    const open = mobileMenu.classList.toggle("open");
    hamburger.classList.toggle("open", open);
    hamburger.setAttribute("aria-expanded", open);
    document.body.style.overflow = open ? "hidden" : "";
  });

  // Close mobile menu on link click
  document.querySelectorAll(".mob-link").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      mobileMenu.classList.remove("open");
      hamburger.classList.remove("open");
      hamburger.setAttribute("aria-expanded", false);
      document.body.style.overflow = "";
      const target = document.querySelector(link.getAttribute("href"));
      if (target) target.scrollIntoView({ behavior: "smooth" });
    });
  });

  // ===== NAVBAR SCROLL EFFECT =====
  const navbar = document.querySelector(".navbar");
  window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 50);
  });

  // ===== ACTIVE NAV LINK ON SCROLL =====
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          navLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${id}`)
              link.classList.add("active");
          });
        }
      });
    },
    { threshold: 0.4 },
  );
  sections.forEach((sec) => sectionObserver.observe(sec));

  // Smooth scroll desktop nav
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) target.scrollIntoView({ behavior: "smooth" });
    });
  });

  // ===== ARROW BUTTON =====
  const arrowBtn = document.getElementById("arrowBtn");
  if (arrowBtn) {
    arrowBtn.addEventListener("click", () => {
      document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
    });
  }

  // ===== HERO SLIDESHOW =====
  const slides = document.querySelectorAll(".slide");
  let currentSlide = 0;
  if (slides.length > 1) {
    setInterval(() => {
      slides[currentSlide].classList.remove("active");
      currentSlide = (currentSlide + 1) % slides.length;
      slides[currentSlide].classList.add("active");
    }, 5000);
  }

  // ===== TYPING ANIMATION =====
  const typingTexts = {
    en: [
      "Frontend Developer",
      "Web Developer",
      "UI Enthusiast",
      "Problem Solver",
    ],
    pt: [
      "Desenvolvedor Frontend",
      "Desenvolvedor Web",
      "Entusiasta de UI",
      "Solucionador de Problemas",
    ],
  };
  let ti = 0,
    tj = 0,
    isDeleting = false;

  function typeEffect() {
    const el = document.getElementById("typing");
    if (!el) return;
    const list = typingTexts[currentLang] || typingTexts.en;
    // reset index if out of range
    if (ti >= list.length) ti = 0;
    const word = list[ti];
    if (!isDeleting && tj <= word.length) {
      el.textContent = word.substring(0, tj++);
    } else if (isDeleting && tj >= 0) {
      el.textContent = word.substring(0, tj--);
    }
    if (tj === word.length) isDeleting = true;
    if (tj === 0 && isDeleting) {
      isDeleting = false;
      ti = (ti + 1) % list.length;
    }
    setTimeout(typeEffect, isDeleting ? 55 : 110);
  }
  typeEffect();

  // ===== ABOUT REVEAL =====
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.25 },
  );

  document
    .querySelectorAll(".about-image, .about-text")
    .forEach((el) => revealObserver.observe(el));

  // ===== SERVICE CARDS REVEAL =====
  const serviceObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add("reveal"), i * 120);
          serviceObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.25 },
  );
  document
    .querySelectorAll(".service-card")
    .forEach((c) => serviceObserver.observe(c));

  // ===== PROJECT CARDS REVEAL =====
  const cardObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal");
          cardObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.25 },
  );
  document
    .querySelectorAll(".project-card")
    .forEach((c) => cardObserver.observe(c));

  // ===== SKILL BARS =====
  const progressObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.width = entry.target.dataset.skill + "%";
          progressObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 },
  );
  document
    .querySelectorAll(".progress")
    .forEach((bar) => progressObserver.observe(bar));

  // ===== PROJECT DETAIL MODAL =====
  const projectModal = document.getElementById("projectModal");
  const projectModalBody = document.getElementById("projectModalBody");
  const projectClose = document.getElementById("projectClose");

  document.querySelectorAll(".project-card").forEach((card) => {
    card.addEventListener("click", () => {
      const lang = currentLang;
      const title =
        lang === "pt"
          ? card.dataset.titlePt || card.dataset.title
          : card.dataset.title;
      const desc =
        lang === "pt"
          ? card.dataset.descPt || card.dataset.desc
          : card.dataset.desc;
      const techStr = card.dataset.tech || "";
      const image = card.dataset.image || "";
      const url = card.dataset.url || "#";
      const visitLabel = lang === "pt" ? "Visitar Site" : "Visit Site";

      const techTags = techStr
        .split(",")
        .map((t) => `<span class="tech-tag">${t.trim()}</span>`)
        .join("");
      const imgHTML = image
        ? `<img src="${image}" alt="${title}" class="modal-screenshot"/>`
        : `<div class="modal-screenshot-placeholder"><i class="fa-solid fa-image"></i></div>`;

      projectModalBody.innerHTML = `
        ${imgHTML}
        <div class="modal-info">
          <h3>${title}</h3>
          <p>${desc}</p>
          <div class="modal-tech">${techTags}</div>
          <a href="${url}" target="_blank" class="btn">
            <i class="fa-solid fa-arrow-up-right-from-square"></i> ${visitLabel}
          </a>
        </div>`;

      projectModal.style.display = "flex";
      document.body.style.overflow = "hidden";
    });
  });

  projectClose?.addEventListener("click", () => {
    projectModal.style.display = "none";
    document.body.style.overflow = "";
  });
  projectModal.addEventListener("click", (e) => {
    if (e.target === projectModal) {
      projectModal.style.display = "none";
      document.body.style.overflow = "";
    }
  });

  // ===== CONTACT MODAL =====
  const contactModal = document.getElementById("contactModal");
  const contactClose = document.getElementById("contactClose");

  document.getElementById("contactBtn")?.addEventListener("click", () => {
    contactModal.style.display = "flex";
    document.body.style.overflow = "hidden";
  });
  contactClose?.addEventListener("click", () => {
    contactModal.style.display = "none";
    document.body.style.overflow = "";
  });
  contactModal.addEventListener("click", (e) => {
    if (e.target === contactModal) {
      contactModal.style.display = "none";
      document.body.style.overflow = "";
    }
  });

  // ===== CONTACT FORM =====
  const form = document.getElementById("contactForm");
  const status = document.getElementById("formStatus");
  const sendButton = document.getElementById("sendButton");

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      sendButton.disabled = true;
      sendButton.textContent =
        currentLang === "pt" ? "Enviando..." : "Sending...";
      try {
        const res = await fetch(form.action, {
          method: form.method,
          body: new FormData(form),
          headers: { Accept: "application/json" },
        });
        if (res.ok) {
          status.textContent =
            currentLang === "pt"
              ? "Obrigado! Mensagem enviada."
              : "Thank you! Your message has been sent.";
          status.style.color = "#00c15a";
          sendButton.textContent = "✔";
          form.reset();
          setTimeout(() => {
            sendButton.textContent = currentLang === "pt" ? "Enviar" : "Send";
            sendButton.disabled = false;
          }, 3000);
        } else {
          status.textContent =
            currentLang === "pt"
              ? "Algo correu mal. Tente novamente."
              : "Something went wrong. Please try again.";
          status.style.color = "#e55";
          sendButton.textContent = currentLang === "pt" ? "Enviar" : "Send";
          sendButton.disabled = false;
        }
      } catch {
        status.textContent =
          currentLang === "pt" ? "Erro de rede." : "Network error.";
        status.style.color = "#e55";
        sendButton.textContent = currentLang === "pt" ? "Enviar" : "Send";
        sendButton.disabled = false;
      }
    });
  }

  // ===== SCROLL PROGRESS BAR =====
  const scrollBar = document.getElementById("scrollBar");
  window.addEventListener("scroll", () => {
    if (!scrollBar) return;
    const pct =
      document.documentElement.scrollTop /
      (document.documentElement.scrollHeight -
        document.documentElement.clientHeight);
    scrollBar.style.width = pct * 100 + "%";
  });

  // ===== SCROLL TO TOP =====
  const topBtn = document.getElementById("topBtn");
  window.addEventListener("scroll", () => {
    topBtn.style.display = window.scrollY > 400 ? "block" : "none";
  });
  topBtn?.addEventListener("click", () =>
    window.scrollTo({ top: 0, behavior: "smooth" }),
  );
});
