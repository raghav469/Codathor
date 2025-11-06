// Main application logic
document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
    });
    // Add this to your main.js file
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
const headings = [
        "Shape Tomorrow with Logic & Lightning",
        "Code the Storm. Command the Future.",
        "Unleash Innovation with Power & Precision",
        "Craft the Future in Lines of Code and Roars of Thunder",
        "Build with Brains. Strike with Power."
    ];
    
    let currentHeading = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100; // milliseconds between characters
    
    function typeWriter() {
        const element = document.getElementById("typewriter-heading");
        const currentText = headings[currentHeading];
        
        if (isDeleting) {
            // Deleting text
            element.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; // Faster when deleting
        } else {
            // Adding text
            element.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 40;
        }
        
        // When text is fully typed
        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            typingSpeed = 1500; // Pause at end of sentence
        } 
        // When text is fully deleted
        else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            currentHeading = (currentHeading + 1) % headings.length; // Loop through headings
            typingSpeed = 500; // Pause before next heading
        }
        
        setTimeout(typeWriter, typingSpeed);
    }
    
    // Start the typewriter effect when page loads
    window.onload = function() {
        setTimeout(typeWriter, 1000); // Initial delay
    };
    // Close mobile menu when clicking a link
    document.querySelectorAll('.mobile-menu a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
        });
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    
    // Navbar background on scroll
    window.addEventListener('scroll', function() {
        const nav = document.querySelector('nav');
        if (window.scrollY > 50) {
            nav.style.background = 'rgba(15, 15, 35, 0.95)';
        } else {
            nav.style.background = 'rgba(15, 15, 35, 0.9)';
        }
    });
    
    // Check if user is logged in
    checkAuthStatus();
});

// Check authentication status
function checkAuthStatus() {
    const token = localStorage.getItem('token');
    if (token) {
        // User is logged in
        document.getElementById('login-btn').style.display = 'none';
        document.getElementById('register-btn').style.display = 'none';
        document.getElementById('profile-btn').style.display = 'inline-block';
        document.getElementById('logout-btn').style.display = 'inline-block';
        
        document.getElementById('mobile-login-btn').style.display = 'none';
        document.getElementById('mobile-register-btn').style.display = 'none';
        document.getElementById('mobile-profile-btn').style.display = 'block';
        document.getElementById('mobile-logout-btn').style.display = 'block';
    } else {
        // User is not logged in
        document.getElementById('login-btn').style.display = 'inline-block';
        document.getElementById('register-btn').style.display = 'inline-block';
        document.getElementById('profile-btn').style.display = 'none';
        document.getElementById('logout-btn').style.display = 'none';
        
        document.getElementById('mobile-login-btn').style.display = 'block';
        document.getElementById('mobile-register-btn').style.display = 'block';
        document.getElementById('mobile-profile-btn').style.display = 'none';
        document.getElementById('mobile-logout-btn').style.display = 'none';
    }
}

 var words = document.getElementsByClassName('word');
var wordArray = [];
var currentWord = 0;

words[currentWord].style.opacity = 1;
for (var i = 0; i < words.length; i++) {
  splitLetters(words[i]);
}

function changeWord() {
  var cw = wordArray[currentWord];
  var nw = currentWord == words.length-1 ? wordArray[0] : wordArray[currentWord+1];
  for (var i = 0; i < cw.length; i++) {
    animateLetterOut(cw, i);
  }
  
  for (var i = 0; i < nw.length; i++) {
    nw[i].className = 'letter behind';
    nw[0].parentElement.style.opacity = 1;
    animateLetterIn(nw, i);
  }
  
  currentWord = (currentWord == wordArray.length-1) ? 0 : currentWord+1;
}

function animateLetterOut(cw, i) {
  setTimeout(function() {
    cw[i].className = 'letter out';
  }, i*80);
}

function animateLetterIn(nw, i) {
  setTimeout(function() {
    nw[i].className = 'letter in';
  }, 340+(i*80));
}

function splitLetters(word) {
  var content = word.innerHTML;
  word.innerHTML = '';
  var letters = [];
  for (var i = 0; i < content.length; i++) {
    var letter = document.createElement('span');
    letter.className = 'letter';
    letter.innerHTML = content.charAt(i);
    word.appendChild(letter);
    letters.push(letter);
  }
  
  wordArray.push(letters);
}

changeWord();
setInterval(changeWord, 4000);


/// addition
// Function to load new.html content without page reload
async function loadLearnPage(event) {
    event.preventDefault();
    
    try {
        // Fetch the new.html content
        const response = await fetch('new.html');
        const htmlContent = await response.text();
        
        // Replace entire document content
        document.open();
        document.write(htmlContent);
        document.close();
        
        // Update URL without reload
        history.pushState({page: 'learn'}, 'Learn to Code', 'new.html');
        
        // Scroll to home section after content loads
        setTimeout(() => {
            const homeSection = document.getElementById('home');
            if (homeSection) {
                window.scrollTo({
                    top: homeSection.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        }, 100); // Small delay to ensure DOM is ready
        
    } catch (error) {
        console.error('Error loading page:', error);
        // Fallback to normal navigation
        window.location.href = 'new.html';
    }
}

// Handle browser back/forward buttons
window.addEventListener('popstate', (event) => {
    if (event.state && event.state.page === 'learn') {
        loadLearnPage(event);
    } else {
        location.reload();
    }
});