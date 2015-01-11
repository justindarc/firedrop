import { Controller } from 'components/mvc/dist/mvc.js';

export default class SettingsController extends Controller {
  constructor(options) {
    super(options);

    this.view.setDisplayName(this.model.displayName);
  }

  save() {
    this.model.setDisplayName(this.view.displayName.value);

    this.appController.setActiveView('home');
  }
}
