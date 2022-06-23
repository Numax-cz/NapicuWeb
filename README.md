# NapicuWeb

- Vytvořeno pomocí [Angular](https://angular.io/)
- [NapicuWeb - První verze](https://github.com/Numax-cz/napicu-web/tree/NapicuWeb)
- [NapicuWeb - Druhá verze](https://github.com/Numax-cz/napicu-web/tree/NapicuWeb2)

## Instalace

1. Naklonování repozitáře
   ```sh
   git clone https://github.com/Numax-cz/NapicuWeb.git
   ```
2. Nainstalování balíčků
   ```sh
   npm install
   ```

## Konfigurace
V souboru `environments/environment.ts` nastavíte výchozí konfiguraci (pro vývoj)

V souboru `environments/environment.prod.ts` nastavíte konfiguraci pro nasazení

* Profily lze přepínat pomocí `--configuration=` více na https://angular.io/guide/build#configure-environment-specific-defaults


## Commands

- Spuštění aplikace hlavního webu

  ```sh
  npm run start
  ```

- Spuštění určité aplikace
  ```sh
  npm run start <název_aplikace>
  ```

## Vytvoření další aplikace

```sh
ng generate application <název_aplikace>
```

## Vytvoření komponentu pro aplikaci

```sh
ng g c <název_komponentu> --project <název_aplikace>
```

## Buildnutí aplikace

```sh
npm run build <název_aplikace>
```

## Importování Angular PWA

```sh
npm run pwa <název_aplikace>
```
