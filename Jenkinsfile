pipeline {
  agent {
    node {
      label 'install'
    }

  }
  stages {
    stage('install') {
      steps {
        build 'npm install'
      }
    }

  }
  environment {
    PORT = '3000'
  }
}