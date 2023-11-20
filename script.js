//<-- Function to check if an element is in the viewport that is on screen -->

// checks whether a given HTML element is currently within the viewport of the browser window.
function isElementInViewport(el) {
    var rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
    //If all these conditions are true, the function returns true, 
    //indicating that the element is in the viewport. Otherwise, it returns false.
}

//<--End of Function to check if an element is in the viewport that is on screen -->



//<--Below Code is for opening and closing Sidebar using toogle button present in navbar-->

function toggleMenu() {
    if (window.innerWidth <= 768) {
        const offcanvas = document.getElementById('offcanvas');
        offcanvas.style.right = offcanvas.style.right === '0px' ? '-340px' : '0px';
    } else {
        const offcanvas = document.getElementById('offcanvas');
        offcanvas.style.right = offcanvas.style.right === '0px' ? '-300px' : '0px';
    }
}

//<-- End of Sidebar Code -->



//<-- Below Code is for Scroll and hover when click in an item of sidebar -->
//We are passing the id of div to below function
function scrollAndHover(sectionId) {

    //First we will close the sidebar
    toggleOffcanvas();

    //When we scroll some content of div was hiding behind the navbar so to fix this 
    //we will add some margin on top of scroll 
    var navbarHeight = 60; // This is height of my navabar

    //Now will target the div 
    var section = document.getElementById(sectionId);

    // Check if the section element exists
    if (section) {
        //Below code will scroll to that div passed in our function
        window.scrollTo({
            //this will add some margin on top when we scroll to that div
            top: section.offsetTop - navbarHeight,
            //It should scroll smoothly
            behavior: 'smooth'
        });

        //Below code will remove added hover effect if any div has hover effect
        document.querySelectorAll('.active').forEach(function (el) {
            el.classList.remove('active');
        });

        // Add 'active' class to the clicked section after a delay
        //so that the div will hover when we scroll to that div
        setTimeout(function () {
            //we are adding .active class to the div i have written css code for hover 
            //.active resembles that if .active is present hover effect will apply else not
            section.classList.add('active');

            //We dont want hover to be fixed everytime so
            // Remove 'active' class after another delay 
            //this will remove hover effect for that div after 3 seconds
            setTimeout(function () {
                section.classList.remove('active');
            }, 3000); // Adjust the delay as needed for removehover
        }, 1000); // Adjust the delay as needed
    } else {
        console.error('Section element not found');
    }
}

//Below Function is to Close the sidemenu when we click on item of sidebar
function toggleOffcanvas() {
    var offcanvas = document.getElementById('offcanvas');
    var currentRight = parseInt(getComputedStyle(offcanvas).right);

    // If the current right value is -340px, set it to 0; otherwise, set it to -340px
    offcanvas.style.right = (currentRight === 0) ? '-340px' : '0';
}

//<-- End of code for scroll and hover from click of sidebar-->



//<-- Code of one animation Bio in mobile interface -->

//On Scroll we will call below function so that animation could be added
document.addEventListener('scroll', handleScroll2);

function handleScroll2() {
    // Check if the screen width is less than 768 pixels (adjust as needed)
    if (window.innerWidth <= 768) {
        //we will target the bio div
        var certificatesDivs = document.querySelector('.item3');

        //We will add this item3animate class to div so that it will animate when we will scroll
        //Animations of item3animate is already defined in css
        certificatesDivs.classList.add('item3animate');
    }
}

// <-- End of Code of one animation Bio in mobile interface -->



//<-- Script for one time animation Skills div  LHS .skillitem3 in mobile interface -->

// Function to handle the scroll event
function handleScroll() {
    // Check if the screen width is less than 768 pixels (adjust as needed)
    if (window.innerWidth <= 768) {
        //There are multiple div with class .skillitem3 we want to add 
        //animation to all of them so will target all
        var certificatesDivs = document.querySelectorAll('.skillitem3');

        //we will run in loop for each .skillitem3
        certificatesDivs.forEach(function (certificatesDiv) {
            //In if condition(isElementInViewport(certificatesDiv)) we will check if the
            // targeted div is visible on screen or not
            //True or False it means apply animation only if the div is visible on screen
            if (isElementInViewport(certificatesDiv)) {
                //We are adding a class to the div animation for this class is already
                //defined in css
                certificatesDiv.classList.add('skillitem3animate');
            }
        });
    }
}

//OnScroll We are calling the handleScroll function
document.addEventListener('scroll', handleScroll);

//We also want animation to be applied on refresh of page for that we will call the function on refresh
document.addEventListener('DOMContentLoaded', handleScroll);

//<-- End of one time animation Skills div  LHS .skillitem3 in mobile interface -->



//<-- Script for one time animation Skills div  RHS .skillitem4 in mobile interface -->

//This code works as same as LHS 
function handleScroll1() {
    // Check if the screen width is less than 768 pixels (adjust as needed)
    if (window.innerWidth <= 768) {
        var certificatesDivs = document.querySelectorAll('.skillitem4');

        certificatesDivs.forEach(function (certificatesDiv) {
            if (isElementInViewport(certificatesDiv)) {
                certificatesDiv.classList.add('skillitem4animate');
            }
        });
    }
}
document.addEventListener('scroll', handleScroll1);
document.addEventListener('DOMContentLoaded', handleScroll1);

//<-- End one time animation Skills div  RHS .skillitem4 in mobile interface -->



//<-- Below Code is For Education Slide and dots below it -->

// This variable represents the index of the currently displayed education slide
let slideIndex = 0; // Initial value refers to the first div (High School)
let autoSlideTimeout;

// Function called on click of < or > buttons to navigate slides (1 for forwards, -1 for backwards)

function plusSlides(n) {
    // Clear the timeout for automated slide transitions
    clearTimeout(autoSlideTimeout);

    // Increment the slideIndex to move forward or backward
    // Call the function to display the targeted div
    showSlides(slideIndex += n);
}

// Function for navigating to a specific slide when a dot is clicked
function currentSlide(n) {
    // Clear the timeout for automated slide transitions
    clearTimeout(autoSlideTimeout);

    // Call the function to display the targeted div based on dot click
    showSlides(slideIndex = n - 1);
}

// Function to display the education slides
function showSlides(n) {
    let i;
    // Target all education divs
    let slides = document.getElementsByClassName("mySlides");
    // Target the dots representing each education slide
    let dots = document.getElementsByClassName("dot");

    // If a specific index is provided, set the slideIndex accordingly
    if (n != undefined) {
        slideIndex = n;
    }

    // Reset to the first div after reaching the last one
    if (slideIndex >= slides.length) { slideIndex = 0; }

    // If the index is less than 0, set it to the last slide
    if (slideIndex < 0) { slideIndex = slides.length - 1; }

    // Hide all education divs
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    // Remove the "active" class from all dots
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }

    // Display the current education slide
    slides[slideIndex].style.display = "block";

    // Add the "active" class to the corresponding dot
    dots[slideIndex].className += " active";

    // Note: Adding or removing the "active" class triggers CSS changes (defined in the CSS file)

    // Auto slide every 7 seconds (7000 milliseconds)
    autoSlideTimeout = setTimeout(function () {
        plusSlides(1);
    }, 7000);
}

//<-- End of Code For Education Slide and dots below it -->




//<-- Below Code is for Sliding Certificates -->

// This variable is used to represent the index of the currently displayed certificate
let currentIndex = 0;

// This constant stores the total number of certificates
const totalSlides = document.querySelectorAll('.custom-slide').length;

// This function is called on the click of the navigation buttons (< or >)
// It takes a direction parameter (1 for forward, -1 for backward)
function changeSlide(direction) {
    // Target the parent container of all certificates
    const slidesContainer = document.querySelector('.custom-carousel');

    // Check if moving forward and at the second last or last certificate
    if (direction === 1 && currentIndex >= totalSlides - 2) {
        // Disable the next (>) button
        document.querySelector('.next').disabled = true;
    } else {
        // Enable the next button
        document.querySelector('.next').disabled = false;

        // Increment or decrement the current certificate index based on the direction
        currentIndex += direction;

        // Ensure that the currentIndex is within valid bounds
        if (currentIndex < 0) {
            currentIndex = 0;
        } else if (currentIndex >= totalSlides - 1) {
            currentIndex = totalSlides - 1;
        }

        // Calculate the translation value for the sliding effect
        // Mobile interface: translateX = -currentIndex * 100%
        // Desktop interface: translateX = -currentIndex * 50%
        const translateValue = window.innerWidth <= 768 ? -currentIndex * 100 + '%' : -currentIndex * 50 + '%';

        // Apply the translation to the parent container to move it horizontally
        slidesContainer.style.transform = 'translateX(' + translateValue + ')';
    }

    // Enable or disable the previous (<) button based on the currentIndex
    document.querySelector('.prev').disabled = currentIndex <= 0;
}

//<-- End of Sliding Certificates Code-->



//<-- Below Code is for dots present below certificate Slides-->

// Function to change the color of dots in pairs in sequence
function changeDotColors() {
    // Retrieve all elements with the class "dots"
    var dots = document.getElementsByClassName("dots");
    
    // Initialize the index variable for tracking pairs
    var i = 0;

    // Change the color of each pair in sequence
    var intervalId = setInterval(function () {
        // Set the background color of the current dot to grey
        dots[i].style.backgroundColor = "grey";
        
        // Set the background color of the next dot in the pair to grey (if it exists)
        dots[i + 1] && (dots[i + 1].style.backgroundColor = "grey");

        // Move to the next pair
        i += 2;

        // Check if all pairs have been processed
        if (i >= dots.length) {
            // Reset all dot colors to white after a delay of 3 seconds
            setTimeout(function () {
                for (var j = 0; j < dots.length; j++) {
                    dots[j].style.backgroundColor = "white";
                }
            }, 3000);

            // Clear the interval to stop the color-changing process
            clearInterval(intervalId);
        }
    }, 3000);
}

//<-- End of Code for dots present below certificate Slides-->




//<-- Below code is for one-time animation of grid certificates, such as rotating certificates
// and slowly popping up soft skills and known languages. -->

// Function to handle the scroll event and add animation class
function handleScrollAnimation(elementClass, animationClass) {
    // Select the HTML element with the specified class
    var element = document.querySelector(elementClass);

    // Check if the element is currently in the viewport
    if (isElementInViewport(element)) {
        // Add the specified animation class to trigger the animation
        element.classList.add(animationClass);
        
        // Remove the event listener after the animation is triggered to avoid unnecessary checks
        document.removeEventListener('scroll', handleScrollAnimation);
    }
}

// Attach the handleScrollAnimation function to the scroll event for each item
document.addEventListener('scroll', function () {
    // Apply animation for the first grid item
    handleScrollAnimation('.citem1', 'citem1animate');
    
    // Apply animation for the second grid item
    handleScrollAnimation('.citem2', 'citem2animate');
    
    // Apply animation for the third grid item
    handleScrollAnimation('.citem3', 'citem3animate');
});

//<-- End of code for the one-time animation of grid certificates-->




// JavaScript for the custom carousel modal

// Execute the following code when the DOM content is fully loaded
document.addEventListener("DOMContentLoaded", function () {
    // Get references to the carousel modal and its elements
    var carouselModal = document.getElementById("carouselModal");
    var carouselModalImage = document.getElementById("carouselModalImage");
    
    // Get all image links with the class "image-popup"
    var carouselImageLinks = document.querySelectorAll(".image-popup");

    // Add a click event listener to each image link in order to open the modal
    carouselImageLinks.forEach(function (imageLink) {
        imageLink.addEventListener("click", function () {
            // Display the modal and set its image source to the clicked image
            carouselModal.style.display = "block";
            carouselModalImage.src = this.src;
        });
    });

    // Get the close button element within the modal
    var carouselClose = document.querySelector(".close-modal");

    // Add a click event listener to the close button to hide the modal
    carouselClose.addEventListener("click", function () {
        carouselModal.style.display = "none";
    });

    // Set an interval to automatically change slides of certificates every 4 seconds 
    setInterval(function () {
        // Calculate the direction of the slide change based on the current index
        const reverseDirection = currentIndex >= totalSlides - 2 ? -(totalSlides - 2) : 1;
        
        // Call the changeSlide function with the calculated direction
        changeSlide(reverseDirection);
    }, 4000);

    // Start the auto-slide of education div data on page load
    showSlides();

    // Call the changeDotColors function to initiate the color change of dots of Certificate
    changeDotColors();

    // Set an interval to repeat the color change every 6 seconds (3 seconds for each group) of Certificate
    setInterval(changeDotColors, 6000);

    // Apply animations to specific grid items on scroll
    handleScrollAnimation('.citem1', 'citem1animate'); //Certificates
    handleScrollAnimation('.citem2', 'citem2animate'); //Soft Skills
    handleScrollAnimation('.citem3', 'citem3animate'); //Known Languages
});


