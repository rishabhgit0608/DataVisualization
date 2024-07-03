import os
from dotenv import load_dotenv
import pandas as pd
import logging

load_dotenv()

def read_excel():
    """
    This function in particularly reads the input excel file and
    returns it in a paginated format.
    """
    try:
        logging.info("Started to read the excel file from the Path")
        file_path = os.getenv("EXCEL_FILE_PATH")
        excel = pd.read_excel(file_path, engine='xlrd')
        logging.info("Excel file read successfully")
        return excel
    except Exception as e:
        logging.error(e)
