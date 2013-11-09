###
### Deployment script for codeship
###
### The variables listed below must be defined via codeship env variables.
###
### GH_TOKEN=[TOKEN]
### GH_OWNER=GeBeater
### GH_REPO_NAME=edinerguide
### GH_REPO_URI=git@github.com:GeBeater/edinerguide.git
###
### variables and config
###
git config --global user.email "$CI_COMMITTER_EMAIL"
git config --global user.name "$CI_NAME - $CI_COMMITTER_NAME"
RELEASE_VERSION=$(cat VERSION.txt)
RELEASE_BINARY=$GH_REPO_NAME-$RELEASE_VERSION.zip
ENTIRE_REPO_PATH=${HOME}/src/github.com/$GH_OWNER/${GH_REPO_NAME}_ENTIRE
##
## create a build
##
grunt build
BUILD_PATH=${HOME}/clone/dist
##
## deploy build
##
rm -rf ${ENTIRE_REPO_PATH}
git clone $GH_REPO_URI ${ENTIRE_REPO_PATH}
cd ${ENTIRE_REPO_PATH}
git checkout -qf gh-pages
git rm -rf ${ENTIRE_REPO_PATH}/*
touch CNAME
echo "edinerguide.de" > CNAME
cp -rf ${BUILD_PATH}/* ${ENTIRE_REPO_PATH}
git add .
git commit -a -m "[CI] deploy ${RELEASE_VERSION} via $CI_NAME --skip-ci"
git push origin gh-pages --force
##
## update master branch (master have to represent the deployed code base (next branch))
##
cd ${HOME}
rm -rf ${ENTIRE_REPO_PATH}
git clone $GH_REPO_URI ${ENTIRE_REPO_PATH}
cd ${ENTIRE_REPO_PATH}
git checkout -B master next
git reset -q ${CI_COMMIT_ID}
git commit --amend -m "$(git log -1 --pretty=%B) [CI modifikation] --skip-ci" --allow-empty
git push origin :master
git push origin master --force
##
## create release binary and archive
##
cd ${BUILD_PATH}
zip -r ../${RELEASE_BINARY} .
cd ..
wget http://stedolan.github.io/jq/download/linux64/jq
chmod +x jq
RELEASE_DATA="{\"tag_name\": \"$RELEASE_VERSION\", \"name\": \"release v${RELEASE_VERSION}\", \"target_commitish\": \"master\"}"
RELEASE_API_URI="https://api.github.com/repos/$GH_OWNER/$GH_REPO_NAME/releases"
RELEASE_ID=$(curl -s -H "Authorization: token $GH_TOKEN" -H "Content-Type: application/json" -X POST --data "$RELEASE_DATA" $RELEASE_API_URI | ./jq '.id')
curl -H "Authorization: token $GH_TOKEN" -H "Content-Type: application/zip" --data-binary @$RELEASE_BINARY "https://uploads.github.com/repos/$GH_OWNER/$GH_REPO_NAME/releases/$RELEASE_ID/assets?name=$RELEASE_BINARY"