#!/bin/sh

BUILD_FOLDER="build_$(date "+%Y.%m.%d_%H.%M.%S")"

mkdir "./builds/${BUILD_FOLDER}"

# shellcheck disable=SC2164
cd "./builds/${BUILD_FOLDER}";  git clone --depth 1 git@github.com:johngeraldcayabyab/evening-dew.git ./

pwd

cd ../../

composer install --no-interaction --prefer-dist --optimize-autoloader --no-dev
npm run production

pwd

BUILD_FOLDER_ZIP="${BUILD_FOLDER}.zip"

zip -r "./builds/${BUILD_FOLDER_ZIP}" "./builds/${BUILD_FOLDER}"

rm -rf "./builds/${BUILD_FOLDER}"


