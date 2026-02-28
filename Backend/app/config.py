from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")

    elasticsearch_url: str = "http://localhost:9200"
    elasticsearch_index: str = "documents"
    elasticsearch_user: str
    elasticsearch_password: str
    embedding_model: str = "all-MiniLM-L6-v2"
    embedding_dims: int = 384
    files_dir: str = "/code/files"


settings = Settings()  # type: ignore[call-arg]
