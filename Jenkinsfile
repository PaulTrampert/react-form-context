def releaseInfo

pipeline {
  agent any;

  options {
    buildDiscarder(logRotator(numToKeepStr:'5'))
  }

  stages {
		stage('Build Release Info') {
			when {
				expression {env.BRANCH_NAME == 'master'}
			}
			
			steps {
				script{
					releaseInfo = generateGithubReleaseInfo(
						'PaulTrampert',
						'flatitude',
						'v',
						'github_token'
					)

					echo releaseInfo.nextVersion().toString()
					echo releaseInfo.changelogToMarkdown()
				}
			}
		}

    stage('Restore') {
      steps {
        sh 'npm install'
      }
    }

    stage('Build') {
      steps {
        sh 'npm run build'
      }
    }

    stage('Test') {
      steps {
        sh 'npm run test-ci'
      }
    }
    

		stage('Publish') {
			when {
				expression {env.BRANCH_NAME == 'master'}
			}

			steps {
				script {
					def packageJson = readJSON file: 'package.json'
					packageJson.version = releaseInfo.nextVersion().toString()
					writeJSON file: 'package.json', json: packageJson, pretty: 2
				}
				sh 'npm publish'
				publishGithubRelease(
					'PaulTrampert',
					'flatitude',
					releaseInfo,
					'v',
					'github_token'
				)
			}
		}
  }
  
  post {
    failure {
      mail to: 'paul.trampert@gmail.com', subject: "Build status of ${env.JOB_NAME} changed to ${currentBuild.result}", body: "Build log may be found at ${env.BUILD_URL}"
    }
    always {
      archiveArtifacts 'dist/**/*'
      step(
				[
					$class: 'XUnitBuilder', 
					testTimeMargin: '60000', 
					thresholdMode: 1, 
					thresholds: [
						[
							$class: 'FailedThreshold', 
							failureNewThreshold: '', 
							failureThreshold: '', 
							unstableNewThreshold: '', 
							unstableThreshold: '0'
						], 
						[
							$class: 'SkippedThreshold', 
							failureNewThreshold: '', 
							failureThreshold: '', 
							unstableNewThreshold: '', 
							unstableThreshold: ''
						]
					], 
					tools: [
						[
							$class: 'JUnitType', 
							deleteOutputFiles: true, 
							failIfNotNew: true, 
							pattern: 'testReports/**/*', 
							skipNoTestFiles: false, 
							stopProcessingIfError: true
						]
					]
				]
			)
      deleteDir()
    }
  }

}