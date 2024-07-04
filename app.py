from flask import Flask
from flask_cors import CORS
from routes import route

app = Flask(__name__)
app.config['WTF_CSRF_ENABLED'] = False  
cors = CORS(app, resources={r"/processdata/*": {"origins": "*"}})

app.register_blueprint(route)