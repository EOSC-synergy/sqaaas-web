cd /testing-jpl-sqaaas
#Create env.js file

git clone https://$GITHUB_TOKEN@github.com/EOSC-synergy/sqaaas-web.git
cd sqaaas-web
git branch -a
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

#Go to the dist folder of the gh-pages branch
git checkout origin/gh-pages
cd dist/
cp -R * ../
cd ..

#Push changes to gh-pages branch
git add *
git commit -m "Updating web in gh-pages branch"
git push -u origin gh-pages
