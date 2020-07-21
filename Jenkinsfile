@Library(['github.com/indigo-dc/jenkins-pipeline-library@feature/private-repositories']) _

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
                    projectConfig = pipelineConfig('./.sqa/config.yml', null, null, 'userpass_sqaaas_web', 'eoscsynergy/jpl-validator:jib-with-jpl')
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
