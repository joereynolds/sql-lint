old_version=$(grep version package.json)

echo "Old versions number: $old_version"
read -p "Enter the new version number (i.e. 2.3.5): " new_version

echo "Bumping to $new_version in package.json"
sed -i "s/\"version\":.*/\"version\": \"$new_version\"/" package.json

npm run start

git add .
git commit

commit_id=$(git log | head -n1 | awk '{print $2}')

git tag -a v$new_version $commit_id

echo "Once you're certain about your changes, run these commands:"

echo "git push origin v$new_version typescript"
echo "npm publish"
