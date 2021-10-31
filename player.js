export class Player {
  constructor(props) {
    this.player = props.player;
    this.name = props.name;
    this.hp = props.hp;
    this.img = props.img;
    this.rootSelector = document.querySelector(".arenas");
    this.elHP = elHP;
    this.changeHP = changeHP;
    this.renderHP = renderHP;
  }
  createElement = (tag, className) => {
    const $tag = document.createElement(tag);
    if (className) {
      $tag.classList.add(className);
    }

    return $tag;
  };
  createPlayer = () => {
    const $player = this.createElement("div", `player${this.player}`);
    const $progressbar = this.createElement("div", "progressbar");
    const $life = this.createElement("div", "life");
    const $name = this.createElement("div", "name");
    const $character = this.createElement("div", "character");
    const $img = this.createElement("img");

    $life.style.width = this.hp + "%";
    $name.innerText = this.name;
    $img.src = this.img;

    $progressbar.appendChild($name);
    $progressbar.appendChild($life);

    $character.appendChild($img);

    $player.appendChild($progressbar);
    $player.appendChild($character);

    this.rootSelector.appendChild($player);
  };
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
