import io
import os
from odf.opendocument import load
from odf import meta, teletype, dc
from elasticsearch import Elasticsearch

# Configuration (using local port 9200 as mapped in docker-compose)
ES_URL = "http://localhost:9200"
ES_USER = "elastic"
ES_PASSWORD = "changeme"  # Adjust if env variable is different
ES_INDEX = "documents"    # Assumed from general context or es_setup.py

file_id = "688a519c-948b-4c21-9716-062585cd647c"
file_path = f"/Users/daniel.mondragon/Documents/GitHub/HackUDC-26/Backend/files/{file_id}"

def update_metadata():
    if not os.path.exists(file_path):
        print(f"File {file_path} not found.")
        return

    with open(file_path, "rb") as f:
        content = f.read()

    try:
        odf_doc = load(io.BytesIO(content))
        titles = odf_doc.meta.getElementsByType(dc.Title)
        creators = odf_doc.meta.getElementsByType(dc.Creator)
        initial_creators = odf_doc.meta.getElementsByType(meta.InitialCreator)
        
        title = teletype.get_text(titles[0]) if titles else None
        author = teletype.get_text(creators[0]) if creators else \
                 (teletype.get_text(initial_creators[0]) if initial_creators else None)
        
        print(f"Extracted Title: {title}")
        print(f"Extracted Author: {author}")

        client = Elasticsearch(
            ES_URL,
            basic_auth=(ES_USER, ES_PASSWORD),
        )

        query = {
            "script": {
                "source": "ctx._source.title = params.title; ctx._source.author = params.author; ctx._source.category = 'Document';",
                "params": {
                    "title": title,
                    "author": author
                }
            },
            "query": {
                "term": {
                    "file_id": file_id
                }
            }
        }

        response = client.update_by_query(index=ES_INDEX, body=query)
        print(f"Update response: {response.body}")
        print("Metadata updated successfully in Elasticsearch.")

    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    update_metadata()
