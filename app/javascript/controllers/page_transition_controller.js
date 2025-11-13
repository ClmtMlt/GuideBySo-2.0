import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  connect() {
    document.addEventListener("turbo:before-visit", this.startTransition.bind(this))
    document.addEventListener("turbo:load", this.endTransition.bind(this))
  }

  startTransition() {
    const overlay = document.querySelector("#page-transition-overlay")
    const main = document.querySelector("#main-content")
    if (!overlay || !main) return
    overlay.classList.add("active")
    main.classList.remove("visible")
  }

  endTransition() {
    const overlay = document.querySelector("#page-transition-overlay")
    const main = document.querySelector("#main-content")
    if (!overlay || !main) return
    setTimeout(() => {
      overlay.classList.remove("active")
      main.classList.add("visible")
    }, 500)
  }
}
