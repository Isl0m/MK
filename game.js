import { getRandom, timeNow } from "./utils.js";
import { logs, HIT, ATTACK, Player } from "./player.js";

const $arenas = document.querySelector(".arenas");
const $formFight = document.querySelector(".control");
const $chat = document.querySelector(".chat");

class Game {
  start = () => {
    class NewPlayer extends Player {
      constructor(props) {
        super(props);
        this.elHP = elHP;
        this.changeHP = changeHP;
        this.renderHP = renderHP;
      }
    }

    const player1 = new NewPlayer({
      player: 1,
      name: "SCORPION",
      hp: 100,
      img: "http://reactmarathon-api.herokuapp.com/assets/scorpion.gif",
    });

    const player2 = new NewPlayer({
      player: 2,
      name: "SUB ZERO",
      hp: 100,
      img: "http://reactmarathon-api.herokuapp.com/assets/subzero.gif",
    });

    function randomArena() {
      const arena = getRandom(4);
      $arenas.classList.add("arena" + arena);

      generateLogs("start", player1, player2);
    }

    randomArena();

    function createElement(tag, className) {
      const $tag = document.createElement(tag);
      if (className) {
        $tag.classList.add(className);
      }

      return $tag;
    }

    function createReloadButton() {
      const $reloadButtonDiv = createElement("div", "reloadWrap");
      const $reloadButton = createElement("button", "button");
      $reloadButton.innerText = "Restart";

      $reloadButton.addEventListener("click", function () {
        window.location.reload();
      });

      $reloadButtonDiv.appendChild($reloadButton);
      $arenas.appendChild($reloadButtonDiv);
    }

    function createPlayer({ player, name, hp, img }) {
      const $player = createElement("div", `player${player}`);
      const $progressbar = createElement("div", "progressbar");
      const $life = createElement("div", "life");
      const $name = createElement("div", "name");
      const $character = createElement("div", "character");
      const $img = createElement("img");

      $life.style.width = hp + "%";
      $name.innerText = name;
      $img.src = img;

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

    function renderHP() {
      const $playerLife = this.elHP();
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

    $arenas.appendChild(createPlayer(player1));
    $arenas.appendChild(createPlayer(player2));

    function enemyAttack() {
      const hit = ATTACK[getRandom(3) - 1];
      const defence = ATTACK[getRandom(3) - 1];

      return {
        value: getRandom(HIT[hit]),
        hit,
        defence,
      };
    }

    function showResult() {
      if (player1.hp === 0 && player1.hp < player2.hp) {
        $arenas.appendChild(playerWins(player2.name));
        generateLogs("end", player2, player1);
        createReloadButton();
      } else if (player2.hp === 0 && player2.hp < player1.hp) {
        $arenas.appendChild(playerWins(player1.name));
        generateLogs("end", player1, player2);
        createReloadButton();
      } else if (player1.hp === 0 && player2.hp === 0) {
        $arenas.appendChild(playerWins());
        generateLogs("draw");
        createReloadButton();
      }
    }

    function playerAttack() {
      const attack = {};

      for (let item of $formFight) {
        if (item.checked && item.name === "hit") {
          attack.value = getRandom(HIT[item.value]);
          attack.hit = item.value;
        }

        if (item.checked && item.name === "defence") {
          attack.defence = item.value;
        }

        item.checked = false;
      }

      return attack;
    }

    function whitchLog(
      type,
      { name } = {},
      { name: playerName2, hp } = {},
      hit
    ) {
      const time = timeNow();
      switch (type) {
        case "start":
          return logs[type]
            .replace("[time]", time)
            .replace("[player1]", name)
            .replace("[player2]", playerName2);
        case "end":
          return logs[type][getRandom(4) - 1]
            .replace("[playerWins]", name)
            .replace("[playerLose]", playerName2);
        case "hit":
          const logHit = logs[type][getRandom(18) - 1]
            .replace("[playerKick]", name)
            .replace("[playerDefence]", playerName2);
          return `${time} - ${logHit} -${hit} [${hp}/100]`;

        case "defence":
          const logDef = logs[type][getRandom(8) - 1]
            .replace("[playerKick]", name)
            .replace("[playerDefence]", playerName2);
          return time + " - " + logDef;
        case "draw":
          return logs[type][0];
      }
    }

    function generateLogs(type, player1, player2, hitHP) {
      const text = whitchLog(type, player1, player2, hitHP);

      const el = `<p>${text}</p>`;
      $chat.insertAdjacentHTML("afterbegin", el);
    }

    $formFight.addEventListener("submit", (e) => {
      e.preventDefault();
      const { hit: botHit, defence: botDef, value: botVal } = enemyAttack();
      const { hit: myHit, defence: myDef, value: myVal } = playerAttack();

      if (myDef !== botHit) {
        player1.changeHP(botVal);
        player1.renderHP();
        generateLogs("hit", player2, player1, botVal);
      } else {
        generateLogs("defence", player2, player1);
      }

      if (myHit !== botDef) {
        player2.changeHP(myVal);
        player2.renderHP();
        generateLogs("hit", player1, player2, myVal);
      } else {
        generateLogs("defence", player1, player2);
      }

      showResult();
    });
  };
}

export default Game;
