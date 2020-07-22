cd /testing
#Create env.js file

#Install ghp-import

#apt-get update
#apt-get -y install ghp-import
#apt-get -y install python-pip
#pip install setuptools
git branch -a
#Clone repository
#git clone https://github.com/EOSC-synergy/sqaaas-web.git
#cd sqaaas-web
#git branch -a

#Install dependencies
npm install

#Create static website
npm run build

git config --global user.email "dianamariand92@gmail.com"
git config --global user.name "dianamariand92"
#Git version 1.7.9 and later
#git config credential.helper '!f() { sleep 1; echo "username=${GIT_USER}"; echo "password=${GIT_PASSWORD}"; }; f'
#git config core.askpass /testing-jpl-sqaaas/.git_credential_helper.sh

GIT_ASKPASS="/testing/.git_credential_helper.sh" ghp-import -p dist/

