import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  connect() {
    this.init()
    document.addEventListener("turbo:load", () => this.init())
  }

  init() {
    const loader = this.element
    const mainContent = document.querySelector("#main-content")

    const isMobile = window.matchMedia("(max-width: 768px)").matches
    const baseDelay = isMobile ? 600 : 1000

    if (sessionStorage.getItem("introPlayed")) {
      this.removeBlackOverlays()
      return
    }

    loader.classList.remove("hidden")

    // Barre de remplissage et changement couleur texte
    setTimeout(() => loader.classList.add("filled"), baseDelay)

    // Fin de l’animation → suppression complète
    setTimeout(() => {
      this.removeBlackOverlays()
    }, baseDelay + 2000)

    setTimeout(() => mainContent.classList.add("visible"), baseDelay + 2300)

    sessionStorage.setItem("introPlayed", "true")
  }

  skip() {
    sessionStorage.setItem("introPlayed", "true")
    this.removeBlackOverlays()
  }

  removeBlackOverlays() {
    // Supprime tous les éléments fullscreen noirs
    const elems = [...document.querySelectorAll("body *")].filter(el => {
      const rect = el.getBoundingClientRect()
      const bg = getComputedStyle(el).backgroundColor
      const z = parseInt(getComputedStyle(el).zIndex) || 0
      return rect.width >= window.innerWidth && rect.height >= window.innerHeight &&
             (bg === "rgb(0, 0, 0)" || bg === "black") && z > 0
    })
    elems.forEach(el => el.remove())

    // Navbar et contenu
    const navbarLogo = document.querySelector("#navbar-logo")
    const navbar = document.querySelector("#main-navbar")
    const mainContent = document.querySelector("#main-content")

    navbarLogo?.classList.remove("opacity-0")
    navbarLogo?.classList.add("opacity-100")
    navbar?.classList.add("visible-navbar")
    mainContent?.classList.add("visible")

    // ⚡ Forcer le fond blanc sur le body et le html
    document.body.style.backgroundColor = "#fff"
    document.body.style.transition = "background-color 0.3s ease"
    document.documentElement.style.backgroundColor = "#fff"
  }
}
