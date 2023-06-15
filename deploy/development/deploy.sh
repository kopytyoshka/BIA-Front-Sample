#!/usr/bin/env bash
set -e
# set -x
DEPLOY_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

REMOTE_USER=deploy
REMOTE_HOST=192.168.30.25
REMOTE_DIR=/home/deploy/apps

TARGET_SERVICE=ckhr-front
TARGET_DOMAIN=dev.ckhr.biacorp.ru

export DOCKER_IMAGE=$1
# ----------------------------------------------------------------------------------------------------------------------
echo "[INFO] Setup ssh"
eval $(ssh-agent -s)

cat $DEPLOYER_RSA | tr -d '\r' | ssh-add - > /dev/null
mkdir -p ~/.ssh
chmod 700 ~/.ssh
ssh-keyscan $REMOTE_HOST >> ~/.ssh/known_hosts
chmod 644 ~/.ssh/known_hosts
# --------------------------------------------------------
echo "[INFO] Remote host $REMOTE_HOST -> create folders"
target_folder="$REMOTE_DIR/$TARGET_DOMAIN-$TARGET_SERVICE"
ssh $REMOTE_USER@$REMOTE_HOST "mkdir -p $target_folder"
# --------------------------------------------------------
echo "[INFO] Remote host $REMOTE_HOST -> copy files"
cat $DEPLOY_DIR/docker-compose.template.yml | envsubst '${DOCKER_IMAGE}' | ssh $REMOTE_USER@$REMOTE_HOST "cat > $target_folder/docker-compose.yml"
# scp $DEPLOY_DIR/config.js $REMOTE_USER@$REMOTE_HOST:$target_folder/
# scp $DEPLOY_DIR/default.conf $REMOTE_USER@$REMOTE_HOST:$target_folder/
# --------------------------------------------------------
echo "[INFO] Remote host $REMOTE_HOST -> run deploy"

image_exist=$(ssh $REMOTE_USER@$REMOTE_HOST "docker images --format '{{.Repository}}:{{.Tag}}' | grep $DOCKER_IMAGE" || true)
if [ ! "$image_exist" ];then
  echo "[INFO] Upload docker image $DOCKER_IMAGE to $REMOTE_HOST"
  docker save $DOCKER_IMAGE | bzip2 | ssh $REMOTE_USER@$REMOTE_HOST docker load
fi

echo "[INFO] Validate docker-compose.yml file"
ssh $REMOTE_USER@$REMOTE_HOST "cd $target_folder && docker-compose config -q"

echo "[INFO] Apply docker-compose.yml"
ssh $REMOTE_USER@$REMOTE_HOST "cd $target_folder && docker-compose up -d"

echo "[INFO] Remove unused images"
ssh $REMOTE_USER@$REMOTE_HOST "docker image prune --all --force"
