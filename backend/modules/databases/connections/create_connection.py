import pyodbc
from contextlib import contextmanager

class create_database_connection:
    def __init__(self, server, database, username, password):
        self.server = server
        self.database = database
        self.username = username
        self.password = password
        self.driver = "ODBC Driver 17 for SQL Server"

    def select_sql(self, sql, params=None):
        with self.create_connection() as conn:
            cur = conn.cursor()
            cur.execute(sql, params or [])
            return cur.fetchall()

    def select_sql_dict(self, sql, params=None):
        with self.create_connection() as conn:
            cur = conn.cursor()
            cur.execute(sql, params or [])
            cols = [c[0] for c in cur.description]
            return [dict(zip(cols, row)) for row in cur.fetchall()]

    def execute_sql(self, sql, params=None):
        with self.create_connection() as conn:
            cur = conn.cursor()
            cur.execute(sql, params or [])
            conn.commit()

    def execute_sql_values(self, sql, values_seq):
        with self.create_connection() as conn:
            cur = conn.cursor()
            cur.executemany(sql, values_seq)
            conn.commit()


    def __create_connection_configs__(self):
        return (
            f"DRIVER={{{self.driver}}};"
            f"SERVER={self.server};"
            f"DATABASE={self.database};"
            f"UID={self.username};PWD={self.password};"
            "Trusted_Connection=no;"
            "TrustServerCertificate=yes;"
        )

    def __create_connection_connect__(self):
        return pyodbc.connect(self.__create_connection_configs__(), timeout=10)


    @contextmanager
    def create_connection(self):
        conn = None
        try:
            conn = self.__create_connection_connect__()
            yield conn
        finally:
            if conn is not None:
                conn.close()