	//variables
import characters from "../data.json" with { type: "json" };

let rouletteTab = document.getElementById("roulette-tab");
let rankingsTab = document.getElementById("rankings-tab");
let rouletteView = document.getElementById("roulette-view");
let rankingsView = document.getElementById("rankings-view");

let rouletteButton = document.getElementById("roulette-button");

let charName = document.getElementById("char-name");
let charRealName = document.getElementById("char-real-name");
let charFirstAppearance = document.getElementById("char-first-appearance");
let charPowers = document.getElementById("char-powers");
let charNotableFeat = document.getElementById("char-notable-feat");
let charWhyUnderdog = document.getElementById("char-why-underdog");
let charPower = document.getElementById("char-power");
let charPopularityBadge = document.getElementById("char-popularity-badge");

let sortSelect = document.getElementById("sort-select");
let rankingsBody = document.getElementById("rankings-body");

let lastIndex = -1;

let charIcon = document.getElementById("char-icon");
let charLink = document.getElementById("char-link");

	//roulette and rankings functions 
function showCharacter(character) {
  charIcon.textContent = character.icon;
  charName.textContent = character.name;
  charRealName.textContent = "Real name: " + character.real_name;
  charFirstAppearance.textContent = "First appearance: " + character.first_appearance;
  charPowers.textContent = "Powers: " + character.powers.join(", ");
  charNotableFeat.textContent = character.notable_feat;
  charWhyUnderdog.textContent = character.why_underdog;
  charPower.textContent = character.power_level;
  charPopularityBadge.textContent = "Popularity: " + character.popularity_score;
  charLink.href = getWikiLink(character);
}

function spinRoulette() {
  let index = Math.floor(Math.random() * characters.length);

  if (index === lastIndex) {
    index = Math.floor(Math.random() * characters.length);
  }
  lastIndex = index;

  bamEffect();
  showCharacter(characters[index]);

  document.getElementById("intro-card").hidden = true;
  document.getElementById("character-card").hidden = false;
}

function buildRankingsRow(character) {
  let row = document.createElement("tr");

  let nameCell = document.createElement("td");
  nameCell.textContent = character.name;

  let powerCell = document.createElement("td");
  powerCell.textContent = character.power_level;

  let popularityCell = document.createElement("td");
  popularityCell.textContent = character.popularity_score;

  let gapCell = document.createElement("td");
  gapCell.textContent = character.power_level - character.popularity_score;

  row.appendChild(nameCell);
  row.appendChild(powerCell);
  row.appendChild(popularityCell);
  row.appendChild(gapCell);

  return row;
}

function renderRankings(sortBy) {
  let sorted = [...characters];

  if (sortBy === "power") {
    sorted.sort((a, b) => b.power_level - a.power_level);
  } else if (sortBy === "popularity") {
    sorted.sort((a, b) => b.popularity_score - a.popularity_score);
  } else {
    sorted.sort((a, b) => (b.power_level - b.popularity_score) - (a.power_level - a.popularity_score));
  }

  rankingsBody.innerHTML = "";
  sorted.forEach((character) => {
    rankingsBody.appendChild(buildRankingsRow(character));
  });
}

function showRouletteView() {
  rouletteView.hidden = false;
  rankingsView.hidden = true;

  document.getElementById("intro-card").hidden = true;
  document.getElementById("character-card").hidden = true;
  rouletteButton.hidden = false;
}

function showRankingsView() {
  rouletteView.hidden = true;
  rankingsView.hidden = false;
  renderRankings(sortSelect.value);
}

rouletteButton.addEventListener("click", spinRoulette);
rouletteTab.addEventListener("click", showRouletteView);
rankingsTab.addEventListener("click", showRankingsView);
sortSelect.addEventListener("change", function () {
  renderRankings(sortSelect.value);
});

function getWikiLink(character) {
  if (character.wiki_url) {
	return character.wiki_url;
  }
	let formattedName = character.name.replace(/ /g, "_");
	return "https://en.wikipedia.org/wiki/" + formattedName;
}


	// button pop-up
function bamEffect() {
    const words = ["BAM!", "POW!", "WHAM!", "ZAP!", "BOOM!"];
    const word = words[Math.floor(Math.random() * words.length)];
    
    const badge = document.createElement('div');
    badge.className = 'k-badge';
    badge.innerText = word;
    
    Object.assign(badge.style, {
        position: 'fixed',
        top: '85%',
        left: '60%',
        transform: 'translate(-50%, -50%) rotate(' + (Math.random() * 20 - 10) + 'deg) scale(0)',
        fontSize: '80px',
        zIndex: '9999',
        boxShadow: '8px 8px 0px var(--k-ink)',
        transition: 'transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
    });

    document.body.appendChild(badge);

    // trigger 
    requestAnimationFrame(() => {
        badge.style.transform = badge.style.transform.replace('scale(0)', 'scale(1)');
    });

    // remove
    setTimeout(() => {
        badge.remove();
    }, 800);
}


