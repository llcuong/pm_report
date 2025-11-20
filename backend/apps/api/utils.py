from datetime import datetime, timedelta

from modules.helpers._get_factory_mes_database_ import __get_factory_mes_database__
from modules.databases.query.mes_raw_query import __get_pinhole_data__query

def __get_gmt_7_hour__():
    try:
        from zoneinfo import ZoneInfo
        return datetime.now(ZoneInfo("Asia/Ho_Chi_Minh"))
    except Exception:
        return datetime.utcnow() + timedelta(hours=7)


def __get_pinhole_raw_data__(factory, branch, date):
    mes_db = __get_factory_mes_database__(factory)

    _now_ = __get_gmt_7_hour__()
    today = _now_.date()
    hour = _now_.hour

    if today.strftime('%Y-%m-%d') != date:
        hour = 99
    else:
        if hour < 6:
            date = (today - timedelta(days=1)).strftime('%Y-%m-%d')

    sql = __get_pinhole_data__query(branch, date, hour)
    rows = mes_db.select_sql_dict(sql)
    return rows


def __get_pinhole_filtered_data__(raw_data, aql):
    aql_list = ['All', *sorted({float(r.get("AQL", "").strip()) for r in raw_data if r.get("AQL", "").strip()})]
    try:
        f_aql = str(round(float(aql), 1))
        raw_data_f = [r for r in raw_data if r.get("AQL", "").strip() == f_aql]
        return raw_data_f, aql_list
    except:
        return raw_data, aql_list

