#!/bin/sh

HOST_NAME="$1"

echo "${HOST_NAME}"

BUILD_FOLDER="build_$(date "+%Y.%m.%d_%H.%M.%S")"

mkdir "./builds/${BUILD_FOLDER}"

# shellcheck disable=SC2164
cd "./builds/${BUILD_FOLDER}";
#git clone --depth 1 git@github.com:johngeraldcayabyab/evening-dew.git ./
#composer install --no-interaction --prefer-dist --optimize-autoloader --no-dev
#npm run production
#rm -rf storage
#
#BUILD_FOLDER_ZIP="${BUILD_FOLDER}.zip"
#
#zip -r "../${BUILD_FOLDER_ZIP}" *
#
#cd ../../
#
#rm -rf "./builds/${BUILD_FOLDER}"
#
#ssh "${HOST_NAME}" umask 002
#
#scp "./builds/${BUILD_FOLDER_ZIP}" "${HOST_NAME}:/opt/bitnami/projects/builds"
#
#ssh "${HOST_NAME}" "cd /opt/bitnami/projects/builds; unzip ${BUILD_FOLDER_ZIP} -d ${BUILD_FOLDER}"
#ssh "${HOST_NAME}" "rm /opt/bitnami/projects/builds/${BUILD_FOLDER_ZIP}"
#ssh "${HOST_NAME}" "ln -nsf /opt/bitnami/projects/storage /opt/bitnami/projects/builds/${BUILD_FOLDER}/storage"
#ssh "${HOST_NAME}" "ln -nsf /opt/bitnami/projects/.env /opt/bitnami/projects/builds/${BUILD_FOLDER}/.env"
#
#
#
#ssh "${HOST_NAME}" "ln -nsf /opt/bitnami/projects/builds/${BUILD_FOLDER} /opt/bitnami/projects/${HOST_NAME}"
#
#ssh "${HOST_NAME}" "sudo chown -R daemon:daemon /opt/bitnami/projects/${HOST_NAME}"
#ssh "${HOST_NAME}" "sudo find /opt/bitnami/projects/${HOST_NAME} -type f -exec chmod 644 {} \;"
#ssh "${HOST_NAME}" "sudo find /opt/bitnami/projects/${HOST_NAME} -type d -exec chmod 755 {} \;"
#ssh "${HOST_NAME}" "sudo chown -R bitnami:daemon /opt/bitnami/projects/storage"
#ssh "${HOST_NAME}" "sudo chown -R bitnami:daemon /opt/bitnami/projects/${HOST_NAME}/bootstrap/cache"
#ssh "${HOST_NAME}" "sudo chmod -R 775 /opt/bitnami/projects/storage"
#ssh "${HOST_NAME}" "sudo chmod -R 755 /opt/bitnami/projects/${HOST_NAME}/bootstrap/cache"
#
#
#ssh "${HOST_NAME}" "/opt/bitnami/php/bin/php /opt/bitnami/projects/${HOST_NAME} artisan optimize:clear"
#ssh "${HOST_NAME}" "/opt/bitnami/php/bin/php /opt/bitnami/projects/${HOST_NAME} artisan clear-compiled"
#ssh "${HOST_NAME}" "/opt/bitnami/php/bin/php /opt/bitnami/projects/${HOST_NAME} artisan config:clear"
#ssh "${HOST_NAME}" "/opt/bitnami/php/bin/php /opt/bitnami/projects/${HOST_NAME} artisan route:clear"
#ssh "${HOST_NAME}" "/opt/bitnami/php/bin/php /opt/bitnami/projects/${HOST_NAME} artisan view:clear"
#ssh "${HOST_NAME}" "/opt/bitnami/php/bin/php /opt/bitnami/projects/${HOST_NAME} artisan event:clear"
#
#
#ssh "${HOST_NAME}" "/opt/bitnami/php/bin/php /opt/bitnami/projects/${HOST_NAME} artisan optimize"
#ssh "${HOST_NAME}" "/opt/bitnami/php/bin/php /opt/bitnami/projects/${HOST_NAME} artisan optimize:cache"
#ssh "${HOST_NAME}" "/opt/bitnami/php/bin/php /opt/bitnami/projects/${HOST_NAME} artisan config:cache"
#ssh "${HOST_NAME}" "/opt/bitnami/php/bin/php /opt/bitnami/projects/${HOST_NAME} artisan route:cache"
#ssh "${HOST_NAME}" "/opt/bitnami/php/bin/php /opt/bitnami/projects/${HOST_NAME} artisan view:cache"
#ssh "${HOST_NAME}" "/opt/bitnami/php/bin/php /opt/bitnami/projects/${HOST_NAME} artisan event:cache"
#
#ssh "${HOST_NAME}" "/opt/bitnami/php/bin/php /opt/bitnami/php/bin/composer --working-dir=/opt/bitnami/projects/${HOST_NAME} dump-autoload -o"
#
#ssh "${HOST_NAME}" "/opt/bitnami/php/bin/php /opt/bitnami/projects/${HOST_NAME} artisan storage:link"
#ssh "${HOST_NAME}" "sudo /opt/bitnami/ctlscript.sh restart php-fpm"
#ssh "${HOST_NAME}" "sudo supervisorctl restart all"
#ssh "${HOST_NAME}" "/opt/bitnami/php/bin/php /opt/bitnami/projects/${HOST_NAME} artisan migrate --no-interaction --force"



