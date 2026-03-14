// ------------------------------------------------------------------------------------ //
//  -----------  Request 1: Responsive Navigation with Hamburger Menu ------------------ //
// ------------------------------------------------------------------------------------ //
// here we just check if the menutoggle is showing 
// and then we listen for a click on that menu to show the links in the menu or hide them
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
if (menuToggle && navLinks){ // in case the page doesn't have them or menutoggle is not showing
    menuToggle.addEventListener("click", function (){
        navLinks.classList.toggle("show");
    }
    );
}
// ------------------------------------------------------------------------------------ //
//  -------------- Request 2: Form Validation with Error Messages --------------------- //
// ------------------------------------------------------------------------------------ //
// 1- we listen for a submission 
// 2- we check if the fields are valid
// 3- if not we display the error msgs 
// 4- we listen for user input so we can clear the error msg of a specific filed when the user starts writing in that field 
// 5- if all fields are valid we display a success msg 
const contactForm = document.querySelector(".contact-form");

if (contactForm) {
    // we get all the input fields
    const nameInput = document.querySelector("#name");
    const emailInput = document.querySelector("#email");
    const serviceInput = document.querySelector("#service");
    const detailsInput = document.querySelector("#details");
    const successMessage = document.querySelector("#success-message");
    // we get all the error msgs
    const nameError = nameInput.nextElementSibling;
    const emailError = emailInput.nextElementSibling;
    const serviceError = serviceInput.nextElementSibling;
    const detailsError = detailsInput.nextElementSibling;

    function clearErrors() {
        nameError.textContent = "";
        emailError.textContent = "";
        serviceError.textContent = "";
        detailsError.textContent = "";
        successMessage.textContent = "";
    }

    contactForm.addEventListener("submit", function (event) {
        // we clear the error msgs first 
        clearErrors();
        let hasError = false;
        // we get the input fileds values 
        const nameValue = nameInput.value.trim();
        const emailValue = emailInput.value.trim();
        const serviceValue = serviceInput.value;
        const detailsValue = detailsInput.value.trim();
        // check the input filed values for errors
        if (nameValue === "") {
            nameError.textContent = "Please enter your name.";
            hasError = true;
        }

        if (!emailValue.includes("@") || !emailValue.includes(".")) {
            emailError.textContent = "Please enter a valid email address.";
            hasError = true;
        }

        if (serviceValue === "") {
            serviceError.textContent = "Please select a service.";
            hasError = true;
        }

        if (detailsValue.length < 10) {
            detailsError.textContent = "Project details must be at least 10 characters.";
            hasError = true;
        }
        // if we found an error we prevent submission
        if (hasError) {
            event.preventDefault();
            return;
        }

        event.preventDefault();
        successMessage.textContent = "Thanks! We'll get back to you soon.";
        contactForm.reset();
    }
    );
    // here we are just listening for input to clear the error msgs 
    nameInput.addEventListener("input", function () {
        nameError.textContent = "";
        successMessage.textContent = "";
    }
    );

    emailInput.addEventListener("input", function () {
        emailError.textContent = "";
        successMessage.textContent = "";
    }
    );

    serviceInput.addEventListener("change", function () {
        serviceError.textContent = "";
        successMessage.textContent = "";
    }
    );

    detailsInput.addEventListener("input", function () {
        detailsError.textContent = "";
        successMessage.textContent = "";
    }
    );
}

// ------------------------------------------------------------------------------------ //
//  ------------------------  Request 3: Back to Top Button --------------------------- //
// ------------------------------------------------------------------------------------ //
// 1- we need to detect scrolling on the window 
// 2- if scrolling is more than 300 thn we show the button 
// 3- if less than 300 we hide the button 
// 4- when we click the button the page will scroll to the top smoothly
const backToTopBtn = document.querySelector("#backToTop");
if (backToTopBtn){   // when this runs on a page that doesn't have a back to top button it crashes so i need to add this condition  
    window.addEventListener("scroll", function(){   // we listen for scrolling 
        backToTopBtn.classList.toggle("visible", window.scrollY > 300);
    });
    backToTopBtn.addEventListener("click", function(){ // we listen for a click 
        window.scrollTo({
             top: 0 , 
             behavior:"smooth"
        });
    });
}

// ------------------------------------------------------------------------------------ //
//  ---------------- Request 4 : Dynamic Content Rendering from Data -----------------  //
// ------------------------------------------------------------------------------------ //
// 1- we built a array literal to store the old projects 
// 2- each element in the array is an object literal with all the project informaiton 
// 3- we get the empty grid form our home page 
// 4- we use a function that takes a list of project to render them on the home page
const projects = [  
    {
        title: "(Two Fold Grove) Animated TV Series Pitch",
        description: "Pitch for an animated series about a high school girl and her friends.",
        category: "Animation",
        image: "images/portfolio_1.png"
    },
    {
        title: "(Syrian Courtyard) 3D Model",
        description: "A 3D model of a Syrian courtyard done in MagicaVoxel.",
        category: "3D Environment",
        image: "images/portfolio_2.png"
    },
    {
        title: "(Twitch Stream Intro) 2D Animated Loop",
        description: "Animated loop for a Twitch stream intro.",
        category: "Animation",
        image: "images/portfolio_3.png"
    },
    {
        title: "(Blurry Eyes) Illustrated Movie Poster",
        description: "An illustrated movie poster project.",
        category: "Illustration",
        image: "images/portfolio_4.png"
    },
    {
        title: "(Halloween Badges) Badge Design",
        description: "A Halloween badge set design.",
        category: "Graphic Design",
        image: "images/portfolio_5.png"
    },
    {
        title: "(Alchemy Delights) Brand Identity",
        description: "Brand identity design for a health bar brand called Alchemy Delights.",
        category: "Branding",
        image: "images/portfolio_6.png"
    }
];

// get empty grid 
const workGrid = document.querySelector(".work-grid");
// function to render a project list 
function renderProjects(projectList){
    if (!workGrid){
        return;
    }
    workGrid.innerHTML = "";
    for (const project of projectList){
        workGrid.innerHTML += 
            `<article class="work-card">
                <img src="${project.image}" alt="${project.title}">
                <h3>${project.title}</h3>
                <p class="work-category">${project.category}</p>
                <p>${project.description}</p>
            </article>`;
    }
}

if (workGrid) {
    renderProjects(projects);
}
// ------------------------------------------------------------------------------------ //
//  -------------------- Request 6: Live Filtering or Search -------------------------  //
// ------------------------------------------------------------------------------------ //
// 1- we get all the filter buttons 
// 2- we listen for a click on each button
// 3- we read the categroy of the button 
// 4- update the active button 
// 5- use the render function to render the filtered list 
const filterButtons = document.querySelectorAll(".filter-btn");
for (const button of filterButtons)
{
    button.addEventListener("click", function () 
    {
        const selectedCategory = button.dataset.category;
        // updating the active style 
        for (const btn of filterButtons) {
            btn.classList.remove("active");
        }
        button.classList.add("active");
        // deciding what to render 
        if (selectedCategory === "All") {
            renderProjects(projects);
        }
        else 
        {
            // AI assisted :  the filtering function 
            const filteredProjects = projects.filter(function (project) {
                return project.category === selectedCategory;
            }
            );
            renderProjects(filteredProjects);
        }
    }
    );
}