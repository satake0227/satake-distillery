
const intro = document.querySelector(".intro");
const contents = document.querySelectorAll(".intro-content");

function updateIntro() {
  if (!intro || contents.length === 0) return;

  const rect = intro.getBoundingClientRect();
  const scrollable = intro.offsetHeight - window.innerHeight;

  if (scrollable <= 0) return;

  const progress = Math.max(
    0,
    Math.min(1, -rect.top / scrollable)
  );

  const index = Math.min(
    contents.length - 1,
    Math.floor(progress * contents.length)
  );

  contents.forEach((content, i) => {
    content.classList.toggle("is-active", i === index);
  });
}

window.addEventListener("scroll", updateIntro);
window.addEventListener("resize", updateIntro);
updateIntro();

// ページTOPボタン
const pageTop = document.querySelector(".page-top");
const footer = document.querySelector("footer");

if (pageTop) {
  const updatePageTop = () => {
    const show = window.scrollY > 300;

    pageTop.classList.toggle("is-visible", show);

    if (footer) {
      const footerRect = footer.getBoundingClientRect();
      const buttonRect = pageTop.getBoundingClientRect();

      const overlapsFooter =
        buttonRect.bottom > footerRect.top &&
        buttonRect.top < footerRect.bottom &&
        buttonRect.right > footerRect.left &&
        buttonRect.left < footerRect.right;

      pageTop.classList.toggle(
        "is-footer",
        show && overlapsFooter
      );
    }
  };

  window.addEventListener("scroll", updatePageTop);
  window.addEventListener("resize", updatePageTop);
  updatePageTop();
}


/* 🟢 スマホメニューの開閉 */
const hamburger = document.querySelector(".hamburger-menu");
const nav = document.querySelector(".header-inner nav");
const headerInner = document.querySelector(".header-inner");

function closeMenu() {
  if (!nav || !hamburger) return;

  nav.classList.remove("is-open");
  hamburger.setAttribute("aria-expanded", "false");
  hamburger.setAttribute("aria-label", "メニューを開く");
  hamburger.innerHTML = "<span></span><span></span><span></span>";
}

if (hamburger && nav && headerInner) {
  hamburger.addEventListener("click", (event) => {
    // 🟢 ボタンのクリック処理
    event.stopPropagation();

    const isOpen = nav.classList.toggle("is-open");

    hamburger.setAttribute("aria-expanded", String(isOpen));
    hamburger.setAttribute(
      "aria-label",
      isOpen ? "メニューを閉じる" : "メニューを開く"
    );

    hamburger.innerHTML = isOpen
      ? '<span class="close-mark">×</span>'
      : "<span></span><span></span><span></span>";
  });

  // 🟢 メニュー外をタップしたら閉じる
  document.addEventListener("click", (event) => {
    if (
      nav.classList.contains("is-open") &&
      !headerInner.contains(event.target)
    ) {
      closeMenu();
    }
  });

  // 🟢 ドロップダウンの開閉
  document.querySelectorAll(".nav-dropdown > a").forEach((link) => {
    link.addEventListener("click", (event) => {
      if (window.innerWidth <= 800) {
        event.preventDefault();
        event.stopPropagation();

        link.parentElement.classList.toggle("is-open");
      }
    });
  });
}


/* 🟢 ローディング画面 */
// window.addEventListener("load", () => {
//   const loading = document.querySelector("#loading");

//   if (!loading) return;

//   setTimeout(() => {
//     loading.classList.add("is-hidden");
//   }, 1000);
// });
