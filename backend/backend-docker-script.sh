#!/bin/bash

# Script: backend-docker-script.sh
# Description: Automates Docker command for setting up backend container with networking.
# Author: Rupesh Dulal
# Date: 2024-02-23

# Set strict mode for better error handling
set -euo pipefail

# Define variables
NETWORK_NAME="devops"
DOCKERHUB_USERNAME="rupesh1997"
BACKEND_IMAGE="backend"
IMAGE_VERSION="1.0.0"
CONTAINER_NAME="backend"
BACKEND_PORT="8181:8181"
MYSQL_CONTAINER_NAME="mysql"

# Function to log messages
log_message() {
  local message="$1"
  echo "$(date +'%Y-%m-%d %H:%M:%S') - $message"
}

# Function to check if a Docker container is running
is_container_running() {
  local container_name="$1"
  docker ps --filter "name=$container_name" --format "{{.Names}}" | grep -q "^${container_name}$"
}

# Function to stop and remove a Docker container
stop_and_remove_container() {
  local container_name="$1"
  if is_container_running "$container_name"; then
    log_message "Stopping and removing $container_name container."
    docker kill "$container_name" >/dev/null 2>&1 || true
    docker rm "$container_name" >/dev/null 2>&1 || true
  else
    log_message "$container_name container is not running."
  fi
}

# Function to check if a Docker network exists, if not create it
ensure_network_exists() {
  local network_name="$1"
  if ! docker network ls --format "{{.Name}}" | grep -q "^${network_name}$"; then
    log_message "Creating Docker network: ${network_name}"
    docker network create "$network_name"
  else
    log_message "Docker network ${network_name} already exists."
  fi
}

# Function to build a Docker image
build_docker_image() {
  local image_name="$1"
  local dockerfile_path="$2"
  log_message "Building Docker image: $image_name"
  docker build -t "$image_name" -f "$dockerfile_path" .
}

# Function to check if MySQL container is running
check_mysql_container() {
  if ! is_container_running "$MYSQL_CONTAINER_NAME"; then
    log_message "MySQL container ($MYSQL_CONTAINER_NAME) is not running. Please start it first."
    exit 1
  else
    log_message "MySQL container ($MYSQL_CONTAINER_NAME) is running."
  fi
}

# Function to run a Docker container
run_docker_container() {
  local container_name="$1"
  local image_name="$2"
  local port_mapping="$3"
  local network_name="$4"

  log_message "Running Docker container: ${container_name}"
  docker run -d -p "$port_mapping" --name "$container_name" --network "$network_name" "$image_name"
#  docker run -d \
#    --name "$container_name" \
#    --network "$network_name" \
#    -p "$port_mapping" \
#    --platform linux/amd64 \
#    "$image_name"
}

# Function to clean up unused Docker resources
cleanup_unused_resources() {
  log_message "Cleaning up unused Docker resources..."
  docker system prune -f
  log_message "Unused Docker resources cleaned up."
}

# Main script logic
main() {
  log_message "Starting Docker automation script..."

  # Ensure required Docker network exists
  ensure_network_exists "$NETWORK_NAME"

  # Check if MySQL container is running
  check_mysql_container

  # Stop and remove existing backend container (if running)
  stop_and_remove_container "$CONTAINER_NAME"

  # Build backend Docker image
  build_docker_image "$DOCKERHUB_USERNAME/$BACKEND_IMAGE:$IMAGE_VERSION" "../docker/backend/Dockerfile"

  # Run backend container with network
  run_docker_container "$CONTAINER_NAME" "$DOCKERHUB_USERNAME/$BACKEND_IMAGE:$IMAGE_VERSION" "$BACKEND_PORT" "$NETWORK_NAME"

  # Clean up unused Docker resources
  cleanup_unused_resources

  log_message "Docker automation script completed successfully"
}

# Execute main function
main