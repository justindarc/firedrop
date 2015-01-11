import { View } from 'components/mvc/dist/mvc.js';

var template = `<form>
  <label>Display Name</label>
  <input type="text" name="displayName">
  <button type="button" data-action="save">Save</button>
</form>`;

export default class SettingsView extends View {
  constructor(options) {
    super(options);

    this.render();
  }

  init(controller) {
    super(controller);

    this.displayName = this.$('input[name="displayName"]');

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

  setDisplayName(displayName) {
    this.displayName.value = displayName;
  }
}
