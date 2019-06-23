@Library('github-release-helpers@v0.2.1')
def releaseInfo

pipeline {
  agent {
		docker "paultrampert/node-chrome-firefox"
	};

  options {
    buildDiscarder(logRotator(numToKeepStr:'5'))
  }

	environment {
		HOME = "$WORKSPACE"
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
						'react-form-context',
						'v',
						'Github User/Pass'
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
					'react-form-context',
					releaseInfo,
					'v',
					'Github User/Pass'
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