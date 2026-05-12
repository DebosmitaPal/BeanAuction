pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Backend') {
            steps {
                script {
                    echo 'Building Backend image...'
                    sh 'docker build -t beanauction-backend ./backend'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                script {
                    echo 'Building Frontend image...'
                    sh 'docker build -t beanauction-frontend ./frontend'
                }
            }
        }

        stage('Verify Images') {
            steps {
                script {
                    sh 'docker images | grep beanauction'
                }
            }
        }
    }

    post {
        always {
            echo 'Pipeline finished.'
        }
        success {
            echo 'Build successful!'
        }
        failure {
            echo 'Build failed. Please check logs.'
        }
    }
}
