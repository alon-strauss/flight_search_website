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
}}


function dates_formatter (early, late) {
    var earliest = early.split("-")[2] + "." + early.split("-")[1]
    var latest = late.split("-")[2] + "." + late.split("-")[1]
    var dates = earliest + " - " + latest
    return dates
}





