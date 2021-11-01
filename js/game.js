import { getRandom, timeNow, logs, HIT, ATTACK, sound } from "./utils.js";
import { Player } from "./player.js";

class Game {
  getPlayers = async () => {
    return await fetch(
      "https://reactmarathon-api.herokuapp.com/api/mk/players"
    ).then((res) => res.json());
  };

  getOpponet = async () => {
    return await fetch(
      "https://reactmarathon-api.herokuapp.com/api/mk/player/choose"
    ).then((res) => res.json());
  };

  postChanges = async (value, hit, defence) => {
    const body = await fetch(
      "http://reactmarathon-api.herokuapp.com/api/mk/player/fight",
      {
        method: "POST",
        body: JSON.stringify({
          value: value,
          hit: hit,
          defence: defence,
        }),
      }
    );

    let result = await body.json();

    return result;
  };

  start = async () => {
    let player1;
    let player2;

    const players = await this.getPlayers();
    const p1 = JSON.parse(localStorage.getItem("player1"));
    const p2 = await this.getOpponet();

    player1 = new Player({
      ...p1,
      player: 1,
      rootSelector: "arenas",
    });
    player2 = new Player({
      ...p2,
      player: 2,
      rootSelector: "arenas",
    });

    player1.createPlayer();
    player2.createPlayer();

    const $arenas = document.querySelector(".arenas");
    const $formFight = document.querySelector(".control");
    const $chat = document.querySelector(".chat");

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
        window.location.pathname = "index.html";
      });

      $reloadButtonDiv.appendChild($reloadButton);
      $arenas.appendChild($reloadButtonDiv);
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

    function showResult() {
      if (player1.hp === 0 && player1.hp < player2.hp) {
        $arenas.appendChild(playerWins(player2.name));
        sound(`./wins/${player2.name}.mp3`);
        generateLogs("end", player2, player1);
        createReloadButton();
      } else if (player2.hp === 0 && player2.hp < player1.hp) {
        $arenas.appendChild(playerWins(player1.name));
        sound(`./wins/${player1.name}.mp3`);
        generateLogs("end", player1, player2);
        createReloadButton();
      } else if (player1.hp === 0 && player2.hp === 0) {
        $arenas.appendChild(playerWins());
        generateLogs("draw");
        createReloadButton();
      }
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
          const logEnd = logs[type][getRandom(4) - 1]
            .replace("[playerWins]", name)
            .replace("[playerLose]", playerName2);

          return logEnd;
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

    function enemyAttack() {
      const hit = ATTACK[getRandom(3) - 1];
      const defence = ATTACK[getRandom(3) - 1];
      const value = getRandom(HIT[hit]);

      return {
        value,
        hit,
        defence,
      };
    }

    $formFight.addEventListener("submit", (e) => {
      e.preventDefault();
      const { hit: botHit, defence: botDef, value: botVal } = enemyAttack();
      const { hit: myHit, defence: myDef, value: myVal } = playerAttack();

      if (myDef !== botHit) {
        player1.changeHP(botVal);
        player1.renderHP();
        this.postChanges(botVal, botHit, botDef);
        generateLogs("hit", player2, player1, botVal);
      } else {
        this.postChanges(botVal, botHit, botDef);
        generateLogs("defence", player2, player1);
      }

      if (myHit !== botDef) {
        player2.changeHP(myVal);
        player2.renderHP();
        this.postChanges(myVal, myHit, myDef);
        generateLogs("hit", player1, player2, myVal);
      } else {
        this.postChanges(myVal, myHit, myDef);
        generateLogs("defence", player1, player2);
      }

      showResult();
    });
  };
}

export default Game;
