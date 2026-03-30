document.addEventListener("DOMContentLoaded", function () {
  const reveals = document.querySelectorAll(".reveal.animate");
  const skillCards = document.querySelectorAll(".skill-card");
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-links a");
  const menuToggle = document.getElementById("menuToggle");
  const navbar = document.getElementById("navbar");
  const navItems = document.querySelectorAll(".nav-links a");

  const contactForm = document.getElementById("contactForm");
  const formSuccess = document.getElementById("formSuccess");
  const submitBtn = document.querySelector(".form-submit");

  /* Reveal animation */
  if (reveals.length > 0) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    reveals.forEach((item) => revealObserver.observe(item));
  }

  /* Skill bar animation */
  if (skillCards.length > 0) {
    const skillObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const bars = entry.target.querySelectorAll(".skill-bar-fill");

            bars.forEach((bar) => {
              const percent = bar.dataset.pct;
              if (percent) {
                bar.style.width = `${percent}%`;
              }
            });

            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    skillCards.forEach((card) => skillObserver.observe(card));
  }

  /* Active nav link on scroll */
  function setActiveLink() {
    let currentSection = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 140;
      const sectionHeight = section.offsetHeight;

      if (
        window.scrollY >= sectionTop &&
        window.scrollY < sectionTop + sectionHeight
      ) {
        currentSection = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active-link");

      if (link.getAttribute("href") === `#${currentSection}`) {
        link.classList.add("active-link");
      }
    });
  }

  window.addEventListener("scroll", setActiveLink);
  window.addEventListener("load", setActiveLink);

  /* Hamburger menu */
  if (menuToggle && navbar) {
    menuToggle.addEventListener("click", () => {
      menuToggle.classList.toggle("active");
      navbar.classList.toggle("show");
    });

    navItems.forEach((item) => {
      item.addEventListener("click", () => {
        menuToggle.classList.remove("active");
        navbar.classList.remove("show");
      });
    });
  }

  /* Formspree form submission without redirect */
  if (contactForm && submitBtn && formSuccess) {
    formSuccess.style.display = "none";

    contactForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      submitBtn.disabled = true;
      submitBtn.innerHTML = "<span>Sending...</span>";

      const formData = new FormData(contactForm);

      try {
        const response = await fetch(contactForm.action, {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json",
          },
        });

        if (response.ok) {
          contactForm.reset();
          formSuccess.style.display = "block";
          submitBtn.innerHTML = "<span>Sent ✅</span>";
        } else {
          submitBtn.disabled = false;
          submitBtn.innerHTML = "<span>Try Again</span>";
          alert("Something went wrong. Please try again.");
        }
      } catch (error) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = "<span>Try Again</span>";
        alert("Network error. Please check your connection and try again.");
      }
    });
  }
});