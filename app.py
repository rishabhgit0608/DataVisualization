from flask import Flask
from routes import route

app = Flask(__name__)
app.config['WTF_CSRF_ENABLED'] = False  


app.register_blueprint(route)