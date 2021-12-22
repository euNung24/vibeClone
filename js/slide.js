const slides = document.querySelectorAll(".slide");
function slideMoveLeft(e) {
  const bubble = e.composedPath();
  const prevBtn = bubble.filter((el) =>
    el.tagName === "BUTTON" ? el : null
  )[0];
  const slide = prevBtn.parentElement;
  const slideRect = slide.getBoundingClientRect();
  const slideRectLeft = slideRect.left;

  const slideList = slide.querySelector("ul");

  let move = 0;
  const imgRightArr = [];
  const firstImg = slideList.firstElementChild;
  const firstImgRect = firstImg.getBoundingClientRect();
  const firstImgRight = firstImgRect.right;
  const firstImgLeft = firstImgRect.left;

  const imgs = slideList.querySelectorAll(".list_item");

  imgs.forEach((img) => imgRightArr.push(img.getBoundingClientRect().right));
  const filterArr = imgRightArr.filter(
    (el) => el > slideRect.left && el < slideRect.right
  );

  if (firstImgRight < slideRectLeft) {
    console.log(2, firstImgLeft, firstImgRight, firstImg);
    move = slideRect.width - filterArr[0];

    if (move >= -firstImgLeft) {
      console.log(3);
      move = -firstImgLeft + slideRectLeft;
      console.log(move);
    }
  } else {
    move = -firstImgLeft + 20;
  }

  if (slideList.style.transform === "") {
    slideList.style.transform = `translateX(${move}px)`;
  } else {
    const transformStyle = slideList.style.transform;
    slideList.style.transform = transformStyle + `translateX(${move}px)`;
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
  const slideRect = slide.getBoundingClientRect();
  const slideRectRight = slideRect.right;
  const slideList = slide.querySelector("ul");

  let move = 0;
  const imgLeftArr = [];
  const lastImg = slideList.lastElementChild;
  const lastImgRect = lastImg.getBoundingClientRect();
  const lastImgRight = lastImgRect.right;
  const lastImgLeft = lastImgRect.left;
  const imgs = slideList.querySelectorAll(".list_item");

  imgs.forEach((img) => imgLeftArr.push(img.getBoundingClientRect().left));
  const filterArr = imgLeftArr.filter((el) => el < slideRectRight);

  if (lastImgLeft > slideRectRight) {
    console.log(2);
    move = filterArr[filterArr.length - 1];
    if (lastImgLeft - move <= slideRectRight) {
      move = lastImgRight - slideRectRight;
    }
  } else {
    console.log(1);
    move = lastImgRight - slideRectRight + 20;
  }

  if (slideList.style.transform === "") {
    slideList.style.transform = `translateX(${-move}px)`;
  } else {
    const transformStyle = slideList.style.transform;
    slideList.style.transform = transformStyle + `translateX(${-move}px)`;
  }

  setTimeout(() => {
    showButtons();
  }, 500);
}

function showButtons() {
  slides.forEach((slide) => {
    const imgs = slide.querySelectorAll(".item_img");
    const slideRect = slide.getBoundingClientRect();

    // 이전 버튼
    const firstImgRect = imgs[0].getBoundingClientRect();
    const firstImgLeft = firstImgRect.left;
    const prevBtn = slide.querySelector(".prev_btn");
    const halfImgHeight = firstImgRect.height / 2;
    const slideLeft = slideRect.left;
    if (Math.ceil(firstImgLeft) < slideLeft) {
      prevBtn.style.display = "block";
    } else {
      prevBtn.style.display = "none";
    }

    const prevBtnHeight = prevBtn.getBoundingClientRect().height;
    const halfPrevBtn = prevBtnHeight / 2;
    prevBtn.style.transform = `translateY(${halfImgHeight - halfPrevBtn}px)`;

    // 다음 버튼
    const lastImgRect = imgs[imgs.length - 1].getBoundingClientRect();
    const lastImgRight = lastImgRect.right;
    const slideRight = slideRect.right;
    const nextBtn = slide.querySelector(".next_btn");

    if (Math.floor(lastImgRight) > slideRight) {
      nextBtn.style.display = "block";
    } else {
      nextBtn.style.display = "none";
    }
    const nextBtnHeight = nextBtn.getBoundingClientRect().height;
    const halfNextBtn = nextBtnHeight / 2;
    nextBtn.style.transform = `translateY(${halfImgHeight - halfNextBtn}px)`;
  });
}

showButtons();
const prevBtns = document.querySelectorAll(".prev_btn");
const nextBtns = document.querySelectorAll(".next_btn");

prevBtns.forEach((btn) => btn.addEventListener("click", slideMoveLeft));
nextBtns.forEach((btn) => btn.addEventListener("click", slideMoveRight));
window.addEventListener("resize", showButtons);
