from django.http import JsonResponse
from datetime import datetime
from .utils import __get_pinhole_raw_data__, __get_pinhole_filtered_data__
from modules.helpers._get_factory_mes_database_ import __get_factory_mes_database__
from modules.databases.connections.database import sap_database
from rest_framework.views import APIView
from rest_framework.response import Response
from apps.api.helpers import api_response, CustomJSONRenderer
from rest_framework.response import Response


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


class IPQCView(APIView):

    renderer_classes = [CustomJSONRenderer]

    def get(self, request):
        factory = request.GET.get('factory', '').strip("'")
        branch = request.GET.get('branch', '').strip("'")
        machine = request.GET.get('machine', '').strip("'")
        date = request.GET.get('date', datetime.today().strftime('%Y-%m-%d')).strip("'")
        # date = '2025-11-19'

        check_list = [factory, branch, machine, date]
        data = []

        for item in check_list:
            if not item:
                return Response(data)

        sql = f"""
                SELECT ipqc.*, rc.MachineName, rc.WorkCenterTypeName, rc.WorkCenterName
                FROM [MES_OLAP].[dbo].[mes_ipqc_data] ipqc
                LEFT JOIN [PMGMES].[dbo].[PMG_MES_RunCard] rc
                ON ipqc.Runcard = rc.id
                WHERE rc.WorkCenterName LIKE '%{factory}%'
                AND rc.WorkCenterTypeName='{branch}'
                AND rc.MachineName='{machine}'
                AND CAST(rc.CreationTime AS DATE) = '{date}'
            """
        db = sap_database()
        data = db.select_sql_dict(sql)
        print(data)
        return Response(data)

        