old_version=$(grep version package.json)

echo "Old versions number: $old_version"
read -p "Enter the new version number (i.e. 2.3.5): " new_version

echo "Bumping to $new_version in package.json and src/main.ts"
sed -i "s/\"version\":.*/\"version\": \"$new_version\",/" package.json
sed -i "s/const version.*/const version = \"$new_version\";/" src/main.ts 

npm run build

git add .
git commit

commit_id=$(git log | head -n1 | awk '{print $2}')

git tag -a v$new_version $commit_id

echo "Once you're certain about your changes, run these commands:"

echo "git push origin v$new_version"
echo "git push origin master"
echo "npm publish"
