import { Controller } from 'components/mvc/dist/mvc.js';

export default class HomeController extends Controller {
  constructor(options) {
    super(options);

    this.view.setDisplayName(this.model.displayName);

    this.model.on('displayName', () => {
      this.view.setDisplayName(this.model.displayName);
    });

    this.model.on('peers', () => {
      this.view.setPeers(this.model.peers);
    });
  }

  showSettings() {
    this.appController.setActiveView('settings');
  }

  connect(peer) {
    this.appController.connect(peer);
  }
}
