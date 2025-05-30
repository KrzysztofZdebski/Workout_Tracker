from app.app import create_app
from app.db.models import UserProductEntry
from app.db.db import db

app = create_app('development')  # or use your config name

with app.app_context():
    entry_id = 4  # Change this to the ID you want to delete
    entry = UserProductEntry.query.get(entry_id)
    if entry:
        db.session.delete(entry)
        db.session.commit()
        print("Entry deleted.")
    else:
        print("Entry not found.")