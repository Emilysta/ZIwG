# ZIwG
Repository created for the purpose of academic course "Zastosowanie Informatyki w Gospodarce".

## Table of contents
- [ZIwG](#ziwg)
  - [Table of contents](#table-of-contents)
  - [Główne funkcjonalności aplikacji](#główne-funkcjonalności-aplikacji)
  - [Lista pomysłów](#lista-pomysłów)
  - [Authors](#authors)
  - [Specification](#specification)
  - [Flow testowe](#flow-testowe)

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


## Authors
- [Emilia Starczyk](https://github.com/Emilysta),
- [Arek Kacperski](https://github.com/),
- [Michał Łopatka](https://github.com/MichalLopatka),
- [Mateusz Górka](https://github.com/goorkamateusz)


## Specification
- Backend: ASP.NET Core,
- Frontend: React

## Flow testowe
- [ ] Rejestracja
  - Join Us -> No account? -> Create Account -> Log in
- [ ] Logowanie
  - Join Us -> Log in
- [ ] Reset hasła
  - Join Us -> forget your password? -> Send e-mail -> Open mail -> click link -> Fill new password
    -> Log in with new password 
- [ ] Edycja profilu
  - (Po zalogowaniu) -> Edit profile -> Save 
- [ ] Przeglądanie dostępnych Eventów
  - Events
  - Wpisanie w wyszukiwarkę np. "Wesoły" i wybranie podpowiedzi. Eventy zostaną przefiltrowane.
- [ ] Tworzenie eventu
  - (Po zalogowaniu) -> My events -> Add event -> Uzupełnienie danych (wymagane: nazwa, lokalizacja,
    data) -> Create Event
  - Anulowanie (Po zalogowaniu) -> My events -> Add event -> Cancel
- [ ] Dodawanie lokalizacji w evencie
  - (Po zalogowaniu) -> My events -> Add event -> Pick place 
    - możliwość skorzystania z wyszukiwarki
    - możliwość wybrania punkty na mapie poprzez dwuklik
    - możliwość lokalizacji za pomocą przycisku Compas
    - centrowanie/oddalanie/przemieszanie poprzez drag
- [ ] Dodawanie zdjęcia w evencie
  - (Po zalogowaniu) -> My events -> Add event -> Naciśnięcie na box "Click to add Image" 
    - możliwość przeciągnięcia plików na box
    - możliwość wybrania poprzez naciśnięcie na box
- [ ] Dodawanie daty 
  - (Po zalogowaniu) -> My events -> Add event -> Naciśnięcie na input z datą 
    - możliwość wyboru dnia, miesiąca, roku
    - możliwość wyboru godziny co do minuty
    - filtracja dat wstecz (blokada)
      - wybór większej daty "Start date" niż "End date"
- [ ] Modyfikowanie eventu
  - (Po zalogowaniu) -> My events -> Modify -> Save
  - Anulowanie (Po zalogowaniu) -> My events -> Modify -> Cancel
- [ ] Przeglądanie eventów, do których użytkownik jest zapisany
  - (Po zalogowaniu) -> Calendar -> Wybór danego dnia
  - (Po zalogowaniu w ramach strony tickets) -> Tickets
- [ ] Przeglądanie eventów, które użytkownik utworzył
  - (Po zalogowaniu) -> My events -> Wybór konkrentego eventu
- [ ] Przeglądanie biletów
  - (Po zalogowaniu) -> Tickets -> Wybór konkrentego biletu -> bilet zostanie otworzony w nowej zakładce
- [ ] Zapisywanie do eventów
  - (Po zalogowaniu) -> Events -> Wybór konkrentego eventu -> zmiana not interested na going 
      - sprawdzenie zapisania: Hi,{name}->tickets -> wyszukanie zdarzenia
- [ ] Wypisywanie się z eventów
  - (Po zalogowaniu) -> Events -> Wybór konkrentego eventu -> zmiana na going na not interested 
      - sprawdzenie zapisania: Hi,{name}->tickets -> wyszukanie zdarzenia
- [ ] Przeglądanie lokalizacji zdarzenia
  - Events -> Wybór konkretnego wydarzenia ->  Show Popup



<!--
## License
See a file [LICENSE.md](LICENSE.md).
-->
