

window.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("[data-include]").forEach(async el => {
        const file = el.getAttribute("data-include");
        try {
            const res = await fetch(file);
            if (res.ok) {
                el.innerHTML = await res.text();

                el.querySelectorAll("script").forEach(oldScript => {
                    const newScript = document.createElement("script");
                    newScript.textContent = oldScript.textContent;
                    document.body.appendChild(newScript);
                });

                if (file.includes("cards.html")) {
                    buildRecommendations(); // <-- new
                    buildCards();

                    filter_genres();

                    if(sessionStorage.getItem("loggedUser"))
                    {
                        document.querySelectorAll(".favorite-checkbox").forEach(checkbox => {
                        checkbox.addEventListener("change", () => {
                        const card = checkbox.closest(".card");
                        const logoImg = card.querySelector(".game-logo");


                        const altText = logoImg.alt;
                        const gameName = altText.replace(" Logo", "");
                        console.log("Zaznaczono grę:", gameName);
                        let favorites = JSON.parse(sessionStorage.getItem("favoriteGames") || "[]");

                        if (checkbox.checked) {

                            if (!favorites.includes(gameName)) {
                            favorites.push(gameName);
                            }
                        } 
                        else {
                        favorites = favorites.filter(name => name != gameName);
                        }

                        sessionStorage.setItem("favoriteGames", JSON.stringify(favorites));
                            });
                        });
                    }


                    //dark mode
                    const checkbox2=document.getElementById("mode2");

                    if (sessionStorage.getItem("dark-mode") == "enabled") {
                    checkbox2.checked = false;
                    document.body.classList.add("dark-mode");
                    } 
                    else {
                        checkbox2.checked = true;
                    }
                    

                    checkbox2.addEventListener("change", ()=>
                        {
                        document.body.classList.toggle("dark-mode"); 
                        if(checkbox2.checked)
                        {
                        sessionStorage.setItem("dark-mode", "disabled");
                        }
                        else
                        {
                        sessionStorage.setItem("dark-mode", "enabled");
                         }
                    });
                }

                if (file.includes("topbar.html")) {


                    const przycisk = document.getElementById("logout-button");
                    const przycisk_login = document.getElementById("login-button");
                    const przycisk_favorite= document.getElementById("favorite-button");
                    if(sessionStorage.getItem("loggedUser"))
                    {
                        przycisk.disabled=false;
                        przycisk_login.disabled=true;
                        przycisk_favorite.disabled=false;
                    }
                    else
                    {
                        przycisk.disabled=true;
                        przycisk_login.disabled=false;
                        przycisk_favorite.disabled=true;
                    }

                    przycisk.addEventListener("click", () =>
                    {
                        przycisk.disabled=true;
                        przycisk_login.disabled=false;
                        przycisk_favorite.disabled=true;
                        sessionStorage.removeItem("loggedUser");
                        sessionStorage.setItem("favoriteGames", "null");
                    });


                    przycisk_login.addEventListener("click", ()=>
                    {
                        window.location.href="first.html";
                    }
                    );

                    przycisk_favorite.addEventListener("click", () =>
                    {
                        przycisk_favorite.disabled=true;
                        display_favorite();
                    }
                    );
                }
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
        tags: ["Multiplayer", "Online", "Competetive", "MOBA", "Esports", "Team-based"],
        alt: "league of legends",
        link: "game-articles/leagueoflegends.html"
    },
    {
        name: "CS: GO",
        developer: "Valve",
        image: "/images/csgo.jpg",
        logo: "/images/csgo_logo.png",
        genre: "First-person shooter",
        tags: ["Multiplayer", "Online", "Shooter", "First Person", "Competetive", "Tactical", "Esports"],
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
        tags: ["Roguelike", "Indie", "Singleplayer", "Dark", "Dungeon Crawler", "Pixel Art"],
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
        tags: ["Cards", "Online", "Turn-based", "Strategy", "Fantasy", "Multiplayer"],
        alt: "hs",
        link: "game-articles/hearthstone.html"
    },
    {
        name: "Magic the Gathering",
        developer: "Wizards of the Coast",
        image: "/images/MtG.jpg",
        logo: "/images/MtG_logo.png",
        genre: "Trading Card Game",
        tags: ["Cards", "Fantasy", "Strategy", "Multiplayer", "Tabletop", "Competitive"],
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
        tags: ["Survival", "Multiplayer", "Co-op", "Crafting", "Dark", "Indie", "Open-world", "Roguelike"],
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
        tags: ["Shooter", "Multiplayer", "Online", "First Person", "Team-based", "Hero-based", "Competetive", "Sci-fi"],
        alt: "ov",
        link: "game-articles/overwatch.html"
    },
    {
        name: "Sims 4",
        developer: "EA",
        image: "/images/Sims4.jpg",
        logo: "/images/Sims_4_logo.png",
        genre: "Simulator",
        tags: ["Simulator", "Singleplayer", "Creative", "Casual"],
        alt: "sims",
        link: "game-articles/sims4.html"
    },
    {
        name: "Valorant",
        developer: "Riot Games",
        image: "/images/Valorant.jpg",
        logo: "/images/Valorant_logo.png",
        genre: "First-person shooter",
        tags: ["Shooter", "Multiplayer", "Online", "First Person", "Competetive", "Tactical"],
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
        tags: ["Multiplayer", "Online", "MOBA", "Competetive", "Team-based"],
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
        tags: ["Open-world", "Action", "Multiplayer", "Story-rich", "Crime", "Third Person", "Racing"],
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
        tags: ["Shooter", "Battle Royale", "Multiplayer", "First Person", "Online", "Team-based", "Sci-fi"],
        alt: "apex legends",
        link: "game-articles/apex.html"
    },
    {
        name: "City Skylines",
        developer: "Paradox Interactive",
        image: "/images/skylines.jpg",
        logo: "/images/skylines_logo.png",
        genre: "Simulation",
        tags: ["Simulator", "City Builder", "Strategy", "Singleplayer", "Creative"],
        alt: "city skylines",
        link: "game-articles/skylines.html"
    },
    {
        name: "Starcraft 2",
        developer: "Blizzard Entertainment",
        image: "/images/sc2.jpg",
        logo: "/images/sc2_logo.png",
        genre: "Real Time Strategy",
        tags: ["RTS", "Sci-fi", "Multiplayer", "Strategy", "Campaign", "Competetive"],
        alt: "starcraft 2",
        link: "game-articles/sc2.html"
    },
    {
        name: "Gwent",
        developer: "CD Project Red",
        image: "/images/gwent.jpg",
        logo: "/images/gwent_logo.png",
        genre: "Trading Card Game",
        tags: ["Cards", "Fantasy", "Multiplayer", "Strategy", "Online"],
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
        tags: ["Cards", "Roguelike", "Strategy", "Turn-based", "Indie", "Singleplayer"],
        alt: "Slay the Spire",
        link: "game-articles/slaythespire.html"
    },
    {
        name: "Balatro",
        developer: "LocalThunk",
        image: "/images/balatro.jpg",
        logo: "/images/balatro_logo.png",
        genre: "Card Game",
        tags: ["Cards", "Roguelike", "Strategy", "Indie", "Singleplayer", "Pixel Art"],
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
        tags: ["Multiplayer", "Online", "Shooter", "Tactical", "First Person", "Team-based", "Competetive"],
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
    },
    {
        name: "Snow Runner",
        developer: "Saber Interactive",
        image: "/images/snowrunner.jpg",
        logo: "/images/snowrunner_logo.png",
        genre: "Simulation",
        tags: ["Simulator", "Racing", "Open-world", "Sandbox", "Multiplayer", "Adventure"],
        alt: "snowrunner",
        link: "game-articles/snowrunner.html"
    },
    {
        name: "Stardew Valley",
        developer: "ConcernedApe ",
        image: "/images/stardewvalley.jpg",
        logo: "/images/stardewvalley_logo.png",
        genre: "Simulation",
        tags: ["Simulator", "Multiplayer", "RPG", "Sandbox", "Singleplayer", "Open-world", "Casual", "Pixel Art", "Indie"],
        alt: "stardew valley",
        link: "game-articles/stardewvalley.html"
    },
    {
        name: "BeamNG.drive",
        developer: "BeamNG GmbH ",
        image: "/images/beamng.jpg",
        logo: "/images/beamng_logo.png",
        genre: "Simulation",
        tags: ["Simulator", "Multiplayer", "Sandbox", "Singleplayer", "Indie", "Racing"],
        alt: "stardew valley",
        link: "game-articles/beamng.html"
    },
    {
        name: "Forza Horizaon 25",
        developer: "Turn 10 Studios",
        image: "/images/forza25.jpg",
        logo: "/images/forza25_logo.png",
        genre: "Simulation",
        tags: ["Simulator", "Multiplayer", "Singleplayer", "Open-world", "Racing", "Sport"],
        alt: "forza motorsport",
        link: "game-articles/forza25.html"
    },
    {
        name: "Marvel Snap",
        developer: "Second Dinner",
        image: "/images/marvelsnap.jpg",
        logo: "/images/marvelsnap_logo.png",
        genre: "Trading Card Game",
        tags: ["Cards", "Online", "Turn-based", "Strategy", "Multiplayer"],
        alt: "marvel snap",
        link: "game-articles/marvelsnap.html"
    },
    {
        name: "Football Manager 2024",
        developer: "Sports Interactive",
        image: "/images/footballmanager24.jpg",
        logo: "/images/footballmanager24_logo.png",
        genre: "Simulator",
        tags: ["Simulator", "Sport", "Strategy", "Multiplayer", "Singleplayer"],
        alt: "football manager 2024",
        link: "game-articles/footballmanager24.html"
    },
    {
        name: "Fifa 2022",
        developer: "EA Sports",
        image: "/images/fifa22.jpg",
        logo: "/images/fifa22_logo.png",
        genre: "Sports Game",
        tags: ["Simulator", "Sport", "Multiplayer", "Singleplayer", "Competetive"],
        alt: "fifa 2022",
        link: "game-articles/fifa22.html"
    },
    {
        name: "F1 25",
        developer: "EA Sports",
        image: "/images/f1.jpg",
        logo: "/images/f1_logo.png",
        genre: "Sports Game",
        tags: ["Simulator", "Sport", "Multiplayer", "Racing"],
        alt: "f1 25",
        link: "game-articles/f1.html"
    },
    {
        name: "NBA 2k25",
        developer: "Visual Concepts",
        image: "/images/nba2k25.jpg",
        logo: "/images/nba2k25_logo.png",
        genre: "Sports Game",
        tags: ["Simulator", "Sport", "Multiplayer", "Singleplayer", "Competetive"],
        alt: "nba 2k25",
        link: "game-articles/nba2k25.html"
    },
    {
        name: "Subnautica",
        developer: "Unknown Worlds Entertainment",
        image: "/images/subnautica.jpg",
        logo: "/images/subnautica_logo.png",
        genre: "Survival",
        tags: ["Survival", "Singleplayer", "Sandbox", "Multiplayer", "Open-world", "Sci-fi"],
        alt: "nba 2k25",
        link: "game-articles/nba2k25.html"
    },
    {
        name: "Kingdom Come Deliverance 2",
        developer: "Warhorse Studios",
        image: "/images/kcd2.jpg",
        logo: "/images/kcd2_logo.png",
        genre: "RPG",
        tags: ["RPG", "Singleplayer", "Action", "Historic", "Open-world", "Adventure"],
        alt: "kingdom come deliverance 2",
        link: "game-articles/kcd2.html"
    },
    {
        name: "No Man's Sky",
        developer: "Hello Games",
        image: "/images/nomanssky.jpg",
        logo: "/images/nomanssky_logo.png",
        genre: "Survival",
        tags: ["Open-world", "Survival", "Sci-fi", "Singleplayer", "Action", "Adventure", "Multiplayer", "Indie"],
        alt: "no man's sky",
        link: "game-articles/nomanssky.html"
    },
    {
        name: "Hearts of Iron IV",
        developer: "Paradox Interactive",
        image: "/images/hoi4.jpg",
        logo: "/images/hoi4_logo.png",
        genre: "Real Time Strategy",
        tags: ["RTS","Strategic", "Historic", "Singleplayer", "Simulator", "Multiplayer"],
        alt: "hearts of iron 4",
        link: "game-articles/hoi4.html"
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
        <div class="card" >
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

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function buildRecommendations() {
    const genres = JSON.parse(localStorage.getItem("selectedGenres") || "[]");
    const container = document.getElementById("recommendations");

    if (!genres.length || !container) return;

    genres.slice(0, 4).forEach(genre => {
        const section = document.createElement("section");
        section.className = "recommendation-section";
        section.innerHTML = `<h2>Because you like ${genre} games...</h2>`;

        const row = document.createElement("div");
        row.className = "recommendation-row";

        const matchedGames = games.filter(game => game.tags.includes(genre));
        shuffleArray(matchedGames);
        const selectedGames = matchedGames.slice(0, 5);

        selectedGames.forEach(game => {
            const card = document.createElement("div");
            card.className = "card";
            card.innerHTML = `
        <label class="favorite-container">
            <input type="checkbox" class="favorite-checkbox" />
            ${starSVG}
        </label>
        <a><img class="img" src="${game.image}" alt="${game.alt}" /></a>
        <div class="textBox">
            <a href="${game.link}">
                <img src="${game.logo}" alt="${game.name} Logo" class="game-logo" />
            </a>
            <span>by ${game.developer}</span>
            <p class="text price">${game.genre}</p>
        </div>
    `;
            row.appendChild(card);
        });

        section.appendChild(row);
        container.appendChild(section);
    });
}

function filter_genres()
{
    const gatunki = JSON.parse(localStorage.getItem("FilterSelectedGenres") || "[]");
    const kontener = document.getElementById("filter");

    if (gatunki==null || !gatunki.length || !kontener) return;

    gatunki.forEach(genre => {
        const sekcja = document.createElement("section");
        sekcja.className = "filter-section";
        sekcja.innerHTML = `<h2>${genre} games:</h2>`;

        const rzad = document.createElement("div");
        rzad.className = "filter-row";

        const matchedGames2 = games.filter(game => game.tags.includes(genre));
        shuffleArray(matchedGames2);
        const selectedGames2 = matchedGames2;

        selectedGames2.forEach(game => {
            const card = document.createElement("div");
            card.className = "card";
            card.innerHTML = `
        <label class="favorite-container">
            <input type="checkbox" class="favorite-checkbox" />
            ${starSVG}
        </label>
        <a><img class="img" src="${game.image}" alt="${game.alt}" /></a>
        <div class="textBox">
            <a href="${game.link}">
                <img src="${game.logo}" alt="${game.name} Logo" class="game-logo" />
            </a>
            <span>by ${game.developer}</span>
            <p class="text price">${game.genre}</p>
        </div>
    `;
            rzad.appendChild(card);
        });

        sekcja.appendChild(rzad);
        kontener.appendChild(sekcja);
        localStorage.setItem("FilterSelectedGenres", "null");
    });
}


function display_favorite()
{
    const gry = JSON.parse(sessionStorage.getItem("favoriteGames") || "[]");
    const kont= document.getElementById("favorite");

    if(gry == null || !gry.length || !kont)return;
        const sekcja = document.createElement("section");
        sekcja.className = "fav-section";
        sekcja.innerHTML = `<h2>Favorite games:</h2>`;

        const rzad = document.createElement("div");
        rzad.className = "fav-row";

        let matchedGames3=[];
        gry.forEach(game => 
        {
            matchedGames3.push(games.find(graa => graa.name==game));
        }
        );
        console.log(matchedGames3);
        shuffleArray(matchedGames3);

        matchedGames3.forEach(gierka => {
            const card = document.createElement("div");
            card.className = "card";
            card.innerHTML = `
        <label class="favorite-container">
            <input type="checkbox" class="favorite-checkbox" />
            ${starSVG}
        </label>
        <a><img class="img" src="${gierka.image}" alt="${gierka.alt}" /></a>
        <div class="textBox">
            <a href="${gierka.link}">
                <img src="${gierka.logo}" alt="${gierka.name} Logo" class="game-logo" />
            </a>
            <span>by ${gierka.developer}</span>
            <p class="text price">${gierka.genre}</p>
        </div>
    `;
            rzad.appendChild(card);
        });

        sekcja.appendChild(rzad);
        kont.appendChild(sekcja);
}



