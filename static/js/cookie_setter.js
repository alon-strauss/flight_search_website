if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', ready)
} else {
  start ()
}

function start() {
// making sure that only the main search button creates a cookie
//    research = document.forms[0]
//    research.addEventListener("submit", (event) => {
//        localStorage.setItem("setCookie", "False");
//    });

    if (localStorage.getItem("setCookie") == "True") {
// the algorithm makes sure that every time a new search is executed it is saved with the 0 attached
//and the existing cookies (if exist) move one number up so 1 becomes 2 for example.
//Up to a minimum of 3 cookies which makes sure there arent a lot of cookies being saved
//in local storage bc as soon as there are more than 3 cookies, the oldest one gets deleted.
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


        localStorage.setItem(`from ${k}`, localStorage.getItem(`from ${k - 1}`));
        localStorage.setItem(`adults ${k}`, localStorage.getItem(`adults ${k - 1}`));
        localStorage.setItem(`children ${k}`, localStorage.getItem(`children ${k - 1}`));
        localStorage.setItem(`infants ${k}`, localStorage.getItem(`infants ${k - 1}`));
        localStorage.setItem(`num_baggage ${k}`, localStorage.getItem(`num_baggage ${k - 1}`));
        localStorage.setItem(`hold_bag ${k}`, localStorage.getItem(`hold_bag ${k - 1}`));
        localStorage.setItem(`hand_bag ${k}`, localStorage.getItem(`hand_bag ${k - 1}`));
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


        localStorage.setItem("from 1", localStorage.getItem("from 0"));
        localStorage.setItem("adults 1", localStorage.getItem("adults 0"));
        localStorage.setItem("children 1", localStorage.getItem("children 0"));
        localStorage.setItem("infants 1", localStorage.getItem("infants 0"));
        localStorage.setItem("num_baggage 1", localStorage.getItem("num_baggage 0"));
        localStorage.setItem("hold_bag 1", localStorage.getItem("hold_bag 0"));
        localStorage.setItem("hand_bag 1", localStorage.getItem("hand_bag 0"));
    }
    else {
       localStorage.setItem("i", 0);
    }
// variables for the visible part of the cookies

// the next line isolates the destination from a home-destination string
//and converts special characters to regular ones
    var to = document.getElementsByClassName('regular')[2].textContent
    .split('-')[1].normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    var earliest = document.getElementsByClassName('inputs')[2].value.split('-').reverse().join('/')
    var latest = document.getElementsByClassName('inputs')[3].value.split('-').reverse().join('/')
    var min = document.getElementsByClassName('inputs')[4].value
    var max = document.getElementsByClassName('inputs')[5].value
    var passengers = document.querySelector('#thing').value

// variables for behind the scenes of submitting the search using a form
    var from = document.getElementsByClassName('regular')[2].textContent
    .split('-')[0].normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    var adults = document.getElementsByClassName('inp-box')[0].value
    var children = document.getElementsByClassName('inp-box')[1].value
    var infants = document.getElementsByClassName('inp-box')[2].value
    var num_baggage = document.querySelector('#something').value
    var hold_bag = document.getElementsByClassName('inp-box')[3].value
    var hand_bag = document.getElementsByClassName('inp-box')[4].value

// visible variables

    localStorage.setItem("to 0", to);
    localStorage.setItem("earliest 0", earliest);
    localStorage.setItem("latest 0", latest);
    localStorage.setItem("min 0", min);
    localStorage.setItem("max 0", max);
    localStorage.setItem("passengers 0", passengers);


// unvisible variables
    localStorage.setItem("from 0", from);
    localStorage.setItem("adults 0", adults);
    localStorage.setItem("children 0", children);
    localStorage.setItem("infants 0", infants);
    localStorage.setItem("num_baggage 0", num_baggage);
    localStorage.setItem("hold_bag 0", hold_bag);
    localStorage.setItem("hand_bag 0", hand_bag);



// gets a photo of the destination using an API
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

    localStorage.setItem("setCookie", "False");
}}


