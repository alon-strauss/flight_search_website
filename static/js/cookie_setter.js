if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', ready)
} else {
  start ()
}

function start() {
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


    var to = document.getElementsByClassName('regular')[2].textContent
    .split('-')[1].normalize('NFD').replace(/[\u0300-\u036f]/g, '');
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

    const Url = `https://api.unsplash.com/search/photos?query=${to.toLowerCase()}&per_page=1&w=200`;
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


