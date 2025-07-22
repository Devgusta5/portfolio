// Navbar functionality
const navbar = document.getElementById("navbar")
const navToggle = document.getElementById("nav-toggle")
const navMenu = document.getElementById("nav-menu")

// Mobile menu toggle
navToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active")
  navToggle.classList.toggle("active")
})

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active")
    navToggle.classList.remove("active")
  })
})

// Navbar scroll effect
window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    navbar.classList.add("scrolled")
  } else {
    navbar.classList.remove("scrolled")
  }
})

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Typing animation for hero section
const typingText = document.querySelector(".typing-text")
const text = "Olá, eu sou"
let index = 0

function typeWriter() {
  if (index < text.length) {
    typingText.textContent = text.slice(0, index + 1)
    index++
    setTimeout(typeWriter, 100)
  }
}

// Start typing animation when page loads
window.addEventListener("load", () => {
  setTimeout(typeWriter, 1000)
})

// Scroll reveal animation
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active")
    }
  })
}, observerOptions)

// Observe all elements with reveal class
document.querySelectorAll(".reveal").forEach((el) => {
  observer.observe(el)
})

// Parallax effect for hero section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const heroVisual = document.querySelector(".hero-visual")
  if (heroVisual) {
    heroVisual.style.transform = `translateY(${scrolled * 0.3}px)`
  }
})

// Add hover effect to project cards
document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-10px) scale(1.02)"
  })

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)"
  })
})

// Dynamic background particles (optional enhancement)
function createParticle() {
  const particle = document.createElement("div")
  particle.className = "particle"
  particle.style.cssText = `
        position: fixed;
        width: 2px;
        height: 2px;
        background: var(--accent-blue);
        border-radius: 50%;
        pointer-events: none;
        opacity: 0.5;
        z-index: -1;
    `

  particle.style.left = Math.random() * window.innerWidth + "px"
  particle.style.top = window.innerHeight + "px"

  document.body.appendChild(particle)

  const animation = particle.animate(
    [
      { transform: "translateY(0px)", opacity: 0.5 },
      { transform: `translateY(-${window.innerHeight + 100}px)`, opacity: 0 },
    ],
    {
      duration: Math.random() * 3000 + 2000,
      easing: "linear",
    },
  )

  animation.onfinish = () => particle.remove()
}

// Create particles periodically
setInterval(createParticle, 300)

// Add loading animation
window.addEventListener("load", () => {
  document.body.classList.add("loaded")
})

// Performance optimization: Throttle scroll events
let ticking = false
const timelineItems = document.querySelectorAll(".timeline-item")

function updateScrollEffects() {
  // Update navbar
  if (window.scrollY > 100) {
    navbar.classList.add("scrolled")
  } else {
    navbar.classList.remove("scrolled")
  }

  // Update parallax
  const scrolled = window.pageYOffset
  const heroVisual = document.querySelector(".hero-visual")
  if (heroVisual) {
    heroVisual.style.transform = `translateY(${scrolled * 0.3}px)`
  }

  // Update nav button
  updateNavButton()

  // Add stagger animation to timeline items
  timelineItems.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.2}s`
  })

  ticking = false
}

function requestScrollUpdate() {
  if (!ticking) {
    requestAnimationFrame(updateScrollEffects)
    ticking = true
  }
}

window.addEventListener("scroll", requestScrollUpdate)

// Add active state to navigation based on scroll position
const sections = document.querySelectorAll("section[id]")
const navLinks = document.querySelectorAll(".nav-link")

window.addEventListener("scroll", () => {
  let current = ""
  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.clientHeight
    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute("id")
    }
  })

  navLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active")
    }
  })
})

// Add CSS for active nav link
const style = document.createElement("style")
style.textContent = `
    .nav-link.active {
        color: var(--accent-blue) !important;
    }
    .nav-link.active::after {
        width: 100% !important;
    }
    .loaded {
        opacity: 1;
    }
    body {
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    .particle {
        animation: float 3s ease-in-out infinite;
    }
    @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-20px); }
    }
`
document.head.appendChild(style)

// Add click tracking for repository buttons
document.querySelectorAll(".btn-repo").forEach((button) => {
  button.addEventListener("click", function (e) {
    // Add click animation
    this.style.transform = "translateY(-2px) scale(0.98)"
    setTimeout(() => {
      this.style.transform = "translateY(-2px) scale(1)"
    }, 150)

    // Optional: Add analytics tracking here
    console.log("Repository button clicked:", this.href)
  })
})

// Add loading state for repository buttons
document.querySelectorAll(".btn-repo").forEach((button) => {
  button.addEventListener("mousedown", function () {
    this.style.opacity = "0.8"
  })

  button.addEventListener("mouseup", function () {
    this.style.opacity = "1"
  })

  button.addEventListener("mouseleave", function () {
    this.style.opacity = "1"
    this.style.transform = "translateY(0)"
  })
})

// Navegação entre primeiro e último projeto
const projectNavButton = document.getElementById("project-nav-button")
const navButton = projectNavButton.querySelector(".btn-nav")
const navText = navButton.querySelector(".nav-text")
const projectsSection = document.getElementById("projects")
const firstProject = timelineItems[timelineItems.length - 1] // O primeiro projeto é o último na lista
const lastProject = timelineItems[0] // O último projeto é o primeiro na lista

// Função para verificar a posição do scroll e atualizar o botão
function updateNavButton() {
  const projectsSectionTop = projectsSection.offsetTop
  const projectsSectionBottom = projectsSectionTop + projectsSection.offsetHeight - window.innerHeight
  const scrollPosition = window.scrollY

  // Se estiver próximo ao topo da seção de projetos
  if (scrollPosition < projectsSectionTop + 300) {
    navText.textContent = "Veja meu primeiro projeto"
    navButton.classList.remove("up")
    navButton.setAttribute("data-target", "first")
  }
  // Se estiver próximo ao final da seção de projetos
  else if (scrollPosition > projectsSectionBottom - 300) {
    navText.textContent = "Veja meu projeto mais recente"
    navButton.classList.add("up")
    navButton.setAttribute("data-target", "last")
  }
}

// Adicionar evento de clique ao botão
navButton.addEventListener("click", function () {
  const target = this.getAttribute("data-target")

  if (target === "first") {
    // Scroll para o primeiro projeto (último na lista)
    firstProject.scrollIntoView({ behavior: "smooth", block: "center" })
  } else {
    // Scroll para o último projeto (primeiro na lista)
    lastProject.scrollIntoView({ behavior: "smooth", block: "center" })
  }
})

// Verificar posição inicial e adicionar efeito de pulso para chamar atenção
window.addEventListener("load", () => {
  updateNavButton()
  navButton.classList.add("pulse")

  // Remover efeito de pulso após alguns segundos
  setTimeout(() => {
    navButton.classList.remove("pulse")
  }, 5000)
})

// Atualizar botão ao rolar a página
window.addEventListener("scroll", updateNavButton)
