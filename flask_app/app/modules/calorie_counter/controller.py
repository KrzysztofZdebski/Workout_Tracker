from .foodApi import FoodApi

food_api = FoodApi(base_url='https://world.openfoodfacts.org/api/v0')
class Calorie_counterController:
    def get_product(self,request):
        data = request.args
        if not data:
            return {'message': 'No data provided'}, 400
        product_barcode = data.get('product_barcode')
        if not product_barcode:
            return {'message': 'Missing required field: product_barcode'}, 400
        
        response = food_api.get_product(product_barcode)
        if 'error' in response:
            return {'message': response['error']}, 500
        if not response or 'product' not in response:
            return {'message': 'Product not found'}, 404
        product = response['product']
        if not product:
            return {'message': 'Product not found'}, 404
        product_data = {
            'product_id': product.get('id'),
            'name': product.get('product_name', 'Unknown'),
            'short_name': product.get('generic_name', 'Unknown'),
            'calories': product.get('nutriments', {}).get('energy-kcal_100g', 0),
            'carbohydrates': product.get('nutriments', {}).get('carbohydrates_100g', 0),
            'fat': product.get('nutriments', {}).get('fat_100g', 0),
            'protein': product.get('nutriments', {}).get('proteins_100g', 0),
        }
        return product_data, 200