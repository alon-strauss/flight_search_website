import requests

KIWI_ENDPOINT = "https://tequila-api.kiwi.com"
HEADERS = {"apikey": 'wOrSXW5wZmxSEewqKNN2Iu3kVXTnkjMP'}


class FlightSearch:
    def get_code(self, city):
        parameters = {
            "term": city,
            "location_types": "city",
        }
        response = requests.get(url=f"{KIWI_ENDPOINT}/locations/query", headers=HEADERS, params=parameters)
        result = response.json()
        iata_code = result['locations'][0]['code']
        return iata_code

    def search(self, info):
        endpoint = f'{KIWI_ENDPOINT}/v2/search'
        search_parameters = {
            "fly_from": info["from_d"],
            "fly_to": info["to_d"],
            "dateFrom": info["earliest_date"],
            "dateTo": info["latest_date"],
            "nights_in_dst_from": info["min_nights"],
            "nights_in_dst_to": info["max_nights"],
            "flight_type": "round" if info["type_of_trip"] == "round trip" else "oneway",
            "limit": 1,
            "max_stopovers": 0,
            "adults": info["adults"],
            "children": info["children"],
            "infants": info["infants"],
            "adult_hold_bag": info["hold_bag"],
            "adult_hand_bag": info["hand_bag"],
            "curr": "ILS"

        }
        response = requests.get(url=endpoint, params=search_parameters, headers=HEADERS)
        result = response.json()
        return result
