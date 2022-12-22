#!/bin/sh

HOST_NAME="$1"

echo "${HOST_NAME}"

BUILD_FOLDER="build_$(date "+%Y.%m.%d_%H.%M.%S")"

### Check if a directory does not exist ###
if [ ! -d "./builds" ]
then
    echo "Directory /path/to/dir DOES NOT exists."
    mkdir "./builds"
fi
### End of check if a directory does not exist ###


mkdir "./builds/${BUILD_FOLDER}"

# shellcheck disable=SC2164
cd "./builds/${BUILD_FOLDER}";

if [ "$HOST_NAME" = "taste-and-tell" ]; then
    git clone --depth 1 https://github.com/johngeraldcayabyab/evening-dew.git -b taste-and-tell ./
else
    git clone --depth 1 https://github.com/johngeraldcayabyab/evening-dew.git ./
fi




composer install --no-interaction --prefer-dist --optimize-autoloader --no-dev --no-progress --no-plugins --no-scripts --no-ansi
npm install --omit=dev --prefer-offline --no-audit --progress=false
npm install laravel-mix@latest
npm run production
rm -rf storage

BUILD_FOLDER_ZIP="${BUILD_FOLDER}.zip"

### Operating system check ###
case "$(uname -s)" in

   Darwin)
     echo 'Mac OS X'
     zip -r "../${BUILD_FOLDER_ZIP}" ./*
     ;;

   Linux)
     echo 'Linux'
     zip -r "../${BUILD_FOLDER_ZIP}" ./*
     ;;

   CYGWIN*|MINGW32*|MSYS*|MINGW*)
     echo 'MS Windows'
     7z a "../${BUILD_FOLDER_ZIP}" ./* -r
     ;;

   *)
     echo 'Other OS'
     zip -r "../${BUILD_FOLDER_ZIP}" ./*
     ;;
esac
# *** End of Operating system check ***


cd ../../

rm -rf "./builds/${BUILD_FOLDER}"

ssh "${HOST_NAME}" umask 002

scp "./builds/${BUILD_FOLDER_ZIP}" "${HOST_NAME}:/opt/bitnami/projects/builds"

ssh "${HOST_NAME}" "cd /opt/bitnami/projects/builds; unzip ${BUILD_FOLDER_ZIP} -d ${BUILD_FOLDER}"
ssh "${HOST_NAME}" "rm /opt/bitnami/projects/builds/${BUILD_FOLDER_ZIP}"
ssh "${HOST_NAME}" "sudo ln -nsf /opt/bitnami/projects/storage /opt/bitnami/projects/builds/${BUILD_FOLDER}/storage"
ssh "${HOST_NAME}" "sudo ln -nsf /opt/bitnami/projects/.env /opt/bitnami/projects/builds/${BUILD_FOLDER}/.env"
ssh "${HOST_NAME}" "sudo ln -nsf /opt/bitnami/projects/builds/${BUILD_FOLDER} /opt/bitnami/projects/${HOST_NAME}"

ssh "${HOST_NAME}" "sudo chown -R daemon:daemon /opt/bitnami/projects/${HOST_NAME}"
ssh "${HOST_NAME}" "sudo find /opt/bitnami/projects/${HOST_NAME} -type f -exec chmod 644 {} \;"
ssh "${HOST_NAME}" "sudo find /opt/bitnami/projects/${HOST_NAME} -type d -exec chmod 755 {} \;"
ssh "${HOST_NAME}" "sudo chown -R bitnami:daemon /opt/bitnami/projects/storage"
ssh "${HOST_NAME}" "sudo chown -R bitnami:daemon /opt/bitnami/projects/${HOST_NAME}/bootstrap/cache"
ssh "${HOST_NAME}" "sudo chmod -R 775 /opt/bitnami/projects/storage"
ssh "${HOST_NAME}" "sudo chmod -R 755 /opt/bitnami/projects/${HOST_NAME}/bootstrap/cache"


ssh "${HOST_NAME}" "cd /opt/bitnami/projects/${HOST_NAME}; /opt/bitnami/php/bin/php artisan optimize:clear"
ssh "${HOST_NAME}" "cd /opt/bitnami/projects/${HOST_NAME}; /opt/bitnami/php/bin/php artisan clear-compiled"
ssh "${HOST_NAME}" "cd /opt/bitnami/projects/${HOST_NAME}; /opt/bitnami/php/bin/php artisan config:clear"
ssh "${HOST_NAME}" "cd /opt/bitnami/projects/${HOST_NAME}; /opt/bitnami/php/bin/php artisan route:clear"
ssh "${HOST_NAME}" "cd /opt/bitnami/projects/${HOST_NAME}; /opt/bitnami/php/bin/php artisan view:clear"
ssh "${HOST_NAME}" "cd /opt/bitnami/projects/${HOST_NAME}; /opt/bitnami/php/bin/php artisan event:clear"


ssh "${HOST_NAME}" "cd /opt/bitnami/projects/${HOST_NAME}; /opt/bitnami/php/bin/php artisan config:cache"
ssh "${HOST_NAME}" "cd /opt/bitnami/projects/${HOST_NAME}; /opt/bitnami/php/bin/php artisan route:cache"
ssh "${HOST_NAME}" "cd /opt/bitnami/projects/${HOST_NAME}; /opt/bitnami/php/bin/php artisan view:cache"
ssh "${HOST_NAME}" "cd /opt/bitnami/projects/${HOST_NAME}; /opt/bitnami/php/bin/php artisan event:cache"
ssh "${HOST_NAME}" "cd /opt/bitnami/projects/${HOST_NAME}; /opt/bitnami/php/bin/php artisan storage:link"
ssh "${HOST_NAME}" "cd /opt/bitnami/projects/${HOST_NAME}; /opt/bitnami/php/bin/php artisan optimize"
ssh "${HOST_NAME}" "cd /opt/bitnami/projects/${HOST_NAME}; /opt/bitnami/php/bin/php /opt/bitnami/php/bin/composer dump-autoload -o"
ssh "${HOST_NAME}" "cd /opt/bitnami/projects/${HOST_NAME}; /opt/bitnami/php/bin/php artisan migrate --no-interaction --force"

ssh "${HOST_NAME}" "sudo /opt/bitnami/ctlscript.sh restart php-fpm"
ssh "${HOST_NAME}" "sudo supervisorctl restart all"



