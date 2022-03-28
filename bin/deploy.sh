#!/bin/sh

BUILD_FOLDER="build_$(date "+%Y.%m.%d_%H.%M.%S")"

mkdir "./builds/${BUILD_FOLDER}"

# shellcheck disable=SC2164
cd "./builds/${BUILD_FOLDER}";
git clone --depth 1 git@github.com:johngeraldcayabyab/evening-dew.git ./
composer install --no-interaction --prefer-dist --optimize-autoloader --no-dev
npm run production
rm -rf storage

BUILD_FOLDER_ZIP="${BUILD_FOLDER}.zip"

zip -r "../${BUILD_FOLDER_ZIP}" *

cd ../../

rm -rf "./builds/${BUILD_FOLDER}"

ssh evening-dew umask 002

scp "./builds/${BUILD_FOLDER_ZIP}" "evening-dew:/opt/bitnami/projects/builds"

ssh evening-dew "cd /opt/bitnami/projects/builds; unzip ${BUILD_FOLDER_ZIP} -d ${BUILD_FOLDER}"
ssh evening-dew "rm /opt/bitnami/projects/builds/${BUILD_FOLDER_ZIP}"
ssh evening-dew "ln -nsf /opt/bitnami/projects/storage /opt/bitnami/projects/builds/${BUILD_FOLDER}/storage"
ssh evening-dew "ln -nsf /opt/bitnami/projects/.env /opt/bitnami/projects/builds/${BUILD_FOLDER}/.env"



ssh evening-dew "ln -nsf /opt/bitnami/projects/builds/${BUILD_FOLDER} /opt/bitnami/projects/evening-dew"

ssh evening-dew "sudo chown -R daemon:daemon /opt/bitnami/projects/evening-dew"
ssh evening-dew "sudo find /opt/bitnami/projects/evening-dew -type f -exec chmod 644 {} \;"
ssh evening-dew "sudo find /opt/bitnami/projects/evening-dew -type d -exec chmod 755 {} \;"
ssh evening-dew "sudo chown -R bitnami:daemon /opt/bitnami/projects/storage"
ssh evening-dew "sudo chown -R bitnami:daemon /opt/bitnami/projects/evening-dew/bootstrap/cache"
ssh evening-dew "sudo chmod -R 775 /opt/bitnami/projects/storage"
ssh evening-dew "sudo chmod -R 755 /opt/bitnami/projects/evening-dew/bootstrap/cache"


ssh evening-dew "/opt/bitnami/php/bin/php /opt/bitnami/projects/evening-dew artisan optimize:clear"
ssh evening-dew "/opt/bitnami/php/bin/php /opt/bitnami/projects/evening-dew artisan clear-compiled"
ssh evening-dew "/opt/bitnami/php/bin/php /opt/bitnami/projects/evening-dew artisan config:clear"
ssh evening-dew "/opt/bitnami/php/bin/php /opt/bitnami/projects/evening-dew artisan route:clear"
ssh evening-dew "/opt/bitnami/php/bin/php /opt/bitnami/projects/evening-dew artisan view:clear"
ssh evening-dew "/opt/bitnami/php/bin/php /opt/bitnami/projects/evening-dew artisan event:clear"


ssh evening-dew "/opt/bitnami/php/bin/php /opt/bitnami/projects/evening-dew artisan optimize"
ssh evening-dew "/opt/bitnami/php/bin/php /opt/bitnami/projects/evening-dew artisan optimize:cache"
ssh evening-dew "/opt/bitnami/php/bin/php /opt/bitnami/projects/evening-dew artisan config:cache"
ssh evening-dew "/opt/bitnami/php/bin/php /opt/bitnami/projects/evening-dew artisan route:cache"
ssh evening-dew "/opt/bitnami/php/bin/php /opt/bitnami/projects/evening-dew artisan view:cache"
ssh evening-dew "/opt/bitnami/php/bin/php /opt/bitnami/projects/evening-dew artisan event:cache"

ssh evening-dew "/opt/bitnami/php/bin/php /opt/bitnami/php/bin/composer --working-dir=/opt/bitnami/projects/evening-dew dump-autoload -o"

ssh evening-dew "/opt/bitnami/php/bin/php /opt/bitnami/projects/evening-dew artisan storage:link"
ssh evening-dew "sudo /opt/bitnami/ctlscript.sh restart php-fpm"
ssh evening-dew "sudo supervisorctl restart all"
ssh evening-dew "/opt/bitnami/php/bin/php /opt/bitnami/projects/evening-dew artisan migrate --no-interaction --force"



