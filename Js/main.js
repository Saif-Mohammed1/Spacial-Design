let Landing = document.querySelector(".landing-page"),
  RandomPic = ["01.jpeg", "02.jpeg", "03.jpeg", "04.jpg", "05.jpg"],
  SettingBox = document.querySelector(".setting-box"),
  OptionBox = document.querySelector(".option-box"),
  ul = document.createElement("ul"),
  OptionColor = [
    "red",
    "blue",
    "black",
    "#00bcd4",
    "green",
    "#ff8f00",
    "#512da8",
    "#c2185b",
  ];

ul.className = "colors";

//   Change background dynamic
let backgroundOption, ChangeBackground;

if (
  window.sessionStorage.getItem("BackgroundOption") &&
  window.sessionStorage.getItem("BackgroundOption") == "true"
) {
  document.querySelector(".background-option .yes").classList.add("active");
  backgroundOption = window.sessionStorage.getItem("BackgroundOption");
} else {
  document.querySelector(".background-option .no").classList.add("active");
  backgroundOption = window.sessionStorage.getItem("BackgroundOption");
}
backgroundChanging();
function backgroundChanging() {
  if (backgroundOption === "true") {
    ChangeBackground = setInterval(() => {
      let RandomNum = Math.floor(Math.random() * RandomPic.length);
      Landing.style.cssText = `background-image: url("./Imgs/${RandomPic[RandomNum]}");`;
    }, 7000);
  } else {
    clearInterval(ChangeBackground);
  }
}

document.querySelector(".toggle-setting").addEventListener("click", () => {
  SettingBox.classList.toggle("open");
  document.querySelector(".fa-cog ").classList.toggle("fa-spin");
});

OptionColor.forEach((color) => {
  let li = document.createElement("li");
  li.style.cssText = `background-color:${color}`;
  li.setAttribute("data-color", color);

  ul.appendChild(li);
});
OptionBox.appendChild(ul);

let liList = document.querySelectorAll(".colors li");

liList.forEach((li) => {
  li.addEventListener("click", ChangeColor);
});
if (window.sessionStorage.getItem("Theme-color")) {
  liList.forEach((li) => {
    li.classList.remove("active");
  });
  document.documentElement.style.setProperty(
    "--main-color",
    window.sessionStorage.getItem("Theme-color")
  );
  document
    .querySelector(
      `[data-color="${window.sessionStorage.getItem("Theme-color")}"]`
    )
    .classList.add("active");
} else {
  window.sessionStorage["Theme-color"] = getComputedStyle(document.body)
    .getPropertyValue("--main-color")
    .trim();
  document
    .querySelector(
      `[data-color="${window.sessionStorage.getItem("Theme-color")}"]`
    )
    .classList.add("active");
}

function ChangeColor(event) {
  let Current = event.target;

  liList.forEach((li) => {
    li.classList.remove("active");
  });

  Current.classList.add("active");
  if (Current.getAttribute("data-color")) {
    document.documentElement.style.setProperty(
      "--main-color",
      Current.getAttribute("data-color")
    );
    window.sessionStorage.setItem(
      "Theme-color",
      document.documentElement.style.getPropertyValue("--main-color")
    );
  }
}

// Button to stop change background

let button = document.querySelectorAll(".background-option button");

button.forEach((but) => {
  but.addEventListener("click", Click);
});

function Click(event) {
  button.forEach((but) => {
    but.classList.remove("active");
  });
  event.target.classList.add("active");
  if (event.target.getAttribute("data-option") == "yes") {
    backgroundOption = "true";
  } else {
    backgroundOption = "false";
  }
  window.sessionStorage.setItem("BackgroundOption", backgroundOption);
  backgroundChanging();
}
// Progress

let ProgressWidth = [40, 50, 70, 80, 100],
  skillsBox = document.querySelectorAll(
    ".container .skill-box .skill-progress span"
  ),
  OurSkills = document.querySelector(".skills");
window.addEventListener("scroll", () => {
  let skillsOffSetTop = OurSkills.offsetTop,
    skillsOuterHeight = OurSkills.offsetHeight,
    windowHeight = this.innerHeight,
    windowScrollTop = this.pageYOffset;
  if (
    windowScrollTop >
    skillsOffSetTop + skillsOuterHeight - windowHeight - 100
  ) {
    skillsBox.forEach((skill, index) => {
      skill.style.width = `${ProgressWidth[index]}%`;
    });
  }
});

// create popup img

let AllImgs = document.querySelectorAll(".gallery img");

AllImgs.forEach((img) => {
  img.addEventListener("click", () => {
    // create overlay
    let overlay = document.createElement("div");
    overlay.className = "overlay";
    document.body.appendChild(overlay);

    let ImgBox = document.createElement("div");
    ImgBox.className = "overlay-box";
    let OverlayImg = document.createElement("img");
    OverlayImg.className = "overlay-img";
    OverlayImg.src = img.src;
    // Delete button
    let But = document.createElement("button");
    But.className = "del";
    But.innerHTML = "X";
    But.addEventListener("click", () => {
      overlay.remove();
      But.parentElement.remove();
    });
    if (img.alt !== "") {
      let header = document.createElement("h3");
      header.innerHTML = img.alt;
      ImgBox.prepend(header);
      ImgBox.style.height = "66%";
      But.style.cssText = `top: 0;
    right: 0;`;
    }
    ImgBox.append(OverlayImg, But);
    document.body.appendChild(ImgBox);
  });
});

// Nav Option

let Navbutton = document.querySelectorAll(".show-nav button"),
  navContainer = document.querySelector(".nav-bullets");

if (window.sessionStorage.getItem("Show-Nav")) {
  if (window.sessionStorage.getItem("Show-Nav") == "show") {
    navContainer.style.display = "flex";
    document
      .querySelector(
        `[data-option=${window.sessionStorage.getItem("Show-Nav")}]`
      )
      .classList.add("active");
  } else {
    navContainer.style.display = "none";
    document.querySelector(`[data-option='hide']`).classList.add("active");
  }
} else {
  navContainer.style.display = "none";
  document.querySelector(`[data-option='hide']`).classList.add("active");
}

Navbutton.forEach((but) => {
  but.addEventListener("click", ShowNav);
});

function ShowNav(event) {
  Navbutton.forEach((but) => {
    but.classList.remove("active");
  });
  event.target.classList.add("active");
  if (event.target.getAttribute("data-option") == "show") {
    navContainer.style.display = "flex";
  } else {
    navContainer.style.display = "none";
  }
  window.sessionStorage.setItem(
    "Show-Nav",
    event.target.getAttribute("data-option")
  );
}
const indicators = document.querySelectorAll(".bullets"),
  sections = document.querySelectorAll("section"),
  allLinks = document.querySelectorAll(".links li a");
if (window.sessionStorage.getItem("Section")) {
  let BulletArea = document.querySelector(
    `[data-section='${window.sessionStorage.getItem("Section")}']`
  );
  BulletArea.classList.add("show", "active");
  // it doesn't work
  BulletArea.scrollIntoView({
    behavior: "smooth",
  });
} else {
  window.scroll({ top: 0, left: 0, behavior: "smooth" });
}

const resetCurrentActiveIndicator = () => {
  const activeIndicator = document.querySelector(".bullets.active");
  if (activeIndicator !== null) {
    activeIndicator.classList.remove("active", "show");
  }
};

const onSectionLeavesViewport = (section) => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          resetCurrentActiveIndicator();
          const element = entry.target;
          const indicator = document.querySelector(
            `div[data-section='.${element.className}']`
          );
          indicator.classList.add("active", "show");
          return;
        }
      });
    },
    {
      root: null,
      rootMargin: "0px",
      threshold: 0.4,
    }
  );
  observer.observe(section);
};

indicators.forEach((indicator) => {
  indicator.addEventListener("click", function (event) {
    event.preventDefault();
    document
      .querySelector(this.getAttribute("data-section"))
      .scrollIntoView({ behavior: "smooth" });
    resetCurrentActiveIndicator();
    this.classList.add("active", "show");
    window.sessionStorage.setItem("Section", this.getAttribute("data-section"));
  });
});

sections.forEach(onSectionLeavesViewport);

function Scrolling(element) {
  element.forEach((bullet) => {
    bullet.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}

Scrolling(allLinks);

document.querySelector(".setting-box .rest").addEventListener("click", () => {
  sessionStorage.clear();
  window.location.reload();
});
let toggleMenu = document.querySelector(".toggle-menu"),
  Links = document.querySelector(".links");
toggleMenu.addEventListener("click", (e) => {
  e.stopPropagation();
  toggleMenu.classList.toggle("open");
  Links.classList.toggle("open");
});
Links.addEventListener("click", (e) => {
  e.stopPropagation();
});
document.addEventListener("click", (e) => {
  if (e.target !== toggleMenu && e.target !== Links) {
    if (toggleMenu.classList.contains("open")) {
      toggleMenu.classList.remove("open");
      Links.classList.remove("open");
    }
  }
});

document.querySelector("[type='submit']").addEventListener("click", (e) => {
  e.preventDefault();
});
