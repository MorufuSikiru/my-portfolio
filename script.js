// Navbar scroll
window.addEventListener(
  "scroll",
  () => {
    document
      .getElementById(
        "navbar",
      )
      .classList.toggle(
        "scrolled",
        window.scrollY >
          50,
      );
  },
);

// Mobile nav
document
  .getElementById(
    "hamburger",
  )
  .addEventListener(
    "click",
    () =>
      document
        .getElementById(
          "mobileNav",
        )
        .classList.add(
          "open",
        ),
  );
document
  .getElementById(
    "mobileClose",
  )
  .addEventListener(
    "click",
    () =>
      document
        .getElementById(
          "mobileNav",
        )
        .classList.remove(
          "open",
        ),
  );
document
  .querySelectorAll(
    ".mobile-link",
  )
  .forEach(
    (
      l,
    ) =>
      l.addEventListener(
        "click",
        () =>
          document
            .getElementById(
              "mobileNav",
            )
            .classList.remove(
              "open",
            ),
      ),
  );

// Scroll reveal
const observer =
  new IntersectionObserver(
    (
      entries,
    ) => {
      entries.forEach(
        (
          e,
        ) => {
          if (
            e.isIntersecting
          ) {
            e.target.classList.add(
              "visible",
            );
            // Animate skill bars
            e.target
              .querySelectorAll(
                ".skill-bar-fill",
              )
              .forEach(
                (
                  bar,
                ) => {
                  bar.style.width =
                    bar
                      .dataset
                      .width +
                    "%";
                },
              );
          }
        },
      );
    },
    {
      threshold: 0.1,
    },
  );
document
  .querySelectorAll(
    ".reveal",
  )
  .forEach(
    (
      el,
    ) =>
      observer.observe(
        el,
      ),
  );
// Contact form

const contactForm =
  document.getElementById(
    "contactForm",
  );

const formSubmit =
  document.getElementById(
    "formSubmit",
  );

const formSuccess =
  document.getElementById(
    "formSuccess",
  );

contactForm.addEventListener(
  "submit",
  async (e) => {

    e.preventDefault();

    const fname =
      document
        .getElementById(
          "fname",
        )
        .value
        .trim();

    const email =
      document
        .getElementById(
          "femail",
        )
        .value
        .trim();

    const msg =
      document
        .getElementById(
          "fmessage",
        )
        .value
        .trim();

    if (
      !fname ||
      !email ||
      !msg
    ) {

      alert(
        "Please fill in your name, email and message.",
      );

      return;
    }

    formSubmit.textContent =
      "Sending...";

    const formData =
      new FormData(
        contactForm,
      );

    try {

      const response =
        await fetch(
          contactForm.action,
          {
            method:
              "POST",

            body:
              formData,

            headers: {
              Accept:
                "application/json",
            },
          },
        );

      if (
        response.ok
      ) {

        formSubmit.textContent =
          "Sent Successfully";

        formSuccess.style.display =
          "block";

        contactForm.reset();

        setTimeout(
          () => {

            formSuccess.style.display =
              "none";

            formSubmit.textContent =
              "Send Message →";

          },
          5000,
        );

      } else {

        alert(
          "Failed to send message.",
        );

        formSubmit.textContent =
          "Send Message →";
      }

    } catch (
      error
    ) {

      alert(
        "Something went wrong.",
      );

      formSubmit.textContent =
        "Send Message →";
    }

  },
);