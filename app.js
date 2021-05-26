import "./style.css"
import manageBehaviors from "@area17/a17-helpers/src/utility/manageBehaviors"
import resized from "@area17/a17-helpers/src/utility/resized"
import ios100vhFix from "@area17/a17-helpers/src/utility/ios100vhFix"
import responsiveImageUpdate from "@area17/a17-helpers/src/utility/responsiveImageUpdate"
import focusDisplayHandler from "@area17/a17-helpers/src/utility/focusDisplayHandler"
import * as Behaviors from "./behaviors"

console.log(Behaviors)

/*

  A17

  Doc: // Doc: https://code.area17.com/a17/fe-boilerplate/wikis/js-app

*/

window.A17 = window.A17 || {}

document.addEventListener("DOMContentLoaded", function () {
  // adds a `--1vh` CSS variable to `:root`
  ios100vhFix()

  // make safari recalc image sizes
  responsiveImageUpdate()

  // watch what triggers a focus event
  focusDisplayHandler()

  // on resize, check
  resized()

  // go go go
  manageBehaviors(Behaviors)
})
