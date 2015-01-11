import { Model } from 'components/mvc/dist/mvc.js';

export default class Settings extends Model {
  constructor(properties) {
    super(properties);

    this.displayName = localStorage.getItem('displayName');
    if (!this.displayName) {
      this.setDisplayName('Unknown User');
    }

    this.peers = [];
    this.groupOwner = null;
  }

  setDisplayName(displayName) {
    this.displayName = displayName;
    localStorage.setItem('displayName', displayName);
  }
}
