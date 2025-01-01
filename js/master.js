// Check If there's a color in local storage
let mainColor = localStorage.getItem("color");
let localOption = localStorage.getItem("backGround Random");
let bgImage = localStorage.getItem("backgImage")
let bulStat = localStorage.getItem("optionBullets")
let intevalId;
// List of background images
const bgs = [
    "assets/01.jpg",
    "assets/02.jpg",
    "assets/03.jpg",
    "assets/04.jpg",
    "assets/06.png",
    "assets/05.jpg",
    "assets/07.jpg",
    "assets/08.jpg",
    "assets/09.jpg",
    "assets/10.jpg",
];

// Selectting elements
const wholePage = document.querySelector(".whole-page")
const settingIcon = document.querySelector("i");
const iconCont = document.querySelector(".set");
const settingBar = document.querySelector(".settings");
const landPage = document.querySelector(".landing-page");
const colorLi = document.querySelectorAll(".settings ul li");
const optLi = document.querySelectorAll(".settings .box.bg .option span");
const menu = document.querySelector(".burger");
const menuUl = document.querySelector(".landing-page .header .menu-items");
const skillProg = document.querySelectorAll(".skills .hold-progress span")
const skills = document.querySelector(".skills")
const galleryImages = document.querySelectorAll(".gallery .images-box img")
const nav = document.querySelector(".nav");
const optbul = document.querySelectorAll(".settings .box.bull .option span");
// Functions

function setRandomBackground() {
    let randomNum = Math.floor(Math.random() * bgs.length);
    landPage.style.backgroundImage = `url(${bgs[randomNum]})`;
}

function toggleActiveClass(elements, target) {
    elements.forEach((el) => {
        el.classList.remove("active");
    });
    target.classList.add("active")
}

// Get color from local storage
if (mainColor !== null) {
    document.documentElement.style.setProperty("--main-color", mainColor);


    // move the active class
    document.querySelectorAll(".colors li").forEach((el) => {
        el.classList.remove("active");
        if (el.dataset.color === mainColor) {
            el.classList.add("active");
        }
    });
};

// Get background image from local storage

if (bgImage !== null) {
    landPage.style.backgroundImage = bgImage;
}

// Get landing bg state from local storage
if (localOption === "yes") {
    toggleActiveClass(optLi, document.querySelector(".settings .bg .option span.yes"));

    setInterval(() => {
        setRandomBackground();
    }, 1000);
} else if (localOption === "no") {
    clearInterval(intevalId);
    toggleActiveClass(optLi, document.querySelector(".settings .bg .option span.no"));
}

// Get bullets state from local storage
if (bulStat === "yes") {
    toggleActiveClass(optbul, document.querySelector(".settings .box.bull .option span.yes"))
    nav.style.display = "flex";
} else {
    toggleActiveClass(optbul, document.querySelector(".settings .box.bull .option span.no"))
    nav.style.display = "none";
}


// menu show list

menu.addEventListener("click", () => {
    menuUl.classList.toggle("show")
})

// Open And Close Settings Bar
iconCont.onclick = () => {
    settingBar.classList.toggle("open");
    settingIcon.classList.toggle("fa-spin");

};
// close settings bar if i click any where outside it
wholePage.onclick = () => {
    if (settingBar.classList.contains("open")) {
        settingBar.classList.remove("open");
        settingIcon.classList.remove("fa-spin");
    }

}


// Changing main color
colorLi.forEach((e) => {
    e.addEventListener("click", (e) => {
        let colorValue = e.target.dataset.color;
        document.documentElement.style.setProperty("--main-color", colorValue);
        // Save it to local Storage
        localStorage.setItem("color", colorValue);

        // move the active class
        toggleActiveClass(colorLi, e.target)

    })
});



// Handle Option background Logic
optLi.forEach((option) => {
    option.addEventListener("click", () => {
        // move the active class
        toggleActiveClass(optLi, option);
        // set or clear the interval
        if (option.classList.contains("yes")) {
            // clear any interval
            clearInterval(intevalId)
            // Set the new interval
            intevalId = setInterval(() => {
                    setRandomBackground()
            }, 1000);
            // Save To Local Storage
            localStorage.setItem("backGround Random", "yes");

        } else {
            clearInterval(intevalId);
            localStorage.setItem("backGround Random", "no");
            let img = getComputedStyle(landPage).getPropertyValue("background-image");
            localStorage.setItem("backgImage", img)
        }
        
    })
    
});

// Handle Option background Logic
optbul.forEach(option => {
    option.addEventListener("click", () => {
        toggleActiveClass(optbul, option);

        if (option.classList.contains("no")) {
            nav.style.display = "none"
            localStorage.setItem("optionBullets", "no")
        } else {
            nav.style.display = "flex"
            localStorage.setItem("optionBullets", "yes")
        }
    })
})




window.onscroll = () => {

    // Skills Offset Top (the top height of the skills section)
    let skillsOffsetTop = skills.offsetTop;

    // Skills Section's height (offsetHeight)
    let skillsHeight = skills.offsetHeight;
    
    // Window Height
    let windowHeight = this.innerHeight;
    
    
    // Window Scroll Height
    let windowScrollingHeight = this.scrollY;

    
    // this condition to know when you reach the top of the window when you rech the target section (skills)
    if (windowScrollingHeight > (skillsOffsetTop + skillsHeight - windowHeight)) {
        skillProg.forEach(el => {
            // Dynamically show the progress
            let prog = el.dataset.progress;
            el.style.width = prog;
            el.textContent = prog;

            // Needs more work
            // el.textContent = 0;
            // const intervalId = setInterval(() => {
            //     if (el.textContent < +prog.slice(0, -1)) {
            //         el.textContent++;
            //     } else {
            //         clearInterval(intervalId);
            //     }
            // }, 30)
        })
    }
}

galleryImages.forEach(img => {
    img.addEventListener("click", (e) => {

        
        let overlay = document.createElement("div");
        
        overlay.className = "popup-overlay";
        
        document.body.appendChild(overlay);
        
        let popupBox = document.createElement("div");

        popupBox.className = "image-holder";

        let header = document.createElement("h3");
        header.textContent = img.getAttribute("alt") || "undefinde";

        popupBox.appendChild(header);

        let theImage = document.createElement("img");
        theImage.src = e.target.src

        popupBox.appendChild(theImage);

        overlay.appendChild(popupBox);

        let closeButton = document.createElement("span");

        closeButton.textContent = "X";

        closeButton.className = "close-button";

        popupBox.appendChild(closeButton);
        
    });
});

document.addEventListener("click", (e) => {
    if (e.target.className === "close-button") {

        document.querySelector(".popup-overlay").remove()
    }
});





