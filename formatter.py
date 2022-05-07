class FlightData:

    def data_formatter(self, data):
        search_result = data[0]
        flight_information = {
            "price": search_result['price'],
            "city_from": search_result['cityFrom'],
            "city_to": search_result['cityTo'],
            "first_airline": search_result['route'][0]['airline'],
            "local_departure_flight1_date": search_result['route'][0]['local_departure'][:10].split("-")[
                                            ::-1],
            "local_arrival_flight1": search_result['route'][0]['local_arrival'],
            "second_airline": search_result['route'][1]['airline'],
            "local_departure_flight2_date": search_result['route'][1]['local_departure'][:10].split("-")[
                                            ::-1],
            "local_arrival_flight2": search_result['route'][1]['local_arrival'],
        }

        return flight_information
