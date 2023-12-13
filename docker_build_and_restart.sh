#!/bin/bash

# GitHub Repository und Branch
# repository="dein-github-repository"
branch="server-live-deploy"

# Docker Container stoppen und löschen
echo "Stoppen und Löschen des aktuellen Docker Containers..."
docker stop shared_desk
docker rm shared_desk

# GitHub Repository aktualisieren
echo "GitHub Repository aktualisieren..."
git pull origin $branch

# Docker Image erstellen
echo "Docker Image erstellen..."
docker build -t shared_desk_image .

# Docker Container mit dem neuen Image starten
echo "Starten des Docker Containers mit dem neuen Image..."
docker run -d --name shared_desk -p 5000:5000 shared_desk_image
