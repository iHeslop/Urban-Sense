import os

from pyspark.sql import SparkSession
from pyspark.sql.functions import avg, col
from urbansense.models.traffic_analysis_model import TrafficAnalysisResult
from urbansense.db_config import db
from dotenv import load_dotenv


def run_spark_job():
    try:
        load_dotenv()
        DB_NAME = os.getenv('DB_NAME')
        DB_PASSWORD = os.getenv('DB_PASSWORD')
        DB_USER = os.getenv('DB_USER')
        DB_HOST = os.getenv('DB_HOST')
        DB_PORT = os.getenv('DB_PORT')

        spark = SparkSession.builder \
            .appName("Traffic Analysis") \
            .config("spark.driver.host", "localhost") \
            .config("spark.jars", "urbansense\jars\mysql-connector-j-8.4.0.jar") \
            .config("spark.local.dir", r'urbansense\tmp') \
            .master("local[*]") \
            .getOrCreate()

        jdbc_url = f"jdbc:mysql://{DB_HOST}:{DB_PORT}/{DB_NAME}"
        table_name = "city_traffic_data"

        df = spark.read \
            .format("jdbc") \
            .option("url", jdbc_url) \
            .option("dbtable", table_name) \
            .option("user", DB_USER) \
            .option("password", DB_PASSWORD) \
            .option("driver", "com.mysql.cj.jdbc.Driver") \
            .load()

        avg_speed_per_city = df.groupBy("city") \
            .agg(
                avg("current_speed").alias("avg_current_speed"),
                avg("free_flow_speed").alias("avg_free_flow_speed")
        )

        avg_speed_per_city = avg_speed_per_city.withColumn(
            "speed_ratio", col("avg_current_speed") /

            col("avg_free_flow_speed")
        )

        rows = avg_speed_per_city.collect()

        for row in rows:
            analysis_entry = TrafficAnalysisResult(
                city=row['city'],
                avg_current_speed=row['avg_current_speed'],
                avg_free_flow_speed=row['avg_free_flow_speed'],
                speed_ratio=row['speed_ratio']
            )
            db.session.add(analysis_entry)
            db.session.commit()

        spark.stop()
        return "Spark job completed successfully."

    except Exception as e:
        return str(e)
