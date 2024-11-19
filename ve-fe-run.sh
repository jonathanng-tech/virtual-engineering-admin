#!/bin/bash

# Define variables
ENV=${1:-"dev"}
IMAGE_NAME="jonathanngtech/ve-admin$ENV"
TAG="latest"
CONTAINER_NAME="ve-admin-$ENV-container"

if [ "$ENV" == "staging" ]; then
    PORT_MAPPING="9999:80"
elif [ "$ENV" == "prod" ]; then
    PORT_MAPPING="443:443"
else
    PORT_MAPPING="8888:80"
fi

# Pull the Docker image from Docker Hub
echo "Pulling the Docker image $IMAGE_NAME:$TAG..."
docker pull $IMAGE_NAME:$TAG

# Check if the image was pulled successfully
if [ $? -eq 0 ]; then
    echo "Docker image pulled successfully: $IMAGE_NAME:$TAG"
else
    echo "Failed to pull Docker image. Exiting."
    exit 1
fi

# Check if a container with the same name exists
if [ "$(docker ps -aq -f name=$CONTAINER_NAME)" ]; then
    echo "Container $CONTAINER_NAME exists. Stopping and removing the container..."

    # Stop the container if it's running
    if [ "$(docker ps -q -f name=$CONTAINER_NAME)" ]; then
        echo "Stopping running container $CONTAINER_NAME..."
        docker stop $CONTAINER_NAME
    fi

    # Remove the container
    echo "Removing container $CONTAINER_NAME..."
    docker rm $CONTAINER_NAME

    if [ $? -eq 0 ]; then
        echo "Container $CONTAINER_NAME removed successfully."
    else
        echo "Failed to remove container $CONTAINER_NAME. Exiting."
        exit 1
    fi
fi

# Run a new container from the image
echo "Running a new container $CONTAINER_NAME from the image $IMAGE_NAME:$TAG..."
if [ "$ENV" == "prod" ]; then
    docker run -d --name $CONTAINER_NAME --restart on-failure:2 -p 8080:80 -p 443:443 -v /etc/letsencrypt:/etc/letsencrypt $IMAGE_NAME:$TAG
else
    docker run -d --name $CONTAINER_NAME --restart on-failure:2 -p $PORT_MAPPING $IMAGE_NAME:$TAG
fi


# Check if the container started successfully
if [ $? -eq 0 ]; then
    echo "Container $CONTAINER_NAME started successfully."
else
    echo "Failed to start container. Exiting."
    exit 1
fi
