pipeline {
    agent any

    environment {
        SONAR_HOME = tool name: 'sonar', type: 'hudson.plugins.sonar.SonarRunnerInstallation'
        DOCKER_HUB_CREDENTIALS = credentials('docker-hub-credentials') // Jenkins credentials ID for Docker Hub
        DOCKER_HUB_REPO = "rupesh1997" // Docker Hub repository
        BACKEND_IMAGE_NAME = "${DOCKER_HUB_REPO}/backend"
        FRONTEND_IMAGE_NAME = "${DOCKER_HUB_REPO}/frontend"
        BACKEND_VERSION = "1.0.0" // Backend image version
        FRONTEND_VERSION = "1.0.0" // Frontend image version
    }

    stages {
        // Stage 1: Clone the repository
        stage("Clone repository") {
            steps {
                git url: "https://github.com/rupesh-hub/movie-service-devops.git", branch: "main"
            }
        }

        // Stage 2: Build and Test Backend
        stage("Build Project") {
            steps {
                dir("backend") {
                    sh "mvn clean compile" // Compile the backend
                }
            }
        }

        // Stage 3: SonarQube Quality Analysis
        stage("SonarQube Quality Analysis") {
            steps {
                withSonarQubeEnv("Sonar") {
                    sh """
                        ${SONAR_HOME}/bin/sonar-scanner \
                        -Dsonar.projectName=MovieWatch \
                        -Dsonar.projectKey=MovieWatch \
                        -Dsonar.java.binaries=target/classes
                    """
                }
            }
        }

        // Stage 4: OWASP Dependency Check
        stage("OWASP Dependency check") {
            steps {
                dependencyCheck additionalArguments: '--scan ./', odcInstallation: 'dependencyCheck'
                dependencyCheckPublisher pattern: '**/dependency-check-report.xml'
            }
        }

        // Stage 5: Sonar Quality Gate Scan
        stage("Sonar Quality Gate Scan") {
            steps {
                timeout(time: 2, unit: "MINUTES") {
                    waitForQualityGate abortPipeline: false
                }
            }
        }

        // Stage 6: Trivy File System Scan
        stage("Trivy File System Scan") {
            steps {
                sh "trivy fs --format table -o trivy-scan-fs-report.html ."
            }
        }

        // Stage 7: Build Backend Docker Image
        stage("Build Backend Docker Image") {
            steps {
                dir("backend") {
                    sh "docker build -t ${BACKEND_IMAGE_NAME}:${BACKEND_VERSION} -f docker/backend/Dockerfile ."
                }
            }
        }

        // Stage 8: Build Frontend Docker Image
        stage("Build Frontend Docker Image") {
            steps {
                dir("frontend") {
                    sh "npm install"
                    sh "npm run build"
                    sh "docker build -t ${FRONTEND_IMAGE_NAME}:${FRONTEND_VERSION} -f docker/frontend/Dockerfile ."
                }
            }
        }

       // Stage 9: Push Images to Docker Hub
       stage("Push Images to Docker Hub") {
           steps {
               withCredentials([usernamePassword(credentialsId: 'docker-hub-credentials', usernameVariable: 'DOCKER_HUB_USER', passwordVariable: 'DOCKER_HUB_PASSWORD')]) {
                   sh "echo ${DOCKER_HUB_PASSWORD} | docker login -u ${DOCKER_HUB_USER} --password-stdin"
                   sh "docker push ${BACKEND_IMAGE_NAME}:${BACKEND_VERSION}"
                   sh "docker push ${FRONTEND_IMAGE_NAME}:${FRONTEND_VERSION}"
               }
           }
       }

        // Stage 10: Deploy using Docker Compose
        stage("Deploy using Docker Compose") {
            steps {
                sh "docker compose down" // Stop and remove existing containers
                sh "docker compose up -d" // Start containers in detached mode
            }
        }
    }

    post {
        success {
            echo "Pipeline succeeded! Application is deployed."
        }
        failure {
            echo "Pipeline failed. Check the logs for details."
        }
    }
}