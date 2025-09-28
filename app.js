const LINKS = {
  kofi: "https://ko-fi.com/DEDHARE",
  facebook: "https://facebook.com/DEDHARE_PAGE",
  messenger: "https://m.me/DEDHARE_PAGE",
  instagram: "https://instagram.com/DEDHARE",
  tiktok: "https://tiktok.com/@DEDHARE",
  email: "mailto:riegardner0@gmail.com",
  phone: "tel:+639504293383"
};

const externalHosts = ["kofi", "facebook", "messenger", "instagram", "tiktok"];

function applyLinks() {
  document.querySelectorAll("[data-link]").forEach((el) => {
    const key = el.dataset.link;
    if (!key || !LINKS[key]) return;
    el.setAttribute("href", LINKS[key]);
    if (externalHosts.includes(key)) {
      el.setAttribute("target", "_blank");
      el.setAttribute("rel", "noopener");
    }
  });
}

function setupReturnButtons() {
  document.querySelectorAll("[data-return]").forEach((btn) => {
    btn.addEventListener("click", (event) => {
      event.preventDefault();
      window.location.href = "index.html";
    });
  });
}

function setupDrawer() {
  const trigger = document.querySelector("[data-drawer-toggle]");
  const drawer = document.querySelector("[data-drawer]");
  if (!trigger || !drawer) return;

  const closeBtn = drawer.querySelector("[data-drawer-close]");

  const setOpen = (isOpen) => {
    drawer.classList.toggle("is-open", isOpen);
    trigger.setAttribute("aria-expanded", String(isOpen));
    document.body.classList.toggle("lock-scroll", isOpen);
    if (isOpen) {
      drawer.focus();
    }
  };

  trigger.addEventListener("click", () => {
    const isOpen = drawer.classList.contains("is-open");
    setOpen(!isOpen);
  });

  closeBtn?.addEventListener("click", () => setOpen(false));

  drawer.addEventListener("click", (event) => {
    if (event.target === drawer) {
      setOpen(false);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setOpen(false);
    }
  });
}

function setupHeaderShadow() {
  const header = document.querySelector(".header");
  if (!header) return;

  const onScroll = () => {
    if (window.scrollY > 10) {
      header.classList.add("is-scrolled");
    } else {
      header.classList.remove("is-scrolled");
    }
  };

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

function setupModals() {
  const openers = document.querySelectorAll("[data-modal-target]");
  const modals = document.querySelectorAll(".modal");

  const closeModal = (modal) => {
    modal.classList.remove("is-open");
    document.body.classList.remove("lock-scroll");
  };

  openers.forEach((opener) => {
    opener.addEventListener("click", (event) => {
      event.preventDefault();
      const targetId = opener.dataset.modalTarget;
      const modal = document.getElementById(targetId);
      if (!modal) return;
      modal.classList.add("is-open");
      document.body.classList.add("lock-scroll");
      modal.querySelector("[data-modal-close]")?.focus();
    });
  });

  modals.forEach((modal) => {
    modal.addEventListener("click", (event) => {
      if (event.target === modal) {
        closeModal(modal);
      }
    });
    modal.querySelectorAll("[data-modal-close]").forEach((btn) => {
      btn.addEventListener("click", (event) => {
        event.preventDefault();
        closeModal(modal);
      });
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      modals.forEach((modal) => closeModal(modal));
    }
  });
}

function setupForm() {
  const form = document.querySelector("[data-contact-form]");
  if (!form) return;

  const toast = document.querySelector("[data-toast]");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");

    if (!name || !email || !message) {
      alert("Please fill in name, email, and message before submitting.");
      return;
    }

    form.reset();
    if (toast) {
      toast.classList.add("is-visible");
      setTimeout(() => toast.classList.remove("is-visible"), 4000);
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  applyLinks();
  setupReturnButtons();
  setupDrawer();
  setupHeaderShadow();
  setupModals();
  setupForm();
});
