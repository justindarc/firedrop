import { View } from 'components/mvc/dist/mvc.js';

var template = `<form>
  <h1>Server</h1>
  <h3>Connection Status: <span>Connecting...</span></h3>
</form>`;

export default class ReceiveView extends View {
  constructor(options) {
    super(options);

    this.files = [];

    this.render();
  }

  init(controller) {
    super(controller);

    this.status = this.$('h3 > span');

    this.on('click', 'button', (evt) => {
      var action = this.controller[evt.target.dataset.action];
      if (typeof action === 'function') {
        action.call(this.controller);
      }
    });
  }

  template() {
    return template;
  }

  setActive(active) {
    if (active) {
      this.el.classList.add('active');
    } else {
      this.el.classList.remove('active');
    }
  }

  setStatus(status) {
    this.status.textContent = status;
  }
}
