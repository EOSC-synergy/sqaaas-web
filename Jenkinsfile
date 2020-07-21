@Library(['github.com/indigo-dc/jenkins-pipeline-library@release/2.1.0']) _

def projectConfig

pipeline {
    agent any

    stages {
        stage('SQA baseline dynamic stages') {
            when {
                anyOf {
                    branch 'refs/heads/*'
                    buildingTag()
                    not { changeRequest() }
                }
            }
            steps {
                script {
                    projectConfig = pipelineConfig('./.sqa/config.yml',  'https://github.com/eosc-synergy/sqaaas-web.git', 'jpl-branch', 'userpass_sqaaas_web', 'eoscsynergy/jpl-validator:jib-with-jpl')
                    buildStages(projectConfig)
                }
            }
            post {
                cleanup {
                    cleanWs()
                }
            }
        }
    }
}
