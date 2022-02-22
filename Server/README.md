# NapicuAPI

- Vytvořeno pomocí [TypeScript](https://www.typescriptlang.org/)

## Instalace

1. Nainstalování balíčků
   ```sh
   cd Server
   ```
   ```sh
   npm install
   ```
2. Nastavení MySQL databáze `Server/.env` a portu na kterém server poběží
    ```
   PORT= 
   DB_HOST=
   DB_USER=
   DB_PASSWORD=
   DB_DATABASE=
    ```

* Při prvním spuštění se automaticky vytvoří veškeré potřebné tabulky v MySQL

## Schéma API

```
  POST http://localhost:8080/api/bios/waitlist
```
