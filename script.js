const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const targetElement = document.getElementById("clickAnimation");

let interval = null;

targetElement.addEventListener("mouseover", (event) => {
  let iteration = 0;

  clearInterval(interval);

  interval = setInterval(() => {
    const currentValue = targetElement.dataset.value;
    if (!currentValue) return;

    targetElement.innerText = currentValue
      .split("")
      .map((letter, index) => {
        if (index < iteration) {
          return letter;
        }

        return letters[Math.floor(Math.random() * letters.length)];
      })
      .join("");

    if (iteration >= currentValue.length) {
      clearInterval(interval);
    }

    iteration += 1 / 3;
  }, 50);
});
let tl = gsap.timeline();

function valueSetters() {
  gsap.set("#nav a", { y: "-100%", opacity: 0 });
  gsap.set("#home .parent .child", { y: "100%" });
}

function revealToSpan() {
  document.querySelectorAll(".reveal").forEach(function (elem) {
    let parent = document.createElement("span");
    let child = document.createElement("span");

    parent.classList.add("parent");
    child.classList.add("child");

    child.innerHTML = elem.innerHTML;
    parent.appendChild(child);
    elem.innerHTML = "";
    elem.appendChild(parent);
  });
}

function addZero(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

function calcTime(offset) {
  let d = new Date();
  let utc = d.getTime() + d.getTimezoneOffset() * 60000;
  let nd = new Date(utc + 3600000 * offset);
  return nd.getHours() + ":" + addZero(nd.getMinutes());
}

(() => {
  document.querySelectorAll(".js-year").forEach((elm) => {
    elm.innerHTML = "©" + new Date().getFullYear();
  });
  document.querySelectorAll(".js-time")[0].innerHTML = calcTime(+5.5);
  // document.querySelectorAll(".js-time")[1].innerHTML = calcTime(+5.5);
})();

setInterval(() => {
  let time = document.querySelectorAll(".js-time");
  for (let x of time) {
    x.innerHTML = calcTime(+5.5);
  }
}, 60000);

function loaderAnimation() {
  tl.from("#loader .child span", {
    x: 100,
    delay: 1,
    stagger: 0.15,
    duration: 1,
    ease: Power3.easeInOut,
  })
    .to("#loader .parent .child", {
      y: "-100%",
      duration: 0.5,
      ease: Circ.easeInOut,
    })
    .to("#loader", {
      height: 0,
      duration: 1,
      ease: Circ.easeInOut,
    })
    .to("#green", {
      height: "100%",
      top: 0,
      duration: 1,
      delay: -0.8,
      ease: Circ.easeInOut,
    })
    .to("#green", {
      height: "0%",
      duration: 1,
      delay: -0.5,
      ease: Circ.easeInOut,
      onComplete: function () {
        animateHomePage();
      },
    });
}

function animateHomePage() {
  var tl = gsap.timeline();
  tl.to("#nav a", {
    y: 0,
    opacity: 1,
    stagger: 0.05,
    ease: Expo.easeInOut,
  }).to("#home .parent .child", {
    y: 0,
    stagger: 0.1,
    duration: 1,
    ease: Expo.easeInOut,
  });
}

function locoInitialize() {
  const scroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });
}

revealToSpan();
valueSetters();
loaderAnimation();
locoInitialize();
