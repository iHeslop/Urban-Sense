from urbansense import create_app
from celery import Celery
from celery.schedules import crontab


def make_celery(app):
    celery = Celery(
        app.import_name,
        backend=app.config['result_backend'],
        broker=app.config['broker_url'],
        include=['urbansense.data.tasks']
    )
    celery.conf.update(app.config)
    TaskBase = celery.Task

    class ContextTask(TaskBase):
        def __call__(self, *args, **kwargs):
            with app.app_context():
                return TaskBase.__call__(self, *args, **kwargs)

    celery.Task = ContextTask
    return celery


flask_app = create_app()
celery = make_celery(flask_app)

celery.conf.beat_schedule = {
    'populate-traffic-data-every-hour': {
        'task': 'urbansense.data.tasks.populate_traffic_data_task',
        'schedule': crontab(minute=0, hour='*'),
    },
    'run-spark-job-every-hour': {
        'task': 'urbansense.data.tasks.run_spark_job_task',
        'schedule': crontab(minute=0, hour='*'),
    }
}
