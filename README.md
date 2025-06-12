# Workout Tracker

A comprehensive fitness and nutrition tracking application that helps users monitor their workouts and nutritional intake. Built with a modern tech stack featuring a React frontend and Flask backend, integrated with the OpenFoodFacts API for nutritional data.

## 🚀 Features

- **Workout Tracking**: Log and monitor your fitness activities
- **Nutrition Tracking**: Track your food intake with detailed nutritional information
- **Food Database**: Access to extensive food database via OpenFoodFacts API
- **User-Friendly Interface**: Clean and intuitive React-based user interface
- **Data Persistence**: Secure backend storage with Flask

## 🛠️ Tech Stack

### Frontend
- **React**: Modern JavaScript library for building user interfaces
- **JavaScript**: Primary programming language for frontend logic

### Backend
- **Flask**: Lightweight Python web framework
- **Python**: Backend programming language

### External APIs
- **OpenFoodFacts API**: Comprehensive food and nutrition database

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **Python** (v3.7 or higher)
- **pip** (Python package manager)

## 🔧 Installation & Setup

### Backend Setup (Flask)

1. Clone the repository:
```bash
git clone https://github.com/KrzysztofZdebski/Workout_Tracker.git
cd Workout_Tracker
```

2. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install Python dependencies:
```bash
pip install -r requirements.txt
```

4. Set up environment variables:
```bash
# Create a .env file in the root directory
touch .env
```

5. Start the Flask server:
```bash
python app.py
```

The backend server will run on `http://localhost:5000`

### Frontend Setup (React)

1. Navigate to the frontend directory:
```bash
cd frontend  # Adjust path based on your project structure
```

2. Install dependencies:
```bash
npm install
```

3. Start the React development server:
```bash
npm start
```

The frontend will run on `http://localhost:3000`

## 🔌 API Integration

This application integrates with the [OpenFoodFacts API](https://world.openfoodfacts.org/) to provide:

- Comprehensive food database
- Nutritional information (calories, macronutrients, vitamins, etc.)
- Product information and ingredients
- Barcode scanning capabilities

### Example API Usage

```python
# Example Flask route for fetching food data
@app.route('/api/food/<barcode>')
def get_food_info(barcode):
    response = requests.get(f'https://world.openfoodfacts.org/api/v0/product/{barcode}.json')
    return response.json()
```

## 📱 Usage

1. **Start Tracking**: Create an account or log in to begin tracking
2. **Log Workouts**: Add your exercise routines and track progress
3. **Scan Food**: Use barcode scanning or search to add food items
4. **Monitor Progress**: View your fitness and nutrition statistics
5. **Set Goals**: Define and track your fitness and dietary goals

## 🗂️ Project Structure

```
Workout_Tracker/
├── backend/
│   ├── app.py              # Main Flask application
│   ├── models/             # Database models
│   ├── routes/             # API routes
│   └── requirements.txt    # Python dependencies
├── frontend/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # Page components
│   │   └── services/       # API services
│   ├── public/
│   └── package.json        # Node.js dependencies
├── .env                    # Environment variables
└── README.md
```

## 🚀 Deployment

### Backend Deployment
- Configure your production environment variables
- Use a WSGI server like Gunicorn for production
- Deploy to platforms like Heroku, AWS, or DigitalOcean

### Frontend Deployment
- Build the React app: `npm run build`
- Deploy to platforms like Netlify, Vercel, or serve from your backend

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📞 Contact

**Krzysztof Zdebski** - [@KrzysztofZdebski](https://github.com/KrzysztofZdebski)

Project Link: [https://github.com/KrzysztofZdebski/Workout_Tracker](https://github.com/KrzysztofZdebski/Workout_Tracker)

## 🙏 Acknowledgments

- [OpenFoodFacts](https://world.openfoodfacts.org/) for providing the comprehensive food database
- React and Flask communities for excellent documentation and resources
- All contributors who help improve this project

---

⭐ Star this repository if you found it helpful!
