cd /testing-jpl-sqaaas
#Create env.js file

#Install ghp-import

apt-get update
apt-get -y install ghp-import
apt-get -y install python-pip
pip install setuptools 
git branch -a
#Clone repository
#git clone https://github.com/EOSC-synergy/sqaaas-web.git
#cd sqaaas-web
#git branch -a


echo 'module.exports = {
    provider_url: "https://aai-dev.egi.eu",
    client_id: "10333f08-7e8f-4cc4-bba0-e66f4e5505d0",        
    redirect_uri: "https://eosc-synergy.github.io/sqaaas-web/callback",
    url_authorize: "https://aai-dev.egi.eu/oidc/authorize",
    url_user_info: "https://aai-dev.egi.eu/oidc/userinfo",
}' > src/env.js

#Install dependencies
npm install

#Create static website
npm run build

git config --global user.email "dianamariand92@gmail.com"
git config --global user.name "dianamariand92"
git config credential.helper '!f() { sleep 1; echo "username=${GIT_USER}"; echo "password=${GIT_PASSWORD}"; }; f'

ghp-import -p dist/

