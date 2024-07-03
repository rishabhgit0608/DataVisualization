def paginate_dataframe(df, page_size, page_number):
    """
    This function paginates data
    :param df:
    :param page_size:
    :param page_number:
    :return:
    """
    total_rows = len(df)
    start_index = page_size * (page_number - 1)
    end_index = start_index + page_size
    paginated_data = df.iloc[start_index:end_index]
    return {
        "data": paginated_data.to_dict(orient='records'),
        "total_rows": total_rows,
        "page_number": page_number,
        "page_size": page_size
    }