from modules.databases.connections.connections import gdmes_database, ltmes_database, lkmes_database

def __get_factory_mes_database__(factory):
    if factory == 'lt':
        return ltmes_database()
    elif factory == 'lk':
        return lkmes_database()
    else:
        return gdmes_database()
    

def get_factory_mes_db(factory):
    if factory == 'LT':
        return ltmes_database()
    elif factory == 'LK':
        return lkmes_database()
    else:
        return gdmes_database()