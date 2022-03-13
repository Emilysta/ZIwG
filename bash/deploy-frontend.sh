root="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
. "$root/config.sh"

# build
here=pwd
cd "$root/../frontend"
npm run build
cd "$here"

# push to server
scp -P "$port" -r $root/../frontend/build/* "$user@$domain:/opt/ziwg-frontend";
