const toggleButton = document.getElementsByClassName('toggle-button')[0]
const navbarLogs = document.getElementsByClassName('navbar-logs')[0]

toggleButton.addEventListener('click', () => {
  navbarLogs.classList.toggle('active')
})

if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', ready)
} else {
  start ()
}

function start() {
  var dd_button = document.getElementsByName('dd-button')[0]
  const counters = document.querySelectorAll(".counter")

  dd_button.addEventListener('click', open)

  counters.forEach(counter => {
    const plusButton = counter.children[2]
    const minusButton = counter.children[0]

    plusButton.addEventListener('click', event => {
      var inputNumber = counter.children[1]
      var magicNumber = parseInt(inputNumber.value)
      if (magicNumber < 9) {
        magicNumber++
        inputNumber.value = magicNumber
      }
    })
    minusButton.addEventListener('click', event => {
      var inputNumber = counter.children[1]
      var magicNumber = parseInt(inputNumber.value)
      if (magicNumber > 0) {
        magicNumber--
        inputNumber.value = magicNumber
    }
  })});
}

function open() {
  document.getElementById("id").style.display = "block"

  var cancel_button = document.getElementById('cancel-button')
  cancel_button.addEventListener('click', close)

  var done_button = document.getElementById('done-button')
  done_button.addEventListener('click', update)

}

function close() {
  document.getElementById("id").style.display = "none"
}

function update() {
  const inputs = document.querySelectorAll(".inp-box")
  var total_passengers = 0
  for (let i = 0; i < 3; i++) {
    total_passengers= total_passengers + parseInt(inputs[i].value)
  }

  var total_bags = 0
  for (let i = 3; i < 5; i++) {
    total_bags= total_bags + parseInt(inputs[i].value)
  }

  var passengers_number = document.querySelector("#passengers_number")
  passengers_number.textContent = total_passengers

  var bags_number = document.querySelector("#bags_number")
  bags_number.textContent = total_bags

  close()
}
