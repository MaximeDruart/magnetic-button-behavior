import createBehavior from "@area17/a17-helpers/src/utility/createBehavior"
import { getDistance, lerp } from "./utils"

const Magnetic2Behavior = createBehavior(
  "Magnetic2Behavior",
  {
    mousemoveHandler({ x, y }) {
      this.mousepos = { x, y }
    },

    enter() {
      this.hovering = true

      // "hover" start animation
    },
    leave() {
      this.hovering = false
      // "hover" end animation
    },

    renderLoop() {
      // if mouse is close enough to the button lerp the button pos to the mousepos to create a magnet effect
      const distanceMouseButton = getDistance(
        this.mousepos.x + window.scrollX,
        this.mousepos.y + window.scrollY,
        this.rect.left + this.rect.width / 2,
        this.rect.top + this.rect.height / 2
      )

      let x = 0
      let y = 0

      // distance check
      if (distanceMouseButton < this.distanceToTrigger) {
        if (!this.hovering) {
          this.enter()
        }

        x = (this.mousepos.x + window.scrollX - (this.rect.left + this.rect.width / 2)) * 0.3
        y = (this.mousepos.y + window.scrollY - (this.rect.top + this.rect.height / 2)) * 0.3
      } else if (this.hovering) {
        this.leave()
      }

      this.renderedStyles["tx"].current = x
      this.renderedStyles["ty"].current = y

      for (const key in this.renderedStyles) {
        this.renderedStyles[key].previous = lerp(
          this.renderedStyles[key].previous,
          this.renderedStyles[key].current,
          this.renderedStyles[key].amt
        )
      }

      this.$node.style.transform = `translate3d(${this.renderedStyles["tx"].previous}px, ${this.renderedStyles["ty"].previous}px, 0)`
      this.$innerText.style.transform = `translate3d(${-this.renderedStyles["tx"].previous * 0.6}px, ${
        -this.renderedStyles["ty"].previous * 0.6
      }px, 0)`

      requestAnimationFrame(this.renderLoop)
    },
  },
  {
    init() {
      this.mousepos = { x: 0, y: 0 }

      this.$innerText = this.getChild("innertext")
      this.rect = this.$node.getBoundingClientRect()

      this.distanceToTrigger = this.rect.width * 0.6
      this.lerpStrength = 0.08

      this.renderedStyles = {
        tx: { previous: 0, current: 0, amt: this.lerpStrength },
        ty: { previous: 0, current: 0, amt: this.lerpStrength },
      }

      window.addEventListener("mousemove", this.mousemoveHandler)
      this.renderLoop()
    },

    destroy() {
      window.removeEventListener("mousemove", this.mousemoveHandler)
    },
  }
)

export default Magnetic2Behavior
