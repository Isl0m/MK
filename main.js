const $arenas = document.querySelector(".arenas");
const $randomButton = document.querySelector(".button");

const player1 = {
  player: 1,
  name: "SCORPION",
  hp: 100,
  img: "http://reactmarathon-api.herokuapp.com/assets/scorpion.gif",
  weapon: ["Kunai"],
  attack: function () {
    console.log(this.name + " " + "Fight...");
  },
  changeHP: changeHP,
  elHP: elHP,
  renderHP: renderHP,
};

const player2 = {
  player: 2,
  name: "SUB ZERO",
  hp: 100,
  img: "http://reactmarathon-api.herokuapp.com/assets/subzero.gif",
  weapon: ["Ice Sword"],
  attack: function () {
    console.log(this.name + " " + "Fight...");
  },
  changeHP: changeHP,
  elHP: elHP,
  renderHP: renderHP,
};

const player3 = {
  player: 1,
  name: "SHAO KAHN",
  hp: 100,
  img: "https://steamuserimages-a.akamaihd.net/ugc/579015388763284782/03E826805BA326A784A62CB64D018AFE74985B03/",
  weapon: ["Hammer"],
  attack: function () {
    console.log(this.name + " " + "Fight...");
  },
  changeHP: changeHP,
  elHP: elHP,
  renderHP: renderHP,
};

const player4 = {
  player: 2,
  name: "SYRAX",
  hp: 100,
  img: "https://i.gifer.com/origin/2e/2e8108db082da512d16404bdcb5fbc1c_w200.gif",
  weapon: ["Net"],
  attack: function () {
    console.log(this.name + " " + "Fight...");
  },
  changeHP: changeHP,
  elHP: elHP,
  renderHP: renderHP,
};

function randomArena() {
  const arena = getRandom(4);
  $arenas.classList.add("arena" + arena);
}

randomArena();

function createElement(tag, className) {
  const $tag = document.createElement(tag);
  if (className) {
    $tag.classList.add(className);
  }

  return $tag;
}

function createPlayer(playerObj) {
  const $player = createElement("div", "player" + playerObj.player);
  const $progressbar = createElement("div", "progressbar");
  const $life = createElement("div", "life");
  const $name = createElement("div", "name");
  const $character = createElement("div", "character");
  const $img = createElement("img");

  $life.style.width = playerObj.hp + "%";
  $name.innerText = playerObj.name;
  $img.src = playerObj.img;

  $progressbar.appendChild($name);
  $progressbar.appendChild($life);

  $character.appendChild($img);

  $player.appendChild($progressbar);
  $player.appendChild($character);

  return $player;
}

function changeHP(hp) {
  this.hp -= hp;

  if (this.hp <= 0) {
    this.hp = 0;
  }
}

function elHP() {
  return document.querySelector(".player" + this.player + " .life");
}

function renderHP($playerLife) {
  $playerLife.style.width = this.hp + "%";
}

function playerWins(name) {
  const $winTitle = createElement("div", "loseTitle");
  if (name) {
    $winTitle.innerText = name + " wins";
  } else {
    $winTitle.innerText = "draw";
  }

  return $winTitle;
}

function getRandom(max) {
  return Math.ceil(Math.random() * max);
}

$randomButton.addEventListener("click", function () {
  player1.changeHP(getRandom(20));
  player2.changeHP(getRandom(20));
  player1.renderHP(player1.elHP());
  player2.renderHP(player2.elHP());

  if (player1.hp === 0 || player2.hp === 0) {
    $randomButton.disabled = true;
    createReloadButton();
  }

  if (player1.hp === 0 && player1.hp < player2.hp) {
    $arenas.appendChild(playerWins(player2.name));
  } else if (player2.hp === 0 && player2.hp < player1.hp) {
    $arenas.appendChild(playerWins(player1.name));
  } else if (player1.hp === 0 && player2.hp === 0) {
    $arenas.appendChild(playerWins());
  }
});

function createReloadButton() {
  const $reloadWrap = createElement("div", "reloadWrap");
  const $restartButton = createElement("button", "button");
  $restartButton.innerText = "Restart";
  $reloadWrap.appendChild($restartButton);
  $arenas.appendChild($reloadWrap);

  $restartButton.addEventListener("click", function () {
    window.location.reload();
  });
}

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));

