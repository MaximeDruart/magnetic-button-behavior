import createBehavior from "@area17/a17-helpers/src/utility/createBehavior"
import gsap from "gsap"

const MagneticBehavior = createBehavior(
  "MagneticBehavior",
  {
    mouseoverHandler() {
      this.$hovering = true
      gsap.to(this.$innerButton, { scale: 1.2 })
    },
    mouseoutHandler() {
      gsap.to(this.$innerButton, { scale: 1 })
      this.$hovering = false
    },
    mousemoveHandler({ x, y }) {
      this.$mousePos = {}
    },
  },
  {
    init() {
      this.$svg = this.getChild("svg")
      this.$outerCircle = this.getChild("outercircle")
      this.$innerCircle = this.getChild("innercircle")
      this.$innerButton = this.getChild("innerbutton")
      this.$text = this.getChild("text")

      this.rect = this.$node.getBoundingClientRect()

      this.$svg.addEventListener("mouseover", this.mouseoverHandler)
      this.$svg.addEventListener("mouseout", this.mouseoutHandler)
      this.$svg.addEventListener("mousemove", this.mousemoveHandler)
    },

    destroy() {},
  }
)

export default MagneticBehavior
