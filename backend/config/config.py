import os
from pydantic_settings import BaseSettings, SettingsConfigDict
from functools import lru_cache


BASE_DIR = os.path.dirname(os.path.abspath(__file__)) 
ENV_FILE_PATH = os.path.join(BASE_DIR, '..', '.env')  

class Settings(BaseSettings):
    ip_info_access_token: str
    redis_host: str
    frontend_url_ip: str
    frontend_url_localhost: str
    redis_port: int




    model_config = SettingsConfigDict(env_file=ENV_FILE_PATH)

@lru_cache
def get_settings():
    return Settings()