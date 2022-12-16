#!/bin/bash
echo "Starting database migration process..."
PATH="$(pwd)/src/Infrastructure/Database/Migrations/*"

db_host=localhost
db_username=root
db_password=admin
db_name=garosa_dist_test

echo "Running database migrations for Garosa Dist..."

for f in $PATH
do
    echo "Executing migration $f"
    mariadb -u $db_username -p$db_password -e source $f $db_name
    echo "Finished executing migration $f"
done

echo "Finished database migration process"

