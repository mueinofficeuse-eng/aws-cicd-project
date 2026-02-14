# Jenkins CI/CD on Amazon Linux 2023

This project provides a complete setup and pipeline for Jenkins running on AWS Amazon Linux 2023.

## 🚀 Setup Instructions for EC2

Connect to your Amazon Linux 2023 instance and run the following commands to install Jenkins and Docker.

### 1. Install Java 21 (Recommended LTS)
```bash
sudo dnf update -y
sudo dnf install java-21-amazon-corretto -y
```

### 2. Install Jenkins
```bash
sudo wget -O /etc/yum.repos.d/jenkins.repo \
    https://pkg.jenkins.io/redhat-stable/jenkins.repo
sudo rpm --import https://pkg.jenkins.io/redhat-stable/jenkins.io-2023.key
sudo dnf upgrade
sudo dnf install jenkins -y
sudo systemctl enable jenkins
sudo systemctl start jenkins
```

### 3. Install Docker
```bash
sudo dnf install docker -y
sudo systemctl enable docker
sudo systemctl start docker
sudo usermod -aG docker jenkins
sudo usermod -aG docker ec2-user
```

### 4. Setup Post-Installation & CI/CD Pipeline

Once the software is installed, follow these detailed steps to get your first pipeline running:

#### Step A: Unlock Jenkins
1. Access Jenkins via your browser: `http://YOUR_EC2_IP:8080` (Ensure port 8080 is open in your AWS Security Group).
2. Get the password from your terminal:
   ```bash
   sudo cat /var/lib/jenkins/secrets/initialAdminPassword
   ```
3. Paste the password and click **Continue**.

#### Step B: Install Plugins
1. Click **"Install suggested plugins"** and wait for the process to finish.
2. After creating your Admin User, go to **Manage Jenkins** > **Plugins** > **Available Plugins**.
3. Search for and install the following (Select "Install without restart"):
   - `Docker`
   - `Docker Pipeline`
   - `NodeJS` (Optional, as we use Docker for builds, but good to have).

#### Step C: Configure AWS Security Groups
Make sure your EC2 Security Group has these ports open:
- `8080`: Jenkins Web UI
- `3000`: Your running Application (deployed by the pipeline)
- `22`: SSH access

#### Step D: Create your First Pipeline Job
1. On the Jenkins Dashboard, click **New Item**.
2. Name it `premium-cicd-app`, select **Pipeline**, and click **OK**.
3. Scroll down to the **Pipeline** section.
4. Set **Definition** to `Pipeline script from SCM`.
5. Set **SCM** to `Git`.
6. Enter your **Repository URL** (e.g., `https://github.com/your-username/your-repo.git`).
7. Ensure the **Branch Specifier** matches your branch (usually `*/main`).
8. Ensure **Script Path** is set to `Jenkinsfile`.
9. Click **Save**.

#### Step E: Run the Pipeline
1. Click **Build Now** on the left menu.
2. Watch the **Stage View** as Jenkins:
   - Pulls your code.
   - Builds the Docker Image.
   - Runs tests.
   - Deploys the App.
3. Once successful (green), visit: `http://YOUR_EC2_IP:3000` to see your running app!

## 🛠 Project Structure
- `app.js`: Simple Node.js application.
- `package.json`: Project dependencies.
- `Jenkinsfile`: CI/CD pipeline definition (The brain of your automation).
- `Dockerfile`: Containerization instructions.
- `setup.sh`: Automated installer for AL2023.
