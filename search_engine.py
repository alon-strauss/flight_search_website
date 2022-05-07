from flight_search import FlightSearch
from formatter import FlightData

# from pprint import pprint
destinations = ["MIL", "GVA", "BSL", "ZRH"]
# destinations = ["MIL"]
flight_search = FlightSearch()
flight_data = FlightData()

for destination in destinations:
    raw_data = flight_search.search(destination)
    results = raw_data['data']
    for result in results:
        print(flight_data.data_formatter(result))
        print("------------------------------------------------------------------------------------------------------")
