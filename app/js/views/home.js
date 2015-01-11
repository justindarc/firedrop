import { View } from 'components/mvc/dist/mvc.js';

var template = `<div class="controls">
  <div class="radio">
    <div class="radio-wave"></div>
    <div class="radio-wave"></div>
    <div class="radio-wave"></div>
  </div>
  <div class="peers"></div>
  <button type="button" class="peer owner">
    <img src="images/user.png">
  </button>
</div>`;

export default class HomeView extends View {
  constructor(options) {
    super(options);

    this.peers = [];

    this.render();
  }

  init(controller) {
    super(controller);

    this.on('click', 'button', (evt) => {
      var peer = evt.target.dataset;
      if (!peer.address) {
        this.controller.showSettings();
        return;
      }

      this.controller.connect(peer);
    });
  }

  template() {
    return template;
  }

  render() {
    super();

    this.$('.owner').dataset.displayName = this.displayName;

    this.peers.forEach((peer) => {
      var button = document.createElement('button');
      button.type = 'button';
      button.className = 'peer';
      button.dataset.displayName = peer.name;
      button.dataset.address = peer.address;

      var avatar = document.createElement('img');
      avatar.src = 'images/user.png';

      button.appendChild(avatar);
      this.$('.peers').appendChild(button);
    });
  }

  setActive(active) {
    if (active) {
      this.el.classList.add('active');
    } else {
      this.el.classList.remove('active');
    }
  }

  setDisplayName(displayName) {
    this.displayName = displayName;

    this.render();
  }

  setPeers(peers) {
    this.peers = peers;

    this.render();
  }
}
