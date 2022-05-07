from flask import Flask, render_template, request
from flight_search import FlightSearch
from formatter import FlightData
from pprint import pprint

app = Flask(__name__)
flight_search = FlightSearch()
formatter = FlightData()

@app.route("/")
def home():
    return render_template("home_page.html")


@app.route("/results", methods=["GET", "POST"])
def results_page():
    input_info = {
        "from_d": flight_search.get_code(request.form["from"]),
        "to_d": flight_search.get_code(request.form["to"]),
        "earliest_date": request.form["earliest_date"],
        "latest_date": request.form["latest_date"],
        "min_nights": request.form["min_nights"],
        "max_nights": request.form["max_nights"],
        "type_of_trip": request.form["drop-down-menu"],
        "num_people": request.form["num_people"],
        "adults": request.form["adults"],
        "children": request.form["children"],
        "infants": request.form["infants"],
        "hold_bag": request.form["hold_bag"],
        "hand_bag": request.form["hand_bag"],

    }

    results_data = flight_search.search(input_info)
    results = formatter.data_formatter(results_data["data"])
    return render_template("results.html", info=input_info, search_result=results)


if __name__ == "__main__":
    app.run(debug=True)
