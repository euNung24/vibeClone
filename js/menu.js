const wrapper = document.querySelector(".wrapper");
const menuBtn = document.querySelector(".menu_toggle");
const closeBtn = document.querySelector(".close_btn");
const navigation = document.querySelector(".navigation");

menuBtn.addEventListener("click", () => {
  navigation.classList.add("open");
  wrapper.style.overflow = "hidden";
});
closeBtn.addEventListener("click", () => {
  navigation.classList.remove("open");
  wrapper.style.overflow = "scroll";
});
