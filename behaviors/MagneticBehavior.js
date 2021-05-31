import createBehavior from "@area17/a17-helpers/src/utility/createBehavior"
import { getDistance, getDistanceXY, lerp, mapRange, radToDeg } from "./utils"

const MagneticBehavior = createBehavior(
  "MagneticBehavior",
  {
    mousemoveHandler({ x, y }) {
      this.mousepos = { x, y }
    },

    enter() {
      this.hovering = true
      this.$innerContainer.style.transform = "translate(-50%, -50%) translateZ(-15px) "

      // "hover" start animation
    },
    leave() {
      this.hovering = false
      this.$innerContainer.style.transform = "translate(-50%, -50%) translateZ(0px) "

      // "hover" end animation
    },

    renderLoop() {
      // if mouse is close enough to the button lerp the button pos to the mousepos to create a magnet effect
      const { distanceY, distanceX } = getDistanceXY(
        this.mousepos.x + window.scrollX,
        this.mousepos.y + window.scrollY,
        this.rect.left + this.rect.width / 2,
        this.rect.top + this.rect.height / 2
      )

      const mouseAbsolutePos = {
        x: this.mousepos.x + window.scrollX,
        y: this.mousepos.y + window.scrollY,
      }

      const centerAbsolutePos = {
        x: this.rect.left + this.rect.width / 2,
        y: this.rect.top + this.rect.height / 2,
      }

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

        let dx = centerAbsolutePos.x - mouseAbsolutePos.x
        let dxAbs = Math.abs(dx)
        dxAbs = (1 - dxAbs / this.distanceToTrigger) * 40

        if (dx < 0) {
          dxAbs = dxAbs * -1
          // dxAbs = Math.max(dxAbs, -25)
        } else {
          // dxAbs = Math.min(dxAbs, 25)
        }

        let dy = centerAbsolutePos.y - mouseAbsolutePos.y
        let dyAbs = Math.abs(dy)
        dyAbs = (1 - dyAbs / this.distanceToTrigger) * 40

        if (dy < 0) {
          dyAbs = dyAbs * -1
          // dyAbs = Math.max(dyAbs, -15)
        } else {
          // dyAbs = Math.min(dyAbs, 15)
        }

        x = dxAbs
        y = dyAbs
      } else if (this.hovering) {
        this.leave()
      }

      // console.log(x)

      this.renderedStyles["tx"].current = x
      this.renderedStyles["ty"].current = y

      for (const key in this.renderedStyles) {
        this.renderedStyles[key].previous = lerp(
          this.renderedStyles[key].previous,
          this.renderedStyles[key].current,
          this.renderedStyles[key].amt
        )
      }

      this.$node.style.transform = `rotateX(${-this.renderedStyles["ty"].previous}deg) rotateY(${
        this.renderedStyles["tx"].previous
      }deg)`
      // this.$node.style.transform = `rotateY(${this.renderedStyles["tx"].previous}deg) `
      // this.$innerText.style.transform = `translate3d(${-this.renderedStyles["tx"].previous * 0.6}px, ${
      //   -this.renderedStyles["ty"].previous * 0.6
      // }px, 0)`

      requestAnimationFrame(this.renderLoop)
    },
  },
  {
    init() {
      this.mousepos = { x: 0, y: 0 }

      this.$outerContainer = this.getChild("outer-container")

      this.$innerContainer = this.getChild("inner-container")
      this.$innerCircle = this.getChild("inner-circle")

      this.rect = this.$node.getBoundingClientRect()

      this.distanceToTrigger = this.rect.width * 0.8
      this.lerpStrength = 0.08

      this.renderedStyles = {
        tx: { previous: 0, current: 0, amt: this.lerpStrength },
        ty: { previous: 0, current: 0, amt: this.lerpStrength },
      }

      this.$innerCircle.addEventListener("mouseover", (e) => (document.body.style.cursor = "pointer"))

      window.addEventListener("mousemove", this.mousemoveHandler)
      this.renderLoop()
    },

    destroy() {
      window.removeEventListener("mousemove", this.mousemoveHandler)
    },
  }
)

export default MagneticBehavior
