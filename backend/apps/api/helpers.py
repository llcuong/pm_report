from datetime import datetime, timedelta
from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer
from rest_framework import status


def __get_gmt_7_hour__():
    try:
        from zoneinfo import ZoneInfo
        return datetime.now(ZoneInfo("Asia/Ho_Chi_Minh"))
    except Exception:
        return datetime.utcnow() + timedelta(hours=7)


def api_response(data=None, message="", success=True, error_code=None, status_code=200):
    return Response({
        "success": success,
        "data": data,
        "message": message,
        "errorCode": error_code
    }, status=status_code)


class CustomJSONRenderer(JSONRenderer):
    def render(self, data, accepted_media_type=None, renderer_context=None):
        
        errorCode = status.HTTP_404_NOT_FOUND

        if len(data) == 0:
            success = renderer_context['response'].status_code in range(200, 300),
            message =  'Data not found',
            data = None
        else:
            success = renderer_context['response'].status_code in range(200, 300),
            message =  data[0].get('message', 'Fetched successfully'),
            data = data
            errorCode = None

        response =  {
            "success": success[0],
            "message": message[0],
            "errorCode": errorCode,
            "data": data
        }
        return super().render(response, accepted_media_type, renderer_context)


