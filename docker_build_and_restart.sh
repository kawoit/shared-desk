#!/bin/bash

# GitHub Repository und Branch
# repository="dein-github-repository"
branch="server-live-deploy"
image_name="shared-desk-image"
container_name="shared-desk"

#stop script on error
set -e

# Docker Container stoppen und löschen
echo "Stoppen und Löschen des aktuellen Docker Containers..."
docker stop $container_name
docker rm $container_name

# GitHub Repository aktualisieren
echo "GitHub Repository aktualisieren..."
git pull origin $branch

# Docker Image erstellen
echo "Docker Image erstellen..."
docker build -t $image_name .

# Docker Container mit dem neuen Image starten
echo "Starten des Docker Containers mit dem neuen Image..."
docker run -d --name $container_name -p 5000:5000 $image_name
