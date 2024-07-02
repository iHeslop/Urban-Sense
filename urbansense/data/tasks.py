from urbansense.celery_app import celery
from urbansense.services.traffic_data import populate_traffic_data
from urbansense.data.traffic_analysis import run_spark_job


@celery.task(name='urbansense.data.tasks.populate_traffic_data_task')
def populate_traffic_data_task():
    print("Running populate_traffic_data_task")
    populate_traffic_data()


@celery.task(name='urbansense.data.tasks.run_spark_job_task')
def run_spark_job_task():
    print("Running run_spark_job_task")
    run_spark_job()
