# ZIwG
Repository created for the purpose of academic course "Zastosowanie Informatyki w Gospodarce"

___
[PL]

Projekt ma na celu stworzenie aplikacji pozwalającej na tworzenie i zarządzanie wydarzeniami oraz organizację społeczności wokół nich.

## Główne funkcjonalności aplikacji
- [ ] Tworzenie wydarzeń publicznych przez zalogowanych użytkowników.
- [ ] Przypisywanie kategorii wydarzeniom.
- [ ] Lista zapisanych wydarzeń użytkownika.
- [ ] Obsługa ograniczonej ilości miejsc na wydarzeniach.
- [ ] Obsługa kalendarza wydarzeń.
- [ ] Możliwość organizacji wspólnych wyjazdów do wydarzeń.
- [ ] Dodawanie opisu oraz szczegółowych informacji do wydarzeń.
- [ ] Dodawanie miejsca wydarzeń.

## Lista pomysłów
- [ ] Powiadomienia użytkownika o dostępności miejsc.
- [ ] System opinii wydarzeń oraz ich organizatorów.
- [ ] Udostępnianie wydarzeń wybranym użytkownikom.
- [ ] Możliwość zadawania pytań organizatorom (wydarzeń i przejazdów).
- [ ] Możliwość subskrypcji organizatorów wydarzeń.
- [ ] Dodawanie zdjęć do wydarzeń.

___

## Table of contents
- [ZIwG](#ziwg)
  - [Główne funkcjonalności aplikacji](#główne-funkcjonalności-aplikacji)
  - [Lista pomysłów](#lista-pomysłów)
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
