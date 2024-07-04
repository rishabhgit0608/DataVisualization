from flask import request, Blueprint, jsonify
from helpers import read_excel
from flask_wtf.csrf import CSRFProtect
from utils import paginate_dataframe
import numpy as np
from constants import PAGE_SIZE,ASCENDING, ERROR_MSG, FILTER_SEARCH, EXCEL_FILE_SUCCESSFUL_MESSAGE, FILTER_TYPE, PAGE_NUMBER, SORT_DIRECTION, SORT_TYPE
csrf = CSRFProtect()
route = Blueprint("route", __name__)
csrf.exempt(route)
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
