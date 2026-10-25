
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
