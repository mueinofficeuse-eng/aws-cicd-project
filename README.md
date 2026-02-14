# 🚀 Full Stack CI/CD Pipeline on Amazon Linux 2023

This project demonstrates a professional CI/CD pipeline built on **Amazon Linux 2023** using Jenkins, Docker, and GitHub. It automates the building, testing, and deployment of a modern Node.js application.

---

## � Phase 1: Infrastructure Setup (EC2)

Connect to your Amazon Linux 2023 instance and run the following commands.

### 1. Install Java 21, Git & Docker (Base Requirements)
```bash
# Update system and install Git
sudo dnf update -y
sudo dnf install git -y

# Install Java 21 (Latest LTS for Jenkins)
sudo dnf install java-21-amazon-corretto -y

# Install Docker
sudo dnf install docker -y
sudo systemctl enable docker
sudo systemctl start docker
```

### 2. Install Jenkins
```bash
# Register Jenkins Repository
sudo wget -O /etc/yum.repos.d/jenkins.repo https://pkg.jenkins.io/redhat-stable/jenkins.repo
sudo rpm --import https://pkg.jenkins.io/redhat-stable/jenkins.io-2023.key

# Install and Start Jenkins
sudo dnf upgrade -y
sudo dnf install jenkins -y
sudo systemctl enable jenkins
sudo systemctl start jenkins
```

### 3. Permissions & Groups (Crucial Integration)
Jenkins needs permission to talk to Docker. Run these commands:
```bash
sudo usermod -aG docker jenkins
sudo usermod -aG docker ec2-user
# Restart Jenkins to apply group changes
sudo systemctl restart jenkins
```

---

## ⚙️ Phase 2: Jenkins Global Configuration

Before running your first build, you must unblock the Jenkins engine.

### 1. Enable Executors (Fix "Still waiting to schedule task")
1. Go to **Manage Jenkins** > **Nodes**.
2. Click **Configure** (Gear icon) on **Built-in Node**.
3. Set **Number of executors** to `2`.
4. Set **Usage** to `Use this node as much as possible`.

### 2. Bypass Disk Space Thresholds (AL2023 /tmp fix)
If the node is offline due to "Disk space below 1GiB":
1. Go to **Manage Jenkins** > **Nodes** > **Configure Monitors**.
2. Set **Free Disk Space Threshold** to `100MiB`.
3. Set **Free Temp Space Threshold** to `100MiB`.
4. Return to **Nodes** > click **Built-in Node** > **Bring this node online**.

---

## 🔗 Phase 3: Project Integration (GitHub & Pipeline)

### 1. AWS Security Groups
Ensure your EC2 Security Group allows:
- `8080`: Jenkins UI
- `3000`: Live Application
- `22`: SSH Access

### 2. Create the Pipeline Job
1. **New Item** > **Pipeline** > Name it `AL2023-CICD`.
2. **Build Triggers**: Check `GitHub hook trigger for GITScm polling`.
3. **Pipeline Section**:
   - **Definition**: Pipeline script from SCM
   - **SCM**: Git
   - **Repository URL**: `https://github.com/your-username/your-repo.git`
   - **Branch**: `*/main`
   - **Script Path**: `Jenkinsfile`

### 3. Setup Automation (Webhook)
- **GitHub** > **Settings** > **Webhooks** > **Add webhook**.
- **Payload URL**: `http://YOUR_EC2_IP:8080/github-webhook/`
- **Content type**: `application/json`.
*Note: If you get a 403 error, verify your Jenkins security settings or use **Poll SCM** instead.*

---

## 🧪 Pipeline logic (Jenkinsfile)

The pipeline is defined in a `Jenkinsfile` in the root of the repo. It handles:
- **Build**: Creates a Docker image named `cicd-app-al2023`.
- **Test**: Runs `npm test` **inside** the Docker container (No need to install Node.js on EC2).
- **Deploy**: Automatically replaces the old container with the new version on **Port 3000**.

---

## 🆘 Troubleshooting Common Issues

| Error | Cause | Solution |
| :--- | :--- | :--- |
| `npm not found` | Running test on host | Use `docker run <image> npm test` in Jenkinsfile |
| `Permission Denied (Docker)` | Jenkins user rights | `sudo usermod -aG docker jenkins && restart jenkins` |
| `403 Webhook Forbidden` | CSRF Security | Enable 'Proxy Compatibility' in Jenkins Security |
| `Still waiting to schedule` | 0 Executors | Set executors to 2 in Node configurations |

---

## � Project Structure
- `app.js`: premium Node.js application code.
- `Jenkinsfile`: Automation pipeline script.
- `Dockerfile`: Container configuration.
- `setup.sh`: One-click software installer.
- `package.json`: Dependencies & metadata.
