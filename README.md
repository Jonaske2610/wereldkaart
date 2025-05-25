# Wereldkaart - Interactive World Map

Een interactieve wereldkaart applicatie voor kerkdiensten waar bezoekers kunnen aangeven waar ze zijn geweest.

## Functies

- Interactieve wereldkaart
- Elke bezoeker krijgt een willekeurige kleur toegewezen (uit 15 verschillende kleuren)
- Bezoekers kunnen meerdere locaties markeren door op de kaart te klikken
- Geen login vereist
- Geschikt voor grote groepen (500+ bezoekers)

## Online Zetten van de Applicatie

1. Maak een GitHub account als je die nog niet hebt
2. Maak een nieuwe repository aan met de naam "wereldkaart"
3. Open een terminal in de projectmap
4. Voer de volgende commando's uit:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/[JOUW_GITHUB_USERNAME]/wereldkaart.git
   git push -u origin main
   ```
5. Open package.json en vervang [YOUR_GITHUB_USERNAME] met je GitHub gebruikersnaam
6. Installeer de benodigde packages:
   ```bash
   npm install
   ```
7. Deploy de applicatie:
   ```bash
   npm run deploy
   ```
8. Ga naar je GitHub repository instellingen, scroll naar "GitHub Pages" en selecteer de "gh-pages" branch
9. Je website is nu beschikbaar op: https://[JOUW_GITHUB_USERNAME].github.io/wereldkaart

## Lokale Ontwikkeling

1. Clone deze repository
2. Open een terminal in de projectmap
3. Installeer de packages:
   ```bash
   npm install
   ```
4. Start de ontwikkelserver:
   ```bash
   npm start
   ```
5. Open `http://localhost:3000` in je browser

## Gebruik in de Kerk

1. Deel de URL (https://[JOUW_GITHUB_USERNAME].github.io/wereldkaart) met de bezoekers
2. Projecteer dezelfde URL op het beamerscherm
3. Bezoekers kunnen direct beginnen met het plaatsen van markers
4. Elke bezoeker krijgt automatisch een eigen kleur toegewezen
5. De markers verschijnen direct op de geprojecteerde kaart

## Technische Details

- Gebouwd met React en TypeScript
- Gebruikt React-Leaflet voor de kaartfunctionaliteit
- Responsive design dat werkt op zowel desktop als mobiele apparaten
- Gehost op GitHub Pages voor gratis en betrouwbare hosting 