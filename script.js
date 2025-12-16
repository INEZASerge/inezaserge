// Theme Toggle
function toggleTheme() {
    const body = document.body;
    const themeText = document.getElementById('themeText');
    const currentTheme = body.getAttribute('data-theme');
    
    if (currentTheme === 'dark') {
        body.setAttribute('data-theme', 'light');
        themeText.textContent = 'Light Mode';
    } else {
        body.setAttribute('data-theme', 'dark');
        themeText.textContent = 'Dark Mode';
    }
}

// DNA Animation
function createDNA() {
    const strand = document.getElementById('dnaStrand');
    const pairs = 20;
    
    for (let i = 0; i < pairs; i++) {
        const pair = document.createElement('div');
        pair.className = 'dna-pair';
        pair.style.top = `${i * 20}px`;
        pair.style.animation = `rotateDNA 4s linear infinite ${i * 0.1}s`;
        
        pair.innerHTML = `
            <div class="dna-base"></div>
            <div class="dna-connector"></div>
            <div class="dna-base"></div>
        `;
        
        strand.appendChild(pair);
    }
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rotateDNA {
            0% { transform: rotateZ(0deg) translateX(0); }
            50% { transform: rotateZ(180deg) translateX(20px); }
            100% { transform: rotateZ(360deg) translateX(0); }
        }
    `;
    document.head.appendChild(style);
}

// Animated Grid with floating lines
function createAnimatedGrid() {
    const container = document.getElementById('animatedGrid');
    const horizontalLines = 6;
    const verticalLines = 6;
    
    // Create horizontal lines
    for (let i = 0; i < horizontalLines; i++) {
        const line = document.createElement('div');
        line.className = 'grid-line horizontal';
        line.style.top = `${(i * 80)}px`;
        line.style.animationDelay = `${i * 0.3}s`;
        container.appendChild(line);
    }
    
    // Create vertical lines
    for (let i = 0; i < verticalLines; i++) {
        const line = document.createElement('div');
        line.className = 'grid-line vertical';
        line.style.left = `${(i * 80)}px`;
        line.style.animationDelay = `${i * 0.3}s`;
        container.appendChild(line);
    }
}

// Hamburger Menu
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Form Submission
document.querySelector('.submit-btn').addEventListener('click', function(e) {
    e.preventDefault();
    alert('Thank you for your message! I will get back to you soon.');
});

// Initialize animations
createDNA();
createAnimatedGrid();

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const nav = document.querySelector('nav');
    if (window.scrollY > 100) {
        nav.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.2)';
    } else {
        nav.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.1)';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe sections for scroll animations
document.querySelectorAll('.service-card, .project-card, .testimonial-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
});



// Initialize EmailJS with your Public Key
(function() {
    emailjs.init("TtPcr0-dNLXacOpgP"); // Replace with your actual public key
})();

document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.contact-form');
    const submitBtn = form.querySelector('.submit-btn');
    
    submitBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Get form values
        const firstName = form.querySelectorAll('input[type="text"]')[0].value;
        const lastName = form.querySelectorAll('input[type="text"]')[1].value;
        const email = form.querySelector('input[type="email"]').value;
        const subject = form.querySelectorAll('input[type="text"]')[2].value;
        const message = form.querySelector('textarea').value;
        
        // Validate fields
        if (!firstName || !lastName || !email || !subject || !message) {
            alert('Please fill in all fields');
            return;
        }
        
        // Disable button and show loading state
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
        
        // Prepare template parameters
        const templateParams = {
            from_name: `${firstName} ${lastName}`,
            from_email: email,
            subject: subject,
            message: message
        };
        
        // Send email using EmailJS
        emailjs.send('service_w2uggsc', 'template_x0be0su', templateParams)
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                alert('Message sent successfully!');
                
                // Clear form
                form.querySelectorAll('input, textarea').forEach(input => input.value = '');
                
                // Re-enable button
                submitBtn.disabled = false;
                submitBtn.textContent = 'Send Message';
            }, function(error) {
                console.log('FAILED...', error);
                alert('Failed to send message. Please try again.');
                
                // Re-enable button
                submitBtn.disabled = false;
                submitBtn.textContent = 'Send Message';
            });
    });
});