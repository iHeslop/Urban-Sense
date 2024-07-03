from urbansense.celery_app import celery
from urbansense.services.traffic_data import populate_traffic_data
from urbansense.data.traffic_analysis import run_spark_job
from urbansense.services.air_data import populate_air_data
from celery import chain


@celery.task(name='urbansense.data.tasks.populate_traffic_data_task')
def populate_traffic_data_task():
    print("Running populate_traffic_data_task")
    populate_traffic_data()


@celery.task(name='urbansense.data.tasks.run_spark_job_task')
def run_spark_job_task(self):
    print("Running run_spark_job_task")
    run_spark_job()


@celery.task(name='urbansense.data.tasks.populate_air_data_task')
def populate_air_data_task(self):
    print("Running populate_air_data_task")
    populate_air_data()


@celery.task(name='urbansense.data.tasks.populate_and_run_spark_job_task')
def populate_and_run_spark_job_task():
    print("Chaining populate_traffic_data_task, run_spark_job_task and populate_air_data_task")
    chain(populate_traffic_data_task.s(),
          run_spark_job_task.s(), populate_air_data_task.s())()
