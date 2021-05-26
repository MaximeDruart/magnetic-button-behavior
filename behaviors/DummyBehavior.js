import createBehavior from "@area17/a17-helpers/src/utility/createBehavior"

// see https://code.area17.com/a17/fe-boilerplate/wikis/js-functions-createBehavior

const DummyBehavior = createBehavior(
  "DummyBehavior",
  {
    updateCounter() {
      this.$counter.textContent = this.count
      this.count++
      // bindings
      this._data.count = this.count
    },
    handleResetClick(e) {
      e.preventDefault()
      this.count = parseInt(this.options.start)
      this.$counter.textContent = this.count
      // bindings
      this._data.count = this.count
    },
    handleDeleteClick(e) {
      e.preventDefault()
      this.$counter.textContent = "😵"
      // bindings
      this._data.count = "😵"
      //
      this.$node.remove()
    },
  },
  {
    init() {
      console.log("DummyBehavior - init")

      this.counterInterval
      this.count = parseInt(this.options.start)
      this.$counter = this.getChild("counter")

      this.$resetBtn = this.getChild("reset")
      this.$resetBtn.addEventListener("click", this.handleResetClick)

      this.$deleteBtn = this.getChild("delete")
      this.$deleteBtn.addEventListener("click", this.handleDeleteClick)

      this.$li = this.getChildren("li")
      this.$li.forEach(($li, i) => {
        $li.textContent = "list index: " + i
      })

      this.$a17 = this.getChild("a17", document)

      // bindings
      this._data.foo = "hello world"
      this._data.bar = true
      this._data.baz = "s-binded"
      this._data.barry = "s-test"
      this._data.barry = null

      console.log(this)
      console.log("/DummyBehavior - init")
    },
    enabled() {
      console.log("DummyBehavior - enabled")
      this.counterInterval = setInterval(this.updateCounter, 250)
    },
    resized() {
      console.log("DummyBehavior - resized")
    },
    mediaQueryUpdated() {
      console.log("DummyBehavior - mediaQueryUpdated", A17.currentMediaQuery)
      // current media query is: A17.currentMediaQuery
    },
    disabled() {
      console.log("DummyBehavior - disabled")
      clearInterval(this.counterInterval)
    },
    destroy() {
      console.log("DummyBehavior - destroy")
      // remove any listeners, intervals etc.
      // any variables set to `this` will be automatically removed
      // eg. this.count will be removed automatically
      this.$resetBtn.removeEventListener("click", this.handleResetClick)
      this.$deleteBtn.removeEventListener("click", this.handleDeleteClick)
      clearInterval(this.counterInterval)
    },
  }
)

export default DummyBehavior
