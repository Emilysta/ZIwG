root="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
. "$root/config.sh"

# build
$root/../bash/build-server-component.sh src

# push to server
scp -P "$port" -r $root/../~build/* "$user@$domain:/var/ziwg/";

# run
ssh "$user@$domain" -p "$port" /opt/ziwg-bash/publish.sh
