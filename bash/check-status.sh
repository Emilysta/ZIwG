root="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
. "$root/config.sh"

ssh "$user"@"$domain" -p "$port" systemctl status ziwg;
