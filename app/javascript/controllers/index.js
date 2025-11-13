import { Application } from "@hotwired/stimulus"
import IntroLoaderController from "./intro_loader_controller"
import PageTransitionController from "./page_transition_controller"

const application = Application.start()
application.register("intro-loader", IntroLoaderController)
application.register("page-transition", PageTransitionController)
