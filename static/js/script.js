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
  var thing = document.querySelector("#thing")
  passengers_number.textContent = total_passengers
  thing.value = total_passengers

  var bags_number = document.querySelector("#bags_number")
  var something = document.querySelector("#something")
  bags_number.textContent = total_bags
  something.value = total_bags


  close()
}

const toggleButton = document.getElementsByClassName('toggle-button')[0]
const navbarLogs = document.getElementsByClassName('navbar-logs')[0]

toggleButton.addEventListener('click', () => {
  navbarLogs.classList.toggle('active')
})

const searchButton = document.querySelector('#fancy-button')
searchButton.addEventListener('click', save)


function dates_formatter (early, late) {
    var earliest = early.split("-")[2] + "." + early.split("-")[1]
    var latest = late.split("-")[2] + "." + late.split("-")[1]
    var dates = earliest + " - " + latest
    return dates
}


if (localStorage.getItem("to 0") === null) {
    document.getElementsByClassName("searches-header")[0].style.display = "none";
}

function save() {
    if (localStorage.getItem("i") >= 1) {
        for (let k = 2; k > 0; k--) {
          localStorage.setItem(`to ${k}`, localStorage.getItem(`to ${k - 1}`));
          localStorage.setItem(`earliest ${k}`, localStorage.getItem(`earliest ${k - 1}`));
          localStorage.setItem(`latest ${k}`, localStorage.getItem(`latest ${k - 1}`));
          localStorage.setItem(`min ${k}`, localStorage.getItem(`min ${k - 1}`));
          localStorage.setItem(`max ${k}`, localStorage.getItem(`max ${k - 1}`));
          localStorage.setItem(`passengers ${k}`, localStorage.getItem(`passengers ${k - 1}`));
          localStorage.setItem(`src ${k}`, localStorage.getItem(`src ${k - 1}`));
          localStorage.setItem("i", 2);
        }
    }

    else if (localStorage.getItem("i") == 0) {
        localStorage.setItem("to 1", localStorage.getItem("to 0"));
        localStorage.setItem("earliest 1", localStorage.getItem("earliest 0"));
        localStorage.setItem("latest 1", localStorage.getItem("latest 0"));
        localStorage.setItem("min 1", localStorage.getItem("min 0"));
        localStorage.setItem("max 1", localStorage.getItem("max 0"));
        localStorage.setItem("passengers 1", localStorage.getItem("passengers 0"));
        localStorage.setItem("src 1", localStorage.getItem("src 0"));
        localStorage.setItem("i", 1);
    }
    else {
       localStorage.setItem("i", 0);
    }

    var to = document.getElementsByClassName('inputs')[1].value
    var earliest = document.getElementsByClassName('inputs')[2].value
    var latest = document.getElementsByClassName('inputs')[3].value
    var min = document.getElementsByClassName('inputs')[4].value
    var max = document.getElementsByClassName('inputs')[5].value
    var passengers = document.querySelector('#thing').value

    localStorage.setItem("to 0", to);
    localStorage.setItem("earliest 0", earliest);
    localStorage.setItem("latest 0", latest);
    localStorage.setItem("min 0", min);
    localStorage.setItem("max 0", max);
    localStorage.setItem("passengers 0", passengers);

    const Url = `https://api.unsplash.com/search/photos?query=${to}&per_page=1&w=200`;
    const header = {
        Authorization: "Client-ID w7uy1Xu7Z9NkbhElRquPnP4ton7tymGrCpB4m_HRdVs"
    }

    fetch(Url, {
        headers: header,
    })
    .then((response) => response.json())
    .then(data => obj = data)
    .then(() =>  (photo = obj['results'][0]['urls']['thumb']))
    .then(() =>  (photo_temp = photo.replace("max", "min")))
    .then(() =>  (photo_final = photo_temp + "&h=150"))
    .then(() => (localStorage.setItem("src 0", photo_final)))

}


for (let m = 0; m < localStorage.getItem("i") + 1; m++) {
    document.getElementsByClassName("destination")[m].innerHTML = localStorage.getItem(`to ${m}`);
    document.getElementsByClassName("travellers")[m].innerHTML = localStorage.getItem(`passengers ${m}`) + " travellers";
    document.getElementsByClassName("dates")[m].innerHTML = dates_formatter(localStorage.getItem(`earliest ${m}`),
    localStorage.getItem(`latest ${m}`));
    document.getElementsByClassName("nights")[m].innerHTML = localStorage.getItem(`min ${m}`) + "-" +
    localStorage.getItem(`max ${m}`)+ " nights";
    document.getElementById(`image-${m}`).src = localStorage.getItem(`src ${m}`)
    document.getElementById(`search-${m}`).style.display = "block";
}

if (localStorage.getItem("i") == 0) {
    document.getElementsByClassName("last-searches")[0].style.justifyContent = "flex-start";
}





