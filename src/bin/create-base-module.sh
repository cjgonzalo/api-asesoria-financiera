
#!/bin/sh
set -eu

usage() {
  cat <<'EOF'
Uso:
  ./create-base-module.sh <ruta_base> <nombre_modulo>

Ejemplo:
  ./create-base-module.sh /home/gonza/proyectos mi-modulo
EOF
}

if [ "$#" -ne 2 ]; then
  usage
  exit 1
fi

BASE_DIR="/home/gonzalo/proyectos/api-asesoria-financiera/src/modules/${1}"
MODULE_NAME=$2

# Quita trailing slash
BASE_DIR=${BASE_DIR%/}

if [ ! -d "$BASE_DIR" ]; then
  echo "Error: la ruta base no existe o no es un directorio: $BASE_DIR" >&2
  exit 2
fi

if [ -z "$MODULE_NAME" ]; then
  echo "Error: el nombre del módulo no puede ser vacío" >&2
  exit 3
fi

MODULE_PATH="$BASE_DIR/$MODULE_NAME"

if [ -e "$MODULE_PATH" ]; then
  echo "Error: ya existe un archivo/directorio con ese nombre: $MODULE_PATH" >&2
  exit 4
fi

mkdir -p \
  "$MODULE_PATH/adapters" \
  "$MODULE_PATH/app/services" \
  "$MODULE_PATH/app/usecases" \
  "$MODULE_PATH/infra/entities" \
  "$MODULE_PATH/infra/repository" \
  "$MODULE_PATH/interfaces" \
  "$MODULE_PATH/presetation/controllers" \
  "$MODULE_PATH/presetation/validators"

echo "OK: módulo creado en: $MODULE_PATH"