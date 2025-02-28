#!/bin/bash

# Script: mysql-docker-script.sh
# Description: Automates Docker command for setting up MySQL container with networking and volume.
# Author: Rupesh Dulal
# Date: 2024-02-23

# Set strict mode for better error handling
set -euo pipefail

# Define variables
NETWORK_NAME="devops"
MYSQL_IMAGE="mysql:8.0"
MYSQL_CONTAINER_NAME="mysql"
MYSQL_ROOT_PASSWORD="root"
MYSQL_DATABASE="movie_db"
MYSQL_PORT="3306:3306"
MYSQL_VOLUME="mysql_data"

# Function to log messages
log_message() {
  local message="$1"
  echo "$(date +'%Y-%m-%d %H:%M:%S') - $message"
}

# Function to check if the Docker container is running
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

# Function to check if a Docker volume exists, if not create it
ensure_volume_exists() {
  local volume_name="$1"
  if ! docker volume ls --format "{{.Name}}" | grep -q "^${volume_name}$"; then
    log_message "Creating Docker volume: ${volume_name}"
    docker volume create "$volume_name"
  else
    log_message "Docker volume ${volume_name} already exists."
  fi
}

# Function to run a Docker container
run_docker_container() {
  local container_name="$1"
  local image_name="$2"
  local port_mapping="$3"
  local network_name="$4"
  local volume_mapping="$5"
  local env_vars="${6:-}"

  log_message "Running Docker container: ${container_name}"
  docker run -d \
    --name "$container_name" \
    --network "$network_name" \
    -p "$port_mapping" \
    -v "$volume_mapping" \
    -e MYSQL_ROOT_PASSWORD="$MYSQL_ROOT_PASSWORD" \
    -e MYSQL_DATABASE="$MYSQL_DATABASE" \
    "$image_name"
}

# Function to clean up unused Docker resources
cleanup_unused_resources() {
  log_message "Cleaning up unused Docker resources..."
  docker system prune -f
  log_message "Unused Docker resources cleaned up."
}

# Main script logic
main() {
  log_message "Starting Docker automation script"

  # Ensure required Docker network and volume exist
  ensure_network_exists "$NETWORK_NAME"
  ensure_volume_exists "$MYSQL_VOLUME"

  # Stop and remove existing MySQL container (if running)
  stop_and_remove_container "$MYSQL_CONTAINER_NAME"

  # Run MySQL container with volume and network
  run_docker_container "$MYSQL_CONTAINER_NAME" "$MYSQL_IMAGE" "$MYSQL_PORT" "$NETWORK_NAME" "$MYSQL_VOLUME:/var/lib/mysql"

  # Clean up unused Docker resources
  cleanup_unused_resources

  log_message "Docker automation script completed successfully"
}

# Execute main function
main
