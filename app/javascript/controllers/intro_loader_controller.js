import { Controller } from "@hotwired/stimulus"

// Connecté à data-controller="intro-loader"


export default class extends Controller {
  connect() {
    console.log("✅ intro-loader connecté !") // ← ajoute ceci
    // Assure que l’animation se lance seulement quand Turbo a fini de charger la page
    document.addEventListener("turbo:load", () => this.init())
  }

  init() {
    console.log("🚀 intro-loader init lancé !") // ← ajoute ceci
    const loader = this.element
    const navbar = document.querySelector("#main-navbar")
    const navbarLogo = document.querySelector("#navbar-logo")
    const mainContent = document.querySelector("#main-content")

    const isMobile = window.matchMedia("(max-width: 768px)").matches
    const baseDelay = isMobile ? 600 : 1000

    // ⚡️ Si déjà joué → skip instantané
    if (sessionStorage.getItem("introPlayed")) {
      this.skipIntro(loader, navbar, navbarLogo, mainContent)
      return
    }

    // Affiche le loader plein écran au départ
    loader.classList.remove("hidden")

    // Joue l’animation
    this.playIntro(loader, navbar, navbarLogo, mainContent, baseDelay)

    // Marque comme joué
    sessionStorage.setItem("introPlayed", "true")
  }

  playIntro(loader, navbar, navbarLogo, mainContent, delay) {
    setTimeout(() => loader.classList.add("filled"), delay)
    setTimeout(() => loader.classList.add("zoomed"), delay + 1500)
    setTimeout(() => {
      loader.classList.remove("zoomed")
      loader.classList.add("move-up")
    }, delay + 2100)
    setTimeout(() => {
      navbarLogo?.classList.remove("opacity-0")
      navbarLogo?.classList.add("opacity-100")
      loader.classList.add("hidden")
    }, delay + 3200)
    setTimeout(() => mainContent.classList.add("visible"), delay + 3700)
  }

  skip() {
    const loader = this.element
    const navbar = document.querySelector("#main-navbar")
    const navbarLogo = document.querySelector("#navbar-logo")
    const mainContent = document.querySelector("#main-content")

    this.skipIntro(loader, navbar, navbarLogo, mainContent)
    sessionStorage.setItem("introPlayed", "true")
  }

  skipIntro(loader, navbar, navbarLogo, mainContent) {
    loader.classList.add("hidden")
    navbarLogo?.classList.remove("opacity-0")
    navbarLogo?.classList.add("opacity-100")
    mainContent.classList.add("visible")
  }

}
