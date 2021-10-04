#!/bin/bash
set -e
export PGPASSWORD=$POSTGRES_PASSWORD;
chmod +x db/01-init.sh
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
  CREATE DATABASE IMAGES;
  COMMIT;
EOSQL