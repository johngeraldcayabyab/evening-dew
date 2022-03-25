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

ssh tasteandtell umask 002
#
#scp "./builds/${BUILD_FOLDER_ZIP}" "tasteandtell:/opt/bitnami/projects/builds"
#
#ssh tasteandtell "cd /opt/bitnami/projects/builds; unzip ${BUILD_FOLDER_ZIP} -d ${BUILD_FOLDER}"
#ssh tasteandtell "rm /opt/bitnami/projects/builds/${BUILD_FOLDER_ZIP}"
#ssh tasteandtell "ln -nsf /opt/bitnami/projects/storage /opt/bitnami/projects/builds/${BUILD_FOLDER}/storage"
#
#ln -nsf /opt/bitnami/projects/builds/build_2022.03.25_15.31.20 /opt/bitnami/projects/evening-dew
#
#php artisan optimize:clear
#composer dump:autoload
#php artisan queue:restart
#
#ENV not yet organized


#sudo chown -R daemon:daemon /opt/bitnami/projects/evening-dew
#sudo find /opt/bitnami/projects/evening-dew -type f -exec chmod 644 {} \;
#sudo find /opt/bitnami/projects/evening-dew -type d -exec chmod 755 {} \;
#
#cd to project
#sudo chown -R $USER:daemon .
#sudo find . -type f -exec chmod 664 {} \;
#sudo find . -type d -exec chmod 775 {} \;
#sudo chgrp -R daemon storage bootstrap/cache
#sudo chmod -R ug+rwx storage bootstrap/cache
