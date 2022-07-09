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
        #2 for hold bag, 1 for hand bag(function needs to distinguish them because API has a limit of 2 hold bags per person but only 1 hand bag per person.
        hold_bag_dist = self.bags_formatting((info["adults"], info["children"], info["hold_bag"], 2))
        hand_bag_dist = self.bags_formatting((info["adults"], info["children"], info["hand_bag"], 1))
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
            "adult_hold_bag": hold_bag_dist[0],
            "adult_hand_bag": hand_bag_dist[0],
            "child_hold_bag": hold_bag_dist[1],
            "child_hand_bag": hand_bag_dist[1],
            "curr": "ILS"

        }
        response = requests.get(url=endpoint, params=search_parameters, headers=HEADERS)
        result = response.json()
        return result

    def bags_formatting(self, info):
        info = (int(x) for x in info)
        adults, children, bags, type = info
        if type == 2:
            l = 2
        else:
            l = 1
        i = 0
        output = [0] * adults
        while bags > 0:
            if output[-1] == l:
                if children != 0:
                    k = 0
                    output2 = [0] * children
                    while bags > 0:
                        if output2[-1] == l:
                            raise Exception("too many bags")
                        elif output2[k] < l:
                            output2[k] += 1
                            bags -= 1
                        else:
                            k += 1
                    output = [str(n) for n in output]
                    output2 = [str(n) for n in output2]
                    return [",".join(output), ",".join(output2)]
                else:
                    raise Exception("too many bags")
            elif output[i] < l:
                output[i] += 1
                bags -= 1
            else:
                i += 1

        output = [str(n) for n in output]
        output2 = [str(0)] * children
        return [",".join(output), ",".join(output2)]




