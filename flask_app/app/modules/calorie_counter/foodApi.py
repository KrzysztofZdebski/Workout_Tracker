import requests

class FoodApi:
    def __init__(self, base_url):
        self.base_url = base_url
    
    def get_product(self, product_barcode):
        url = f"{self.base_url}/product/{product_barcode}"
        try:
            response = requests.get(url)
            response.raise_for_status()  # Raise an error for bad responses
            return response.json()
        except requests.exceptions.HTTPError as http_err:
            return {'error': f"HTTP error occurred: {http_err}"}
        except requests.exceptions.RequestException as req_err:
            return {'error': f"Request error occurred: {req_err}"}
        except Exception as err:
            return {'error': f"An error occurred: {err}"}