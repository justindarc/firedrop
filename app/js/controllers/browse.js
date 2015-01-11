import { Controller } from 'components/mvc/dist/mvc.js';

export default class BrowseController extends Controller {
  constructor(options) {
    super(options);

    this.model.on('groupOwner', () => {
      var groupOwner = this.model.groupOwner;
      this.setStatus(groupOwner ? 'Connected!' : 'Connecting...');

      this.view.setURL(groupOwner && 'http://' + groupOwner.ipAddress + ':8080/');
    });
  }

  close() {
    this.appController.disconnect();
    this.appController.setActiveView('home');
  }

  setStatus(status) {
    this.view.setStatus(status);
  }
}
