if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', ready)
} else {
  start ()
}


function start() {
    if (localStorage.getItem("to 0")) {
        document.getElementsByClassName("searches-header")[0].style.display = "block";

// displaying the last searches info from local storage
        for (let m = 0; m < localStorage.getItem("i") + 1; m++) {
        // visible
            document.getElementsByClassName("destination")[m].innerHTML = localStorage.getItem(`to ${m}`);
            document.getElementsByClassName("travellers")[m].innerHTML = localStorage.getItem(`passengers ${m}`) + " travellers";
            document.getElementsByClassName("dates")[m].innerHTML = localStorage.getItem(`earliest ${m}`) + " - " + localStorage.getItem(`latest ${m}`);
            document.getElementsByClassName("nights")[m].innerHTML = localStorage.getItem(`min ${m}`) + "-" +
            localStorage.getItem(`max ${m}`)+ " nights";
            document.getElementById(`image-${m}`).src = localStorage.getItem(`src ${m}`)
            document.getElementById(`search-${m}`).style.display = "block";

        // invisible
            document.getElementsByClassName("invisible-form")[0 + 13 * m].value = localStorage.getItem(`to ${m}`);
            document.getElementsByClassName("invisible-form")[1 + 13 * m].value = localStorage.getItem(`from ${m}`);
            document.getElementsByClassName("invisible-form")[2 + 13 * m].value = localStorage.getItem(`earliest ${m}`);
            document.getElementsByClassName("invisible-form")[3 + 13 * m].value = localStorage.getItem(`latest ${m}`);
            document.getElementsByClassName("invisible-form")[4 + 13 * m].value = localStorage.getItem(`min ${m}`);
            document.getElementsByClassName("invisible-form")[5 + 13 * m].value = localStorage.getItem(`max ${m}`);
            document.getElementsByClassName("invisible-form")[6 + 13 * m].value = localStorage.getItem(`passengers ${m}`);
            document.getElementsByClassName("invisible-form")[7 + 13 * m].value = localStorage.getItem(`adults ${m}`);
            document.getElementsByClassName("invisible-form")[8 + 13 * m].value = localStorage.getItem(`children ${m}`);
            document.getElementsByClassName("invisible-form")[9 + 13 * m].value = localStorage.getItem(`infants ${m}`);
            document.getElementsByClassName("invisible-form")[10 + 13 * m].value = localStorage.getItem(`num_baggage ${m}`);
            document.getElementsByClassName("invisible-form")[11 + 13 * m].value = localStorage.getItem(`hold_bag ${m}`);
            document.getElementsByClassName("invisible-form")[12 + 13 * m].value = localStorage.getItem(`hand_bag ${m}`);

            for (l=0; l<13; l++) {
            console.log(document.getElementsByClassName("invisible-form")[l].value)
        }

        }

        if (localStorage.getItem("i") == 0) {
            document.getElementsByClassName("last-searches")[0].style.justifyContent = "flex-start";
        }
}}


function dates_formatter (early, late) {
    var earliest = early.split("-")[2] + "." + early.split("-")[1]
    var latest = late.split("-")[2] + "." + late.split("-")[1]
    var dates = earliest + " - " + latest
    return dates
}





