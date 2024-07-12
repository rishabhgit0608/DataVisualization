from flask import request, Blueprint, jsonify, request, session
from helpers import read_excel
from flask_wtf.csrf import CSRFProtect
from utils import paginate_dataframe
import numpy as np
from google.oauth2 import id_token
from google.auth.transport import requests as google_requests
from flask_login import LoginManager, login_user, logout_user, login_required, UserMixin

from constants import PAGE_SIZE,ASCENDING, ERROR_MSG, FILTER_SEARCH, FILTER_TYPE, PAGE_NUMBER, SORT_DIRECTION, SORT_TYPE
csrf = CSRFProtect()
route = Blueprint("route", __name__)
csrf.exempt(route)
login_manager = LoginManager()
GOOGLE_CLIENT_ID = '470744419321-pe1mc1ts8ghtnv7qs8brviqo7a88vcna.apps.googleusercontent.com'

class User(UserMixin):
    def __init__(self, id):
        self.id = id

@login_manager.user_loader
def load_user(user_id):
    return User(user_id)

@route.route("/processdata", methods=["GET"])
def get_data():
    """_summary_
        This method is a route for fetching excel data and processing it.
        Request Params
            - page_size
            - page_number
            - sort_type
            - sort_direction
            - filter_type
            - filter_search

    Returns:
        Paginated Data from excel
    """    
    page_size = int(request.args.get(PAGE_SIZE, 10))
    page_number = int(request.args.get(PAGE_NUMBER, 1))
    sort_type = request.args.get(SORT_TYPE, None)
    sort_direction = request.args.get(SORT_DIRECTION, None)
    filter_type = request.args.get(FILTER_TYPE, None)
    filter_search = request.args.get(FILTER_SEARCH, None)

    df = read_excel()
    df = df.replace({np.nan: None})
    if df is None:
        return jsonify(ERROR_MSG), 500

    if filter_type and filter_search:
        df = df[df[filter_type].astype(str).str.contains(filter_search, case=False, na=False)]
    if sort_type and sort_direction:
        df = df.sort_values(by=sort_type, ascending=(sort_direction == ASCENDING))
    paginated_data = paginate_dataframe(df, page_size, page_number)
    return jsonify(paginated_data)

@route.route('/google-login', methods=['POST'])
def google_login():
    token_id = request.json.get('tokenId')

    try:
        idinfo = id_token.verify_oauth2_token(token_id, google_requests.Request(), GOOGLE_CLIENT_ID)

        if idinfo['iss'] not in ['accounts.google.com', 'https://accounts.google.com']:
            raise ValueError('Invalid token')

        user_id = idinfo['sub']
        user = User(user_id)
        login_user(user)
        session['logged_in'] = True
        return jsonify({'message': 'Logged in successfully'})
    
    except ValueError as e:
        return jsonify({'error': str(e)}), 401

@route.route('/logout')
@login_required
def logout():
    logout_user()
    session.pop('logged_in', None)
    return jsonify({'message': 'Logged out successfully'})

if __name__ == '__main__':
    app.run(debug=True)
