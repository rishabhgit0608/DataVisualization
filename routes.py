from flask import request, Blueprint, jsonify
from helpers import read_excel
from flask_wtf.csrf import CSRFProtect
from utils import paginate_dataframe
import numpy as np

csrf = CSRFProtect()
route = Blueprint("route", __name__)
csrf.exempt(route)
@route.route("/processdata", methods=["GET"])
def get_data():
    page_size = int(request.args.get('page_size', 10))
    page_number = int(request.args.get('page_number', 1))
    sort_type = request.args.get('sort', None)
    sort_direction = request.args.get('sort_direction', None)
    filter_type = request.args.get('type', None)
    filter_search = request.args.get('search', None)

    df = read_excel()
    df = df.replace({np.nan: None})
    if df is None:
        return jsonify({"error": "Failed to read Excel file"}), 500

    if filter_type and filter_search:
        df = df[df[filter_type].astype(str).str.contains(filter_search, case=False, na=False)]
    if sort_type and sort_direction:
        df = df.sort_values(by=sort_type, ascending=(sort_direction == 'asc'))
    paginated_data = paginate_dataframe(df, page_size, page_number)
    return jsonify(paginated_data)
