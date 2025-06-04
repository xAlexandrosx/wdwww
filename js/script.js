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
        tags: ["Multiplayer", "Online", "Competitive", "MOBA", "Esports", "Team-based"],
        alt: "league of legends",
        link: "game-articles/leagueoflegends.html"
    },
    {
        name: "CS: GO",
        developer: "Valve",
        image: "/images/csgo.jpg",
        logo: "/images/csgo_logo.png",
        genre: "First-person shooter",
        tags: ["Multiplayer", "Online", "Shooter", "First Person", "Competitive", "Tactical", "Esports"],
        alt: "cs go",
        link: "game-articles/csgo.html"
    },
    {
        name: "Minecraft",
        developer: "Mojang",
        image: "/images/Minecraft.jpg",
        logo: "/images/MinecraftLogo.png",
        genre: "Sandbox",
        tags: ["Sandbox", "Survival", "Creative", "First Person", "Open-world", "Multiplayer", "Adventure", "Crafting"],
        alt: "minecraft",
        link: "game-articles/minecraft.html"
    },
    {
        name: "The Binding of Isaac",
        developer: "Nicalis",
        image: "/images/Isaac.jpg",
        logo: "/images/IsaacLogo.png",
        genre: "Roguelike",
        tags: ["Roguelike", "Indie", "Singleplayer", "Dark", "Dungeon Crawler"],
        alt: "The Binding of Isaac",
        link: "game-articles/bindingofisaac.html"
    },
    {
        name: "The Witcher 3",
        developer: "CD Project Red",
        image: "/images/Witcher3.jpg",
        logo: "/images/Witcher3Logo.png",
        genre: "Action RPG",
        tags: ["RPG", "Story-rich", "Singleplayer", "Fantasy", "Open-world", "Action"],
        alt: "Witcher 3",
        link: "game-articles/witcher3.html"
    },
    {
        name: "World of Warcraft",
        developer: "Blizzard Entertainment",
        image: "/images/WoW.jpg",
        logo: "/images/WOWlogo.png",
        genre: "MMO RPG",
        tags: ["RPG", "Story-rich", "Multiplayer", "Online", "Fantasy", "Open-world", "MMORPG", "Co-op"],
        alt: "WoW",
        link: "game-articles/wow.html"
    },
    {
        name: "Hearthstone",
        developer: "Blizzard Entertainment",
        image: "/images/Hearthstone.jpg",
        logo: "/images/Hearthstone-Logo-1.png",
        genre: "Trading Card Game",
        tags: ["Card Game", "Online", "Turn-based", "Strategy", "Fantasy", "Multiplayer"],
        alt: "hs",
        link: "game-articles/hearthstone.html"
    },
    {
        name: "Magic the Gathering",
        developer: "Wizards of the Coast",
        image: "/images/MtG.jpg",
        logo: "/images/MtG_logo.png",
        genre: "Trading Card Game",
        tags: ["Card Game", "Fantasy", "Strategy", "Multiplayer", "Tabletop", "Competitive"],
        alt: "MtG",
        link: "game-articles/mtg.html"
    },
    {
        name: "Assasin's Creed",
        developer: "Ubisoft",
        image: "/images/Assasins.jpg",
        logo: "/images/Assasins_logo.png",
        genre: "Action RPG",
        tags: ["Action", "RPG", "Open-world", "Stealth", "Story-rich", "Singleplayer", "Historical"],
        alt: "AC",
        link: "game-articles/assasinscreed1.html"
    },
    {
        name: "Cyberpunk 77",
        developer: "CD Project Red",
        image: "/images/Cyberpunk.jpg",
        logo: "/images/Cyberpunk_logo.png",
        genre: "FPS RPG",
        tags: ["RPG", "Shooter", "Open-world", "Sci-fi", "Story-rich", "First Person", "Singleplayer"],
        alt: "Cyberpunk",
        link: "game-articles/cyberpunk77.html"
    },
    {
        name: "Don't Starve Together",
        developer: "Klei Entertainment",
        image: "/images/DST.jpg",
        logo: "/images/DST_Logo.png",
        genre: "Survival",
        tags: ["Survival", "Multiplayer", "Co-op", "Crafting", "Dark", "Indie", "Open-world"],
        alt: "DST",
        link: "game-articles/dontstarvetogether.html"
    },
    {
        name: "Fortnite",
        developer: "Epic Games",
        image: "/images/Fortnite.jpg",
        logo: "/images/Fortnite-Logo.png",
        genre: "Battle Royale",
        tags: ["Multiplayer", "Online", "Shooter", "Battle Royale", "Building", "Third Person", "Co-op"],
        alt: "fortnite",
        link: "game-articles/fortnite.html"
    },
    {
        name: "Overwatch",
        developer: "Blizzard Entertainment",
        image: "/images/Overwatch.jpg",
        logo: "/images/overwatch_logo.png",
        genre: "Hero Shooter",
        tags: ["Shooter", "Multiplayer", "Online", "First Person", "Team-based", "Hero-based", "Esports"],
        alt: "ov",
        link: "game-articles/overwatch.html"
    },
    {
        name: "Sims 4",
        developer: "EA",
        image: "/images/Sims4.jpg",
        logo: "/images/Sims_4_logo.png",
        genre: "Simulator",
        tags: ["Simulation", "Life Sim", "Singleplayer", "Creative", "Casual"],
        alt: "sims",
        link: "game-articles/sims4.html"
    },
    {
        name: "Valorant",
        developer: "Riot Games",
        image: "/images/Valorant.jpg",
        logo: "/images/Valorant_logo.png",
        genre: "First-person shooter",
        tags: ["Shooter", "Multiplayer", "Online", "First Person", "Competitive", "Esports", "Tactical"],
        alt: "valorant",
        link: "game-articles/valorant.html"
    },
    {
        name: "Heartbound",
        developer: "Pirate Software",
        image: "/images/Heartbound.jpg",
        logo: "/images/heartbound_logo.png",
        genre: "RPG Adventure",
        tags: ["RPG", "Adventure", "Indie", "Story-rich", "Pixel Art", "Singleplayer"],
        alt: "heartbound",
        link: "game-articles/heartbound.html"
    },
    {
        name: "Dota 2",
        developer: "Valve",
        image: "/images/dota2.jpg",
        logo: "/images/dota2_logo.png",
        genre: "Team based MOBA",
        tags: ["Multiplayer", "Online", "MOBA", "Esports", "Strategy", "Team-based"],
        alt: "dota 2",
        link: "game-articles/dota2.html"
    },
    {
        name: "Warcraft 3",
        developer: "Blizzard Entertainment",
        image: "/images/warcraft3.jpg",
        logo: "/images/warcraft3_logo.png",
        genre: "Real Time Strategy",
        tags: ["RTS", "Fantasy", "Strategy", "Multiplayer", "Campaign", "Classic"],
        alt: "warcraft 3",
        link: "game-articles/warcraft3.html"
    },
    {
        name: "Grand Theft Auto V",
        developer: "Rockstar",
        image: "/images/gtav.jpg",
        logo: "/images/gtav_logo.png",
        genre: "RPG",
        tags: ["Open-world", "Action", "Multiplayer", "Story-rich", "Crime", "Third Person"],
        alt: "gta v",
        link: "game-articles/gtav.html"
    },
    {
        name: "Pet Party",
        developer: "Exient Entertainment",
        image: "/images/petparty.jpg",
        logo: "/images/petparty_logo.png",
        genre: "Simulation",
        tags: ["Simulation", "Casual", "Kids", "Multiplayer", "Social"],
        alt: "pet party",
        link: "game-articles/petparty.html"
    },
    {
        name: "Hollow Knight",
        developer: "Team Cherry",
        image: "/images/hollowknight.jpg",
        logo: "/images/hollowknight_logo.png",
        genre: "Action Adventure",
        tags: ["Indie", "Action", "Platformer", "Singleplayer", "Challenging"],
        alt: "hollow knight",
        link: "game-articles/hollowknight.html"
    },
    {
        name: "Bloons TD",
        developer: "Ninja Kiwi",
        image: "/images/bloonstd.jpg",
        logo: "/images/bloonstd_logo.png",
        genre: "Tower Defense",
        tags: ["Tower Defense", "Strategy", "Singleplayer", "Kids", "Casual"],
        alt: "bloons td",
        link: "game-articles/bloonstd.html"
    },
    {
        name: "Assasin's Creed Black Flag",
        developer: "Ubisoft",
        image: "/images/blackflag.jpg",
        logo: "/images/blackflag_logo.png",
        genre: "Action RPG",
        tags: ["Action", "RPG", "Story-rich", "Open-world", "Stealth", "Historical"],
        alt: "black flag",
        link: "game-articles/blackflag.html"
    },
    {
        name: "Genshin Impact",
        developer: "HoYoverse",
        image: "/images/genshin.jpg",
        logo: "/images/genshin_logo.png",
        genre: "Action RPG",
        tags: ["Action", "RPG", "Open-world", "Anime", "Multiplayer", "Fantasy"],
        alt: "genshin impact",
        link: "game-articles/genshin.html"
    },
    {
        name: "Apex Legends",
        developer: "Electronic Arts",
        image: "/images/apex.jpg",
        logo: "/images/apex_logo.png",
        genre: "First Person Shooter",
        tags: ["Shooter", "Battle Royale", "Multiplayer", "First Person", "Online", "Team-based"],
        alt: "apex legends",
        link: "game-articles/apex.html"
    },
    {
        name: "City Skylines",
        developer: "Paradox Interactive",
        image: "/images/skylines.jpg",
        logo: "/images/skylines_logo.png",
        genre: "Simulation",
        tags: ["Simulation", "City Builder", "Strategy", "Singleplayer", "Creative"],
        alt: "city skylines",
        link: "game-articles/skylines.html"
    },
    {
        name: "Starcraft 2",
        developer: "Blizzard Entertainment",
        image: "/images/sc2.jpg",
        logo: "/images/sc2_logo.png",
        genre: "Real Time Strategy",
        tags: ["RTS", "Sci-fi", "Multiplayer", "Strategy", "Campaign", "Esports"],
        alt: "starcraft 2",
        link: "game-articles/sc2.html"
    },
    {
        name: "Gwent",
        developer: "CD Project Red",
        image: "/images/gwent.jpg",
        logo: "/images/gwent_logo.png",
        genre: "Trading Card Game",
        tags: ["Card Game", "Fantasy", "Multiplayer", "Strategy", "Online"],
        alt: "gwent",
        link: "game-articles/gwent.html"
    },
    {
        name: "Terraria",
        developer: "Re-Logic",
        image: "/images/terraria.jpg",
        logo: "/images/terraria_logo.png",
        genre: "Sandbox Adventure",
        tags: ["Sandbox", "Adventure", "Survival", "Pixel Art", "Co-op", "Crafting", "Multiplayer"],
        alt: "terraria",
        link: "game-articles/terraria.html"
    },
    {
        name: "Slay the Spire",
        developer: "MegaCrit",
        image: "/images/slaythespire.jpg",
        logo: "/images/slaythespire_logo.png",
        genre: "Roguelike",
        tags: ["Card Game", "Roguelike", "Strategy", "Turn-based", "Indie", "Singleplayer"],
        alt: "Slay the Spire",
        link: "game-articles/slaythespire.html"
    },
    {
        name: "Balatro",
        developer: "LocalThunk",
        image: "/images/balatro.jpg",
        logo: "/images/balatro_logo.png",
        genre: "Card Game",
        tags: ["Card Game", "Roguelike", "Strategy", "Indie", "Singleplayer"],
        alt: "balatro",
        link: "game-articles/balatro.html"
    },
    {
        name: "Darkest Dungeon",
        developer: "Red Hook Studios",
        image: "/images/darkestdungeon.jpg",
        logo: "/images/darkestdungeon_logo.png",
        genre: "Roguelike",
        tags: ["Roguelike", "Turn-based", "Dark", "Challenging", "Strategy", "Party-based", "Singleplayer"],
        alt: "darkest dungeon",
        link: "game-articles/darkestdungeon.html"
    },
    {
        name: "Rainbow Six Siege",
        developer: "Ubisoft",
        image: "/images/rainbowsix.jpg",
        logo: "/images/rainbowsix_logo.png",
        genre: "Tactical Shooter",
        tags: ["Multiplayer", "Online", "Shooter", "Tactical", "First Person", "Team-based", "Competitive"],
        alt: "rainbow six siege",
        link: "game-articles/rainbowsixsiege.html"
    },
    {
        name: "Kingdom Rush",
        developer: "Ironhide",
        image: "/images/kingdomrush.jpg",
        logo: "/images/kingdomrush_logo.png",
        genre: "Tower Defense",
        tags: ["Casual", "Singleplayer", "Tower Defence", "Strategy", "Fantasy"],
        alt: "kingdom rush",
        link: "game-articles/kingdomrush.html"
    },
    {
        name: "Assasin's Creed 2",
        developer: "Ubisoft",
        image: "/images/ac2.jpg",
        logo: "/images/ac2_logo.png",
        genre: "Action RPG",
        tags: ["Action", "RPG", "Open-world", "Stealth", "Story-rich", "Singleplayer", "Historical"],
        alt: "assasin's creed 2",
        link: "game-articles/ac2.html"
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
                <a href=${game.link}><img src="${game.logo}" alt="${game.name} Logo" class="game-logo" /></a>
                <span>by ${game.developer}</span>
                <p class="text price">${game.genre}</p>
            </div>
        </div>
        `;
    });
}
