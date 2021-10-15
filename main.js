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
};

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

function randomHP(max) {
  return Math.ceil(Math.random() * max);
}

function changeHP(player) {
  const $playerLife = document.querySelector(
    ".player" + player.player + " .life"
  );

  const randomNum = randomHP(20);
  console.log(randomNum);

  if (player.hp <= randomNum) {
    player.hp = 0;
  } else {
    player.hp -= randomNum;
  }

  $playerLife.style.width = player.hp + "%";

  if (player.hp <= 0) {
    if (player === player1) {
      $arenas.appendChild(playerWin(player2.name));
    } else {
      $arenas.appendChild(playerWin(player1.name));
    }
  }
}

function playerWin(name) {
  const $winTitle = createElement("div", "loseTitle");
  $winTitle.innerText = name + " wins";
  $randomButton.disabled = true;

  return $winTitle;
}

$randomButton.addEventListener("click", function () {
  changeHP(player1);
  changeHP(player2);
});

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));
