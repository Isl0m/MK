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
  $img.src = player.img;
  $character.appendChild($img);
}

createPlayer("player1", player1);
createPlayer("player2", player2);
