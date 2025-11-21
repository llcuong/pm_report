from datetime import datetime, timedelta

def __get_gmt_7_hour__():
    try:
        from zoneinfo import ZoneInfo
        return datetime.now(ZoneInfo("Asia/Ho_Chi_Minh"))
    except Exception:
        return datetime.utcnow() + timedelta(hours=7)
