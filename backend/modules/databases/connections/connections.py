import os

from modules.helpers._load_json_ import __load_json__
from modules.databases.connections.create_connection import create_database_connection

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CONFIG_PATH = os.path.join(os.path.dirname(BASE_DIR), "databases", "connections", "database_login.json")

class vnedc_database(create_database_connection):
    def __init__(self):
        config = __load_json__(CONFIG_PATH)["vnedc_database"]
        super().__init__(
            server=config["server"],
            database=config["database"],
            username=config["username"],
            password=config["password"]
        )


class gdmes_database(create_database_connection):
    def __init__(self):
        config = __load_json__(CONFIG_PATH)["gdmes_database"]
        super().__init__(
            server=config["server"],
            database=config["database"],
            username=config["username"],
            password=config["password"]
        )


class gdmes_olap_database(create_database_connection):
    def __init__(self):
        config = __load_json__(CONFIG_PATH)["gdmes_olap_database"]
        super().__init__(
            server=config["server"],
            database=config["database"],
            username=config["username"],
            password=config["password"]
        )


class lkmes_database(create_database_connection):
    def __init__(self):
        config = __load_json__(CONFIG_PATH)["lkmes_database"]
        super().__init__(
            server=config["server"],
            database=config["database"],
            username=config["username"],
            password=config["password"]
        )


class lkmes_olap_database(create_database_connection):
    def __init__(self):
        config = __load_json__(CONFIG_PATH)["lkmes_olap_database"]
        super().__init__(
            server=config["server"],
            database=config["database"],
            username=config["username"],
            password=config["password"]
        )


class ltmes_database(create_database_connection):
    def __init__(self):
        config = __load_json__(CONFIG_PATH)["ltmes_database"]
        super().__init__(
            server=config["server"],
            database=config["database"],
            username=config["username"],
            password=config["password"]
        )


class ltmes_olap_database(create_database_connection):
    def __init__(self):
        config = __load_json__(CONFIG_PATH)["ltmes_olap_database"]
        super().__init__(
            server=config["server"],
            database=config["database"],
            username=config["username"],
            password=config["password"]
        )