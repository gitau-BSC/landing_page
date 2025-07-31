document.addEventListener('DOMContentLoaded', function () {
    // Reusable close modal function
    function closeModal(modalElement) {
        if (modalElement) {
            modalElement.style.display = 'none';
            document.body.style.overflow = 'auto';
        } else {
            console.error('Modal element not found for closing');
        }
    }
// Hamburger Menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
const links = document.querySelectorAll('#nav-links a');
const pages = document.querySelectorAll('.page');

if (hamburger && navLinks) {
  // Toggle mobile menu
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('show');
    hamburger.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('show') ? 'hidden' : '';
  });

  // Handle each nav link click
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();

      // Get target section ID
      const targetId = link.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);

      // Show only target section (if using .page and .active)
      pages.forEach(p => p.classList.remove('active'));
      if (targetSection) targetSection.classList.add('active');

      // Update active link styling
      links.forEach(l => l.classList.remove('active'));
      link.classList.add('active');

    if (targetId !== 'home') {
        const targetSection = document.getElementById(targetId);
       if (targetSection) {
          targetSection.classList.add('active');
        }
      }

      // Close mobile menu
      navLinks.classList.remove('show');
      hamburger.classList.remove('open');
      document.body.style.overflow = '';

      // Scroll to section (in case it's visible)
      if (targetSection) targetSection.scrollIntoView({ behavior: 'smooth' });
    });
  });
} else {
  console.error('Missing elements:', {
    hamburger: !!hamburger,
    navLinks: !!navLinks
  });
}


    // About section
    // Alert for contact
 const contactBtn = document.getElementById('alert-contact-btn');

if (contactBtn) {
  contactBtn.addEventListener('click', function (e) {
    e.preventDefault();
    alert('Call us at: +254 712 345 678');
  });
}
  // About Discover Toggle
    const discoverBtn = document.getElementById('discover-btn');
    const extraInfo = document.getElementById('extra-info');

    if (discoverBtn && extraInfo) {
      discoverBtn.addEventListener('click', function (e) {
        e.preventDefault();
      const isShown = extraInfo.classList.toggle('show');
      discoverBtn.textContent = isShown ? 'Show Less' : 'Discover More';
      if (isShown) {
        extraInfo.scrollIntoView({ behavior: 'smooth', block: 'nearest'});
      }
    });
}

    // Years Counter Animation
    const yearsElement = document.querySelector('.years');
    const experienceBadge = document.querySelector('.experience-badge');
    if (yearsElement && experienceBadge) {
        console.log('Initializing years counter');
        const target = 20;
        const duration = 2000;
        let startTime = null;

        const animateCounter = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            yearsElement.textContent = Math.floor(progress * target);
            if (progress < 1) {
                requestAnimationFrame(animateCounter);
            } else {
                yearsElement.textContent = target + '+';
            }
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    console.log('Years counter visible, starting animation');
                    requestAnimationFrame(animateCounter);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        observer.observe(experienceBadge);
    } else {
        console.error('Years counter elements missing:', { yearsElement, experienceBadge });
    }
    
    // Feature-cards
       const cards = document.querySelectorAll('.feature-card');

    cards.forEach(card => {
      card.addEventListener('click', () => {
        const details = card.querySelector('.card-details');
        if (details) {
          const isVisible = getComputedStyle(details).display === 'block';
          // Close all others
          document.querySelectorAll('.card-details').forEach(p => p.style.display = 'none');
          // Toggle this one
          details.style.display = isVisible ? 'none' : 'block';
        }
      });
    });

    // Team Modal
    const teamBios = {
        "George Karanja": {
            image: "Assets/person-1.jpg",
            position: "Advisor-Travels@Buupass",
            bio: "George has over 10 years experience in travel logistics..."
        },
        "Emily Akasa": {
            image: "Assets/person-2.jpg",
            position: "Coordinator-Travels@Buupass",
            bio: "Emily specializes in route optimization and customer relations..."
        },
        "Jacob Suleiman": {
            image: "Assets/man.jpg",
            position: "Attendant-Travels@Buupass",
            bio: "Jacob handles on-ground operations and client support..."
        },
        "Bridget Muthoni": {
            image: "Assets/woman.jpg",
            position: "Personal trainer@Buupass",
            bio: "Bridget ensures all staff are properly trained in safety protocols..."
        }
    };

    const modal = document.getElementById('memberModal');
    const modalImg = document.getElementById('modalImage');
    const modalName = document.getElementById('modalName');
    const modalPosition = document.getElementById('modalPosition');
    const modalBio = document.getElementById('modalBio');
    const closeBtn = document.querySelector('.close-modal');

   if (modal && modalImg && modalName && modalPosition && modalBio && closeBtn) {
    document.querySelectorAll('.team-card').forEach(card => {
        card.addEventListener('click', function () {
            const memberName = this.querySelector('h3').textContent.trim();
            const memberData = teamBios[memberName];

            if (!memberData) {
                alert('Team member information not available');
                return;
            }

            modalImg.src = memberData.image;
            modalImg.alt = memberName;
            modalName.textContent = memberName;
            modalPosition.textContent = memberData.position;
            modalBio.innerHTML = `<p>${memberData.bio}</p>`;
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden'; 
        });
    });

    function closeModal(modal) {
    modal.style.display = 'none';
    document.body.style.overflow = ''; 
    }

    closeBtn.addEventListener('click', () => closeModal(modal));
    window.addEventListener('click', (e) => {
        if (e.target === modal) closeModal(modal);
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModal(modal);
        }
    });
} else {
    console.error('Modal elements missing');
}

    // Contact Form Modal
    const contactModal = document.getElementById('contactModal');
    const contactForm = document.getElementById('contactForm');
    const contactCloseBtn = document.querySelector('#contactModal .close-modal');
    const contactButtons = document.querySelectorAll('#contact-btn,#modal-contact-btn');

    if (contactModal && contactForm && contactCloseBtn && contactButtons.length > 0) {
        console.log('Initializing contact form modal', { contactButtons: contactButtons.length });
        contactButtons.forEach(btn => {
            btn.addEventListener('click', function (e) {
                e.preventDefault();
                console.log('Contact button clicked:', btn.id);
                contactModal.style.display = 'block';
                document.body.style.overflow = 'hidden';
                // Force form field visibility
            //     const formFields = contactForm.querySelectorAll('input, textarea');
            //     // formFields.forEach(field => {
            //     //     field.style.display = 'block';
            //     //     field.style.visibility = 'visible';
            //     //     field.style.opacity = '1';
            //     //     console.log(`Ensured visibility for field: ${field.id}`);
            //     // });
            //     // Focus on first input
            //     document.getElementById('name')?.focus();
            });
        });

        contactCloseBtn.addEventListener('click', () => closeModal(contactModal));
        window.addEventListener('click', (e) => {
            if (e.target === contactModal) {
                closeModal(contactModal);
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && window.getComputedStyle(contactModal).display === 'block') {
                closeModal(contactModal);
            }
        });

        contactForm.addEventListener('submit', async function (e) {
            e.preventDefault();
            const formData = {
                name: document.getElementById('name')?.value || '',
                email: document.getElementById('email')?.value || '',
                message: document.getElementById('message')?.value || ''
            };

            if (!formData.name || !formData.email || !formData.message) {
                alert('Please fill in all required fields.');
                return;
            }

            try {
                console.log('Submitting form:', formData);
                const response = await fetch('https://reqres.in/api/users', { // Mock API for testing
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                });

                if (response.ok) {
                    alert('Thank you for your message! We will contact you soon.');
                    contactForm.reset();
                    closeModal(contactModal);
                } else {
                    const errorData = await response.json();
                    alert(`Error submitting form: ${errorData.message || 'Please try again.'}`);
                }
            } catch (error) {
                console.error('Form submission error:', error);
                alert('An error occurred. Please try again later.');
            }
        });
    } else {
        console.error('Contact form elements missing:', { contactModal, contactForm, contactCloseBtn, contactButtons: contactButtons.length });
    }
});