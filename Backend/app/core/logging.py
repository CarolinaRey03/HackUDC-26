import logging
import os
from datetime import datetime, timedelta, timezone

_LOG_DIR = "./logs"

os.makedirs(_LOG_DIR, exist_ok=True)


def setup_logger(
    name: str, log_file: str = "app.log", show_file_name: bool = True
) -> logging.Logger:
    logger = logging.getLogger(name)
    logger.setLevel(logging.DEBUG)

    if not logger.handlers:
        log_path = os.path.join(_LOG_DIR, log_file)

        file_handler = logging.FileHandler(log_path, mode="a", encoding="utf-8")

        formatter = logging.Formatter(
            (
                "[%(asctime)s] [%(levelname)s] - %(name)s:%(lineno)d - %(message)s"
                if show_file_name
                else "[%(asctime)s] [%(levelname)s] - %(lineno)d - %(message)s"
            ),
            "%H:%M:%S",
        )
        formatter.converter = _custom_time
        file_handler.setFormatter(formatter)

        logger.addHandler(file_handler)

    return logger


def _custom_time(*args):
    tz = timezone(timedelta(hours=2))
    return datetime.now(tz).timetuple()
