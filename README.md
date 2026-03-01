# 🔍🐶 Rastrea DOC

![Python](https://img.shields.io/badge/Python-blue?style=for-the-badge&logo=python)
![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)
![Elasticsearch](https://img.shields.io/badge/Elasticsearch-005571?style=for-the-badge&logo=elasticsearch)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker)

Un potente motor de ingesta de documentos y búsqueda semántica. Construido para unificar el conocimiento corporativo, capaz de "leer" cualquier formato de oficina y encontrar respuestas exactas basándose en el significado, no solo en palabras clave.

Proyecto desarrollado para el **HackUDC 2026**.

---

## 🚀 El Problema que Resolvemos

Hoy en día, el conocimiento de las empresas y organizaciones está fragmentado en silos: informes en PDF, presupuestos en Excel, actas en Word o LibreOffice.
Los motores de búsqueda tradicionales basados en coincidencia exacta de palabras (búsqueda léxica) fracasan cuando un usuario busca un concepto o hace una pregunta natural.

**Nuestra solución:** Centralizamos cualquier tipo de archivo de ofimática, extraemos su texto, lo dividimos en fragmentos lógicos (_chunks_) y calculamos los embeddings. Al buscar, el sistema entiende el **contexto** y devuelve los documentos que considera relevantes para responder la necesidad de información del usuario.

## 💡 En qué consiste el proyecto

Se trata de una API RESTful robusta que actúa como la base para un sistema de indexación orquestada por `elasticsearch`.

### Características principales:

- **Soporte Universal de Archivos:** Ingesta transparente de `.pdf`, `.docx`, `.odt`, `.csv`, `.txt`, `.xls`, `.ods` y `.xlsx` .
- **Procesamiento:** Extracción de texto enriquecida eliminando las stopwords, pasando por una fase de steaming.
- **Chunking y Vectorización:** Los documentos se dividen en fragmentos semánticos y se codifican utilizando `sentence-transformers` ejecutados localmente.
- **Búsqueda Vectorial (k-NN):** Utiliza Elasticsearch 8.x para almacenar los vectores y realizar búsquedas a una alta velocidad.

---

## 🛠️ Tecnologías Utilizadas

- **Backend:** `Python + FastAPI`.

* **Base de Datos Vectorial:** `Elasticsearch`
* **IA / Embeddings:** `SentenceTransformers`
* **Procesamiento de Datos:** `Pandas`, `PyPDF2`, `python-docx`, `odfpy`.
* **Infraestructura:** `Docker` & `Docker Compose`.
* **Frontend:** `React`.

---

## ⚙️ Instalación y Ejecución

El proyecto está completamente dockerizado para garantizar que funcione a la primera en cualquier máquina sin ensuciar el entorno local.

### Requisitos previos

- [Docker](https://www.docker.com/) y Docker Compose instalados.
- Git.

### Paso 1: Clonar el repositorio

```bash
git clone git@github.com:CarolinaRey03/HackUDC-26.git
```

### Paso 2: Configurar variables de entorno

Crea un archivo llamado `.env` en la misma carpeta donde esté tu `docker-compose.yaml` (el cual está dentro de `Backend`) y añade la siguiente configuración básica:

```bash
ELASTICSEARCH_URL=http://elasticsearch:9200
ELASTICSEARCH_USER=elastic
ELASTICSEARCH_PASSWORD=changeme
KIBANA_PASSWORD=changeme_kibana
```

### Paso 3: Levantar la infraestructura

Ejecuta el siguiente comando para que Docker descargue las imágenes, instale las dependencias de Python y levante tanto Elasticsearch como la API como el frontend:

```bash
docker compose build
```

tras ese comando se debe ejecutar el siguiente comando para levantar todo el backend:

```
docker compose up
```

(**Nota**: La primera vez puede tardar un par de minutos mientras compila las librerías de IA y descarga la imagen de Elasticsearch. Las siguientes ejecuciones serán mucho más rápidas.)

### Paso 4: ¡A probar! 🎉

Una vez que en la terminal veas el mensaje **Application startup complete**, la API estará funcionando.

Visita la documentación interactiva (Swagger UI) en tu navegador:
👉 http://localhost:8000/docs

Para hacer uso de la aplicación, visita en tu navegador:
👉 http://localhost:5173

---
