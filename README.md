# ZIwG
Repository created for the purpose of academic course "Zastosowanie Informatyki w Gospodarce"


## Table of contents
- [ZIwG](#ziwg)
  - [Table of contents](#table-of-contents)
  - [Authors](#authors)
  - [Specification](#specification)
  - [Deploy on our server](#deploy-on-our-server)

## Authors
- Emilia Starczyk,
- Arek Kacperski,
- Michał Łopatka,
- Mateusz Górka


## Specification
- Backend: ASP.NET Core,
- Frontend: React


## Deploy on our server
In directory `bash` create file `config.sh` based on template with correct credentials:

```sh
user="user name"
domain="your.domain"
port="your ssh port"
```

Run:
```sh
./bash/deploy-backend.sh
```

```sh
./bash/deploy-frontend.sh
```

<!--
## License
See a file [LICENSE.md](LICENSE.md).
-->
