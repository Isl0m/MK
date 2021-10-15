const player1 = {
  name: "Scorpion",
  hp: 50,
  img: "http://reactmarathon-api.herokuapp.com/assets/scorpion.gif",
  weapon: ["Kunai"],
  attack: function () {
    console.log(this.name + " " + "Fight...");
  },
};

const player2 = {
  name: "Sub Zero",
  hp: 80,
  img: "http://reactmarathon-api.herokuapp.com/assets/subzero.gif",
  weapon: ["Ice Sword"],
  attack: function () {
    console.log(this.name + " " + "Fight...");
  },
};

const player3 = {
  name: "Shao Kahn",
  hp: 120,
  img: "https://steamuserimages-a.akamaihd.net/ugc/579015388763284782/03E826805BA326A784A62CB64D018AFE74985B03/",
  weapon: ["Hammer"],
  attack: function () {
    console.log(this.name + " " + "Fight...");
  },
};

const player4 = {
  name: "Syrax ",
  hp: 100,
  img: "https://external-preview.redd.it/28ESNhsTrKldJMCRvMEIee4kzG4bDStKRd1QThoA5BU.gif?s=b7721072d3a765181ba168b460918168ad4fbb3c",
  weapon: ["Net"],
  attack: function () {
    console.log(this.name + " " + "Fight...");
  },
};

function createPlayer(playerClass, players) {
  const arenas = document.querySelector(".arenas");
  const player = {
    name: players.name,
    hp: players.hp,
    img: players.img,
  };

  const $player = document.createElement("div");
  $player.classList.add(playerClass);
  arenas.appendChild($player);

  const $progressbar = document.createElement("div");
  $progressbar.classList.add("progressbar");
  $player.appendChild($progressbar);

  const $life = document.createElement("div");
  $life.style.width = "100%";
  $life.classList.add("life");
  $progressbar.appendChild($life);

  const $name = document.createElement("div");
  $name.classList.add("name");
  $name.innerText = player.name;
  $progressbar.appendChild($name);

  const $character = document.createElement("div");
  $character.classList.add("character");
  $player.appendChild($character);

  const $img = document.createElement("img");
  $img.src = player.img;
  $character.appendChild($img);
}

createPlayer("player1", player1);
createPlayer("player2", player2);
const player1 = {
  name: "Scorpion",
  hp: 50,
  img: "http://reactmarathon-api.herokuapp.com/assets/scorpion.gif",
  weapon: ["Kunai"],
  attack: function () {
    console.log(this.name + " " + "Fight...");
  },
};

const player2 = {
  name: "Sub Zero",
  hp: 80,
  img: "http://reactmarathon-api.herokuapp.com/assets/subzero.gif",
  weapon: ["Ice Sword"],
  attack: function () {
    console.log(this.name + " " + "Fight...");
  },
};

function createPlayer(playerClass, players) {
  const arenas = document.querySelector(".arenas");
  const player = {
    name: players.name,
    hp: players.hp,
    img: players.img,
  };

  const $player = document.createElement("div");
  $player.classList.add(playerClass);
  arenas.appendChild($player);

  const $progressbar = document.createElement("div");
  $progressbar.classList.add("progressbar");
  $player.appendChild($progressbar);

  const $life = document.createElement("div");
  $life.classList.add("life");
  $progressbar.appendChild($life);

  const $name = document.createElement("div");
  $name.classList.add("name");
  $name.innerText = player.name;
  $progressbar.appendChild($name);

  const $character = document.createElement("div");
  $character.classList.add("character");
  $player.appendChild($character);

  const $img = document.createElement("img");
  $img.src = player.imsg;
  $character.appendChild($img);
}

createPlayer("player1", player1);
createPlayer("player2", player2);
