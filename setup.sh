#!/bin/bash

# Update system
echo "Updating system..."
sudo dnf update -y

# Install Java 21 (Latest LTS, Recommended for Jenkins in 2026)
echo "Installing Java 21..."
sudo dnf install java-21-amazon-corretto -y
# Add Jenkins Repository
echo "Configuring Jenkins Repo..."
sudo wget -O /etc/yum.repos.d/jenkins.repo \
    https://pkg.jenkins.io/redhat-stable/jenkins.repo
sudo rpm --import https://pkg.jenkins.io/redhat-stable/jenkins.io-2023.key

# Install Jenkins
echo "Installing Jenkins..."
sudo dnf install jenkins -y

# Enable and Start Jenkins
echo "Starting Jenkins..."
sudo systemctl enable jenkins
sudo systemctl start jenkins

# Install Docker
echo "Installing Docker..."
sudo dnf install docker -y
sudo systemctl enable docker
sudo systemctl start docker

# Add Jenkins user to Docker group
echo "Adding Jenkins user to Docker group..."
sudo usermod -aG docker jenkins
sudo usermod -aG docker ec2-user

# Restart Jenkins to apply group changes
sudo systemctl restart jenkins

echo "----------------------------------------------------"
echo "Installation Complete!"
echo "Access Jenkins at: http://$(curl -s ifconfig.me):8080"
echo "Initial Admin Password:"
sudo cat /var/lib/jenkins/secrets/initialAdminPassword
echo "----------------------------------------------------"
