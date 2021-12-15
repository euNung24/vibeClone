const slides = document.querySelectorAll(".slide");
function slideMoveLeft(e) {
  const bubble = e.composedPath();
  const prevBtn = bubble.filter((el) =>
    el.tagName === "BUTTON" ? el : null
  )[0];
  const slide = prevBtn.parentElement;
  const slideList = slide.querySelector("ul");
  const slideRect = slide.getBoundingClientRect();
  const slideRectWidth = slideRect.width;

  if (slideList.style.transform === "") {
    slideList.style.transform = `translateX(${slideRectWidth}px)`;
  } else {
    const transformStyle = slideList.style.transform;
    slideList.style.transform =
      transformStyle + `translateX(${slideRectWidth}px)`;
  }

  setTimeout(() => {
    showButtons();
  }, 500);
}

function slideMoveRight(e) {
  const bubble = e.composedPath();
  const nextBtn = bubble.filter((el) =>
    el.tagName === "BUTTON" ? el : null
  )[0];
  const slide = nextBtn.parentElement;
  const slideList = slide.querySelector("ul");
  const slideRect = slide.getBoundingClientRect();
  const slideRectWidth = slideRect.width;

  const slideLi = slideList.querySelectorAll(".list_item");
  const rect = slideLi[0].getBoundingClientRect().width;
  let sum = 0;
  for (let i = 0; i < slideLi.length; i++) {
    if (sum < slideRectWidth) {
      sum += rect;
    } else if (sum >= slideRectWidth) {
      sum = rect;
    }
  }

  console.log("sum:" + sum, "slideRectWidth:" + slideRectWidth, slideRect);

  if (slideList.style.transform === "") {
    slideList.style.transform = `translateX(${-sum}px)`;
  } else {
    const transformStyle = slideList.style.transform;
    slideList.style.transform = transformStyle + `translateX(${-sum}px)`;
  }

  setTimeout(() => {
    showButtons();
  }, 500);
}

function showButtons() {
  slides.forEach((slide) => {
    const imgs = slide.querySelectorAll(".item_img");
    const ulEl = slide.querySelector('ul[class$="list"]');
    const slideRect = ulEl.getBoundingClientRect();

    // 이전 버튼
    const firstImgRect = imgs[0].getBoundingClientRect();
    const firstImgLeft = firstImgRect.left;
    // const slideLeft = slideRect.left;
    const prevBtn = slide.querySelector(".prev_btn");

    const halfImgHeight = firstImgRect.height / 2;
    const prevBtnHeight = prevBtn.getBoundingClientRect().height;
    const halfPrevBtn = prevBtnHeight / 2;
    prevBtn.style.transform = `translateY(${halfImgHeight - halfPrevBtn}px)`;

    if (firstImgLeft < 0) {
      prevBtn.style.display = "block";
    } else {
      prevBtn.style.display = "none";
    }

    // 다음 버튼
    const lastImgRect = imgs[imgs.length - 1].getBoundingClientRect();
    const lastImgRight = lastImgRect.right;
    const slideRight = slideRect.right;
    const nextBtn = slide.querySelector(".next_btn");
    const nextBtnHeight = nextBtn.getBoundingClientRect().height;
    const halfNextBtn = nextBtnHeight / 2;
    nextBtn.style.transform = `translateY(${halfImgHeight - halfNextBtn}px)`;

    if (lastImgRight > slideRight) {
      nextBtn.style.display = "block";
    } else {
      prevBtn.style.display = "none";
    }
    // console.log(firstImgLeft);
  });
}

showButtons();
const prevBtns = document.querySelectorAll(".prev_btn");
const nextBtns = document.querySelectorAll(".next_btn");

prevBtns.forEach((btn) => btn.addEventListener("click", slideMoveLeft));
nextBtns.forEach((btn) => btn.addEventListener("click", slideMoveRight));
