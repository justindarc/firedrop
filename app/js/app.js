import Settings from 'js/models/settings.js';
import Storage from 'js/models/storage.js';

import HomeController from 'js/controllers/home.js';
import HomeView from 'js/views/home.js';

import SettingsController from 'js/controllers/settings.js';
import SettingsView from 'js/views/settings.js';

import BrowseController from 'js/controllers/browse.js';
import BrowseView from 'js/views/browse.js';

import ServerController from 'js/controllers/server.js';
import ServerView from 'js/views/server.js';

import AppController from 'js/controllers/app.js';

var settings = new Settings();
var storage = new Storage();

var homeView = new HomeView({
  el: document.getElementById('home-view')
});

var settingsView = new SettingsView({
  el: document.getElementById('settings-view')
});

var browseView = new BrowseView({
  el: document.getElementById('browse-view')
});

var serverView = new ServerView({
  el: document.getElementById('server-view')
});

var appController = new AppController({
  model: settings,
  storage: storage,

  controllers: {
    home: new HomeController({
      view: homeView,
      model: settings
    }),

    settings: new SettingsController({
      view: settingsView,
      model: settings
    }),

    browse: new BrowseController({
      view: browseView,
      model: settings
    }),

    server: new ServerController({
      view: serverView,
      model: settings
    })
  }
});

appController.setActiveView('home');
