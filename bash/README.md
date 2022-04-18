# Deploy on our server
In directory `bash` create file `config.sh` based on template with correct credentials:

```sh
user="user name"
domain="our.domain"
port="our ssh port"
```

Run:
```sh
# For deploy backend
./bash/deploy-backend.sh

# For deploy frontend
./bash/deploy-frontend.sh
```
