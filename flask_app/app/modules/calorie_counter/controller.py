from .foodApi import FoodApi
from app.db.models import Product, UserProductEntry
from datetime import datetime, timezone


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
    
    def save_product(self, request, user):
        data = request.get_json()
        if not data:
            return {'message': 'No data provided'}, 400
        
        if 'barcode' not in data or not data.get('barcode'):
            if 'carbohydrates' not in data or 'fat' not in data or 'protein' not in data or 'name' not in data or 'calories' not in data:
                return {'message': 'Missing required fields'}, 400
            product = {
                'name': data.get('name'),
                'calories': data.get('calories', 0),
                'carbohydrates': data.get('carbohydrates', 0),
                'fat': data.get('fat', 0),
                'protein': data.get('protein', 0),
            }
            product = Product(**product)
            product.save()
            # Use current date if not provided
            entry_date = datetime.strptime(data.get('date'), "%Y-%m-%dT%H:%M:%SZ").replace(tzinfo=timezone.utc)
            if not entry_date:
                entry_date = datetime.now()
            user_product_entry = UserProductEntry(
                user_id=user.id,
                date=entry_date,
                product_id=product.id,
                weight=data.get('weight', 100),
            )
            user_product_entry.save()
            return {'message': 'Product saved successfully'}, 201
        
        entry_date = datetime.strptime(data.get('date'), "%Y-%m-%dT%H:%M:%SZ").replace(tzinfo=timezone.utc)
        if not entry_date:
            entry_date = datetime.now()
        user_product_entry = UserProductEntry(
            user_id=user.id,
            product_barcode=data.get('barcode'),
            date=entry_date,
            weight=data.get('weight', 100),
        )
        user_product_entry.save()

        return {'message': 'Product saved successfully'}, 201