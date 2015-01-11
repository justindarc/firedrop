import { View } from 'components/mvc/dist/mvc.js';

var template = `<form>
  <h1>Browse</h1>
  <h3>Connection Status: <span>Connecting...</span></h3>
  <iframe mozbrowser></iframe>
  <button type="button" data-action="close">Close</button>
</form>`;

export default class ShareView extends View {
  constructor(options) {
    super(options);

    this.render();
  }

  init(controller) {
    super(controller);

    this.status = this.$('h3 > span');
    this.iframe = this.$('iframe');

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

  setURL(url) {
    this.iframe.src = url || '';
  }
}
