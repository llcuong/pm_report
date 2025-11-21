from datetime import timedelta

from modules.helpers._get_factory_mes_database_ import __get_factory_mes_database__
from modules.databases.query.mes_raw_query import __get_pinhole_data__query

from apps.api.helpers import __get_gmt_7_hour__


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
    processed_data = [__get_pinhole_processed_data__(r) for r in rows]
    return processed_data



def __get_pinhole_processed_data__(row):
    class_ranges = {
        "class_1": [str(h).zfill(2) for h in range(6, 14)],
        "class_2": [str(h).zfill(2) for h in range(14, 22)],
        "class_3": [str(h).zfill(2) for h in list(range(22, 24)) + list(range(0, 6))]
    }

    for class_name, hours in class_ranges.items():
        total_aql = 0
        total_sum = 0

        has_digit_value = False

        for hr in hours:
            raw_val = (row.get(hr, " ") or "").strip()

            if raw_val.isdigit():
                num = int(raw_val)
                has_digit_value = True
            elif raw_val.lower() == "x":
                num = 0
            else:
                continue

            total_sum += num

            aql = (row.get(f"{hr}_aql", "") or "").strip()
            if aql == "1.0" and raw_val.isdigit():
                total_aql += num

        if total_aql >= 6:
            for hr in hours:
                aql = (row.get(f"{hr}_aql", "") or "").strip()
                if aql == "1.0":
                    color_key = f"{hr}_color"
                    row[color_key] = "2"

        if not has_digit_value:
            row[f"{class_name}_aql"] = " "
            row[f"{class_name}_sum"] = " "
        else:
            row[f"{class_name}_aql"] = total_aql
            row[f"{class_name}_sum"] = total_sum

    return row



def __get_pinhole_filtered_data__(raw_data, aql):
    aql_list = ['All', *sorted({float(r.get("AQL", "").strip()) for r in raw_data if r.get("AQL", "").strip()})]
    try:
        f_aql = str(round(float(aql), 1))
        raw_data_f = [r for r in raw_data if r.get("AQL", "").strip() == f_aql]
        return raw_data_f, aql_list
    except:
        return raw_data, aql_list

