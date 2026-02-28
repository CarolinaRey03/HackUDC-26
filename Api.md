# GET /docs/all

Pillar todos los ficheros

Payload

```
none
```

Response

```json
[
  {
    "id": "string",
    "name": "string"
  }
]
```

# POST /docs

Subir un fichero

Payload

```json
{
  "doc": "File"
}
```

Response

```
none
```

# GET /docs/filtered

Filtrar ficheros con query y filtros

Payload

```json
{
  "query": "string"
}
```

Response:

```json
[
  {
    "id": "string",
    "name": "string"
  }
]
```

# GET /docs/{id}

Pillar contenido de un fichero

Payload

```json
{
  "id": "string"
}
```

Response

```json
{
  "doc": "File"
}
```
