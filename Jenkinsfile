pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "cicd-app-al2023"
        DOCKER_TAG = "${env.BUILD_ID}"
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out code...'
                // This is implicit for most SCM-triggered jobs
            }
        }

        stage('Build Image') {
            steps {
                script {
                    echo "Building Docker image: ${DOCKER_IMAGE}:${DOCKER_TAG}"
                    sh "docker build -t ${DOCKER_IMAGE}:${DOCKER_TAG} ."
                    sh "docker tag ${DOCKER_IMAGE}:${DOCKER_TAG} ${DOCKER_IMAGE}:latest"
                }
            }
        }

        stage('Test') {
            steps {
                echo 'Running tests inside the Docker container...'
                sh "docker run --rm ${DOCKER_IMAGE}:latest npm test"
            }
        }

        stage('Deploy') {
            steps {
                script {
                    echo 'Deploying to staging/production on EC2...'
                    // Stop and remove existing container if it exists
                    sh "docker stop ${DOCKER_IMAGE} || true"
                    sh "docker rm ${DOCKER_IMAGE} || true"
                    // Run the new container
                    sh "docker run -d --name ${DOCKER_IMAGE} -p 3000:3000 ${DOCKER_IMAGE}:latest"
                }
            }
        }
    }

    post {
        always {
            echo 'Pipeline finished.'
        }
        success {
            echo 'Success! Access your app at http://YOUR_EC2_IP:3000'
        }
        failure {
            echo 'Build failed. Check Jenkins logs.'
        }
    }
}
