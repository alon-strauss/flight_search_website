import datetime as dt
import requests
import os

OATH_SERVER = "https://test.api.amadeus.com/v1/security/oauth2/token"
ENDPOINT = "https://test.api.amadeus.com/v1/reference-data/airlines"
CLIENT_ID = os.getenv("CLIENT_ID")
CLIENT_SECRET = os.getenv("CLIENT_SECRET")


class FlightData:

    def data_formatter(self, data):
        flights_information = []
        for i in range(5):
            search_result = data[i]
            flight_information = {
                "price": round(search_result['price']),
                "city_from": search_result['cityFrom'],
                "city_to": search_result['cityTo'],
                "d_airline": self.airline_name_finder(search_result['route'][0]['airline']).lower(),
                "r_airline": self.airline_name_finder(search_result['route'][1]['airline']).lower(),
                "local_departure_flight1_date": '/'.join(search_result['route'][0]['local_departure'][:10].split("-")[
                                                         ::-1]),
                "local_arrival_flight1": search_result['route'][0]['local_arrival'][11:16],
                "local_departure_flight1": search_result['route'][0]['local_departure'][11:16],
                "local_departure_flight2_date": '/'.join(search_result['route'][1]['local_departure'][:10].split("-")[
                                                         ::-1]),
                "local_departure_flight2": search_result['route'][1]['local_departure'][11:16],
                "local_arrival_flight2": search_result['route'][1]['local_arrival'][11:16],
                "num_of_nights": search_result['nightsInDest'],
                "duration_of_flight1": self.trip_length_calculator(search_result['route'][0]['utc_departure'][11:16],
                                                                   search_result['route'][0]['utc_arrival'][11:16]),
                "duration_of_flight2": self.trip_length_calculator(search_result['route'][1]['utc_departure'][11:16],
                                                                   search_result['route'][1]['utc_arrival'][11:16]),
                "day_of_flight1": self.day_finder(search_result['route'][0]['local_departure']),
                "day_of_flight2": self.day_finder(search_result['route'][1]['local_departure']),

            }

            flights_information.append(flight_information)

        return flights_information

    def trip_length_calculator(self, start, end):
        start_dt = dt.datetime.strptime(start, '%H:%M')
        end_dt = dt.datetime.strptime(end, '%H:%M')
        diff = str((end_dt - start_dt))[:-3].split(':')
        if len(diff[0]) > 2:
            diff[0] = diff[0].split(' ')
            diff[0] = diff[0][-1]
        if diff[1][0] == '0':
            diff[1] = diff[1][1:]
        return f'{diff[0]} hours {diff[1]} minutes'

    def day_finder(self, date):
        year, month, day = date[:10].split('-')
        d = dt.datetime(int(year), int(month), int(day))
        return d.strftime('%a')

    def get_oath_token(self):
        headers = {
            "Content-Type": "application/x-www-form-urlencoded"
        }

        body = {
            "grant_type": "client_credentials",
            "client_id": CLIENT_ID,
            "client_secret": CLIENT_SECRET,
        }

        response = requests.post(url=OATH_SERVER, data=body, headers=headers)
        return response.json()["access_token"]

    def airline_name_finder(self, iata):
        headers = {
            "Authorization": f"Bearer {self.get_oath_token()}"
        }
        parameters = {
            "airlineCodes": iata,
        }
        try:
            response = requests.get(url=ENDPOINT, headers=headers, params=parameters)
            return response.json()["data"][0]["businessName"]

        except KeyError:
            return iata

