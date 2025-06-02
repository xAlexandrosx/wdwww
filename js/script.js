window.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("[data-include]").forEach(async el => {
        const file = el.getAttribute("data-include");
        try {
            const res = await fetch(file);
            if (res.ok) {
                el.innerHTML = await res.text();

                // If the included file contains any script tags, execute them
                el.querySelectorAll("script").forEach(oldScript => {
                    const newScript = document.createElement("script");
                    newScript.textContent = oldScript.textContent;
                    document.body.appendChild(newScript);
                });

                // If it's cards.html, build the cards after insertion
                if (file.includes("cards.html")) buildCards();
            }
        } catch (err) {
            console.error(`Could not include ${file}:`, err);
        }
    });
});

const games = [
    {
        name: "League of Legends",
        developer: "Riot Games",
        image: "/images/league.jpg",
        logo: "/images/league_logo.png",
        genre: "Team based MOBA",
        alt: "league of legends"
    },
    {
        name: "CS: GO",
        developer: "Valve",
        image: "/images/csgo.jpg",
        logo: "/images/csgo_logo.png",
        genre: "First-person shooter",
        alt: "cs go"
    },
    {
        name: "Minecraft",
        developer: "Mojang",
        image: "/images/Minecraft.jpg",
        logo: "/images/MinecraftLogo.png",
        genre: "Sandbox Adventure",
        alt: "minecraft"
    },
    {
        name: "The Binding of Isaac",
        developer: "Nicalis",
        image: "/images/Isaac.jpg",
        logo: "/images/IsaacLogo.png",
        genre: "Roguelike",
        alt: "The Binding of Isaac"
    },
    {
        name: "The Witcher 3",
        developer: "CD Project Red",
        image: "/images/Witcher3.jpg",
        logo: "/images/Witcher3Logo.png",
        genre: "Action RPG",
        alt: "Witcher 3"
    },
    {
        name: "World of Warcraft",
        developer: "Blizzard Entertainment",
        image: "/images/WoW.jpg",
        logo: "/images/WOWlogo.png",
        genre: "MMO RPG",
        alt: "WoW"
    },
    {
        name: "Hearthstone",
        developer: "Blizzard Entertainment",
        image: "/images/Hearthstone.jpg",
        logo: "/images/Hearthstone-Logo-1.png",
        genre: "Trading Card Game",
        alt: "hs"
    },
    {
        name: "Magic the Gathering",
        developer: "Wizards of the Coast",
        image: "/images/MtG.jpg",
        logo: "/images/MtG_logo.png",
        genre: "Trading Card Game",
        alt: "MtG"
    },
    {
        name: "Assasin's Creed",
        developer: "Ubisoft",
        image: "/images/Assasins.jpg",
        logo: "/images/Assasins_logo.png",
        genre: "Action RPG",
        alt: "AC"
    },
    {
        name: "Cyberpunk 77",
        developer: "CD Project Red",
        image: "/images/Cyberpunk.jpg",
        logo: "/images/Cyberpunk_logo.png",
        genre: "FPS RPG",
        alt: "Cyberpunk"
    },
    {
        name: "Don't Starve Together",
        developer: "Klei Entertainment",
        image: "/images/DST.jpg",
        logo: "/images/DST_Logo.png",
        genre: "Survival",
        alt: "DST"
    },
    {
        name: "Fortnite",
        developer: "Epic Games",
        image: "/images/Fortnite.jpg",
        logo: "/images/Fortnite-Logo.png",
        genre: "Battle Royale",
        alt: "fortnite"
    },
    {
        name: "Overwatch",
        developer: "Blizzard Entertainment",
        image: "/images/Overwatch.jpg",
        logo: "/images/overwatch_logo.png",
        genre: "Hero Shooter",
        alt: "ov"
    },
    {
        name: "Sims 4",
        developer: "EA",
        image: "/images/Sims4.jpg",
        logo: "/images/Sims_4_logo.png",
        genre: "simulator",
        alt: "sims"
    },
    {
        name: "Valorant",
        developer: "Riot Games",
        image: "/images/Valorant.jpg",
        logo: "/images/Valorant_logo.png",
        genre: "First-person shooter",
        alt: "valorant"
    }
];

const starSVG = `
<svg viewBox="0 0 24 24" class="star-icon" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.362,9.158c0,0-3.16,0.35-5.268,0.584c-0.19,0.023-0.358,0.15-0.421,0.343s0,0.394,0.14,0.521
       c1.566,1.429,3.919,3.569,3.919,3.569c-0.002,0-0.646,3.113-1.074,5.19c-0.036,0.188,0.032,0.387,0.196,0.506
       c0.163,0.119,0.373,0.121,0.538,0.028c1.844-1.048,4.606-2.624,4.606-2.624s2.763,1.576,4.604,2.625
       c0.168,0.092,0.378,0.09,0.541-0.029c0.164-0.119,0.232-0.318,0.195-0.505c-0.428-2.078-1.071-5.191-1.071-5.191
       s2.353-2.14,3.919-3.566c0.14-0.131,0.202-0.332,0.14-0.524s-0.23-0.319-0.42-0.341c-2.108-0.236-5.269-0.586-5.269-0.586
       s-1.31-2.898-2.183-4.83c-0.082-0.173-0.254-0.294-0.456-0.294s-0.375,0.122-0.453,0.294C10.671,6.26,9.362,9.158,9.362,9.158z"/>
</svg>`;

function buildCards() {
    const container = document.getElementById("card-container");
    if (!container) return;

    games.sort((a, b) => a.name.localeCompare(b.name));

    games.forEach(game => {
        container.innerHTML += `
        <div class="card">
            <label class="favorite-container">
                <input type="checkbox" class="favorite-checkbox" />
                ${starSVG}
            </label>

            <a><img class="img" src="${game.image}" alt="${game.alt}" /></a>

            <div class="textBox">
                <img src="${game.logo}" alt="${game.name} Logo" class="game-logo" />
                <span>by ${game.developer}</span>
                <p class="text price">${game.genre}</p>
            </div>
        </div>
        `;
    });
}
