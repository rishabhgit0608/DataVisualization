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

    df = read_excel()
    df = df.replace({np.nan: None})
    if df is None:
        return jsonify({"error": "Failed to read Excel file"}), 500

    paginated_data = paginate_dataframe(df, page_size, page_number)
    return jsonify(paginated_data)
