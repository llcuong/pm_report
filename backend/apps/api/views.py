from django.http import JsonResponse

from datetime import datetime
from .utils import __get_pinhole_raw_data__, __get_pinhole_filtered_data__


def get_pinhole_data(request):
    if request.method == 'GET':
        factory = request.GET.get('factory', 'gd')
        branch = request.GET.get('branch', 'pvc')
        date = request.GET.get('date', datetime.today().strftime('%Y-%m-%d'))
        aql = request.GET.get('aql', 'all')

        pinhole_data_raw_data_dict = __get_pinhole_raw_data__(factory, branch, date)
        pinhole_data_filtered_data_dict, aql_list = __get_pinhole_filtered_data__(pinhole_data_raw_data_dict, aql)

        title = 'Long Thanh' if factory == 'lt' else 'Long Khanh' if factory == 'lk' else 'Giang Dien'
        return JsonResponse({
            "title": title,
            "aql_list": aql_list,
            "pinhole_data" : pinhole_data_filtered_data_dict
        })
