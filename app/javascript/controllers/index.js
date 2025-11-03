// app/javascript/controllers/index.js
import { Application } from "@hotwired/stimulus"
import IntroLoaderController from "./intro_loader_controller"

// Démarre l’application Stimulus (une seule fois !)
const application = Application.start()

// Enregistre ton contrôleur
application.register("intro-loader", IntroLoaderController)
