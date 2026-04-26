document.addEventListener("DOMContentLoaded", () => {
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
            if (link.getAttribute("href") === `#${id}`) {
              link.classList.add("active");
            }
          });
        }
      });
    },
    { threshold: 0.4 },
  );
  sections.forEach((sec) => sectionObserver.observe(sec));

  // ===== SMOOTH SCROLL NAV LINKS =====
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) target.scrollIntoView({ behavior: "smooth" });
    });
  });

  // ===== ARROW BUTTON: scroll to About =====
  const arrowBtn = document.getElementById("arrowBtn");
  if (arrowBtn) {
    arrowBtn.addEventListener("click", () => {
      const aboutSection = document.getElementById("about");
      if (aboutSection) aboutSection.scrollIntoView({ behavior: "smooth" });
    });
  }

  // ===== HERO BACKGROUND SLIDESHOW =====
  const slides = document.querySelectorAll(".slide");
  let currentSlide = 0;
  function nextSlide() {
    slides[currentSlide].classList.remove("active");
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add("active");
  }
  if (slides.length > 1) setInterval(nextSlide, 5000);

  // ===== TYPING ANIMATION =====
  const texts = [
    "Frontend Developer",
    "Web Developer",
    "UI Enthusiast",
    "Problem Solver",
  ];
  let ti = 0,
    tj = 0,
    isDeleting = false,
    currentText = "";

  function typeEffect() {
    const el = document.getElementById("typing");
    if (!el) return;
    if (!isDeleting && tj <= texts[ti].length) {
      currentText = texts[ti].substring(0, tj++);
    } else if (isDeleting && tj >= 0) {
      currentText = texts[ti].substring(0, tj--);
    }
    el.textContent = currentText;
    if (tj === texts[ti].length) isDeleting = true;
    if (tj === 0 && isDeleting) {
      isDeleting = false;
      ti = (ti + 1) % texts.length;
    }
    setTimeout(typeEffect, isDeleting ? 55 : 110);
  }
  typeEffect();

  // ===== ABOUT SECTION REVEAL =====
  const aboutImage = document.querySelector(".about-image");
  const aboutText = document.querySelector(".about-text");
  const aboutObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal");
          aboutObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.25 },
  );
  if (aboutImage) aboutObserver.observe(aboutImage);
  if (aboutText) aboutObserver.observe(aboutText);

  // ===== PROJECT CARD REVEAL =====
  const projectCards = document.querySelectorAll(".project-card");
  const cardObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal");
          cardObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 },
  );
  projectCards.forEach((card) => cardObserver.observe(card));

  // ===== SERVICE CARD REVEAL =====
  const serviceCards = document.querySelectorAll(".service-card");
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
  serviceCards.forEach((card) => serviceObserver.observe(card));

  // ===== PROGRESS BAR ANIMATION =====
  const progressBars = document.querySelectorAll(".progress");
  const progressObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          bar.style.width = bar.getAttribute("data-skill") + "%";
          progressObserver.unobserve(bar);
        }
      });
    },
    { threshold: 0.5 },
  );
  progressBars.forEach((bar) => progressObserver.observe(bar));

  // ===== PROJECT DETAIL MODAL =====
  const projectModal = document.getElementById("projectModal");
  const projectModalBody = document.getElementById("projectModalBody");
  const projectClose = document.getElementById("projectClose");

  projectCards.forEach((card) => {
    card.addEventListener("click", () => {
      const title = card.dataset.title || "Project";
      const desc = card.dataset.desc || "";
      const techStr = card.dataset.tech || "";
      const image = card.dataset.image || "";
      const url = card.dataset.url || "#";

      const techTags = techStr
        .split(",")
        .map((t) => `<span class="tech-tag">${t.trim()}</span>`)
        .join("");

      const imgHTML = image
        ? `<img src="${image}" alt="${title}" class="modal-screenshot" />`
        : `<div class="modal-screenshot-placeholder"><i class="fa-solid fa-image"></i></div>`;

      projectModalBody.innerHTML = `
        ${imgHTML}
        <div class="modal-info">
          <h3>${title}</h3>
          <p>${desc}</p>
          <div class="modal-tech">${techTags}</div>
          <a href="${url}" target="_blank" class="btn">
            <i class="fa-solid fa-arrow-up-right-from-square"></i> Visit Site
          </a>
        </div>
      `;

      projectModal.style.display = "flex";
      document.body.style.overflow = "hidden";
    });
  });

  if (projectClose) {
    projectClose.addEventListener("click", () => {
      projectModal.style.display = "none";
      document.body.style.overflow = "";
    });
  }
  projectModal.addEventListener("click", (e) => {
    if (e.target === projectModal) {
      projectModal.style.display = "none";
      document.body.style.overflow = "";
    }
  });

  // ===== CONTACT MODAL =====
  const contactModal = document.getElementById("contactModal");
  const contactBtn = document.getElementById("contactBtn");
  const contactClose = document.getElementById("contactClose");

  if (contactBtn) {
    contactBtn.addEventListener("click", () => {
      contactModal.style.display = "flex";
      document.body.style.overflow = "hidden";
    });
  }
  if (contactClose) {
    contactClose.addEventListener("click", () => {
      contactModal.style.display = "none";
      document.body.style.overflow = "";
    });
  }
  contactModal.addEventListener("click", (e) => {
    if (e.target === contactModal) {
      contactModal.style.display = "none";
      document.body.style.overflow = "";
    }
  });

  // ===== SCROLL PROGRESS BAR =====
  const scrollBar = document.getElementById("scrollBar");
  window.addEventListener("scroll", () => {
    if (!scrollBar) return;
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    scrollBar.style.width = (scrollTop / scrollHeight) * 100 + "%";
  });

  // ===== SCROLL TO TOP =====
  const topBtn = document.getElementById("topBtn");
  window.addEventListener("scroll", () => {
    topBtn.style.display = window.scrollY > 400 ? "block" : "none";
  });
  topBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // ===== CONTACT FORM (Formspree) =====
  const form = document.getElementById("contactForm");
  const status = document.getElementById("formStatus");
  const sendButton = document.getElementById("sendButton");

  if (form) {
    form.addEventListener("submit", async function (e) {
      e.preventDefault();
      sendButton.disabled = true;
      sendButton.textContent = "Sending...";
      try {
        const res = await fetch(form.action, {
          method: form.method,
          body: new FormData(form),
          headers: { Accept: "application/json" },
        });
        if (res.ok) {
          status.textContent = "Thank you! Your message has been sent.";
          status.style.color = "#00c15a";
          sendButton.textContent = "Sent ✔";
          form.reset();
          setTimeout(() => {
            sendButton.textContent = "Send";
            sendButton.disabled = false;
          }, 3000);
        } else {
          status.textContent = "Something went wrong. Please try again.";
          status.style.color = "#e55";
          sendButton.textContent = "Send";
          sendButton.disabled = false;
        }
      } catch {
        status.textContent = "Network error. Check your connection.";
        status.style.color = "#e55";
        sendButton.textContent = "Send";
        sendButton.disabled = false;
      }
    });
  }
});
