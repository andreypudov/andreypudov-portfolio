import json
from functools import lru_cache
import fastjsonschema
from fastjsonschema.exceptions import JsonSchemaException
from pathlib import Path
from urllib.parse import urlparse


@lru_cache(maxsize=None)
def __compile_validator(schema_path: str):
    with open(schema_path, "r", encoding="utf-8") as file:
        schema = json.load(file)

    schema_directory = Path(schema_path).parent

    def load_local_schema(uri: str):
        schema_file = schema_directory / Path(urlparse(uri).path).name
        if schema_file.parent != schema_directory or not schema_file.is_file():
            raise FileNotFoundError(
                f"Schema reference is not available locally: {uri}"
            )

        with schema_file.open("r", encoding="utf-8") as file:
            return json.load(file)

    return fastjsonschema.compile(schema, handlers={"https": load_local_schema})


def validate_album_schema(album_data: dict, schema_path: Path) -> bool:
    name = album_data.get("name", "<unknown>")
    print(f"Validating {name} against schema...")

    try:
        validate_func = __compile_validator(schema_path)
        validate_func(album_data)
    except JsonSchemaException as e:
        print(f"Validation error: {e.message}")
        return False
    except Exception as e:
        print(f"Error: {str(e)}")
        return False

    return True
