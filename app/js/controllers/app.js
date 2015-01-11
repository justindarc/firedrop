/*global File*/

import { Controller } from 'components/mvc/dist/mvc.js';

import /*global P2PHelper*/ 'components/p2p-helper/dist/p2p-helper.js';

import /*global HTTPServer*/ 'components/fxos-web-server/dist/fxos-web-server.js';

export default class AppController extends Controller {
  constructor(options) {
    super(options);

    for (var controller in options.controllers) {
      options.controllers[controller].appController = this;
    }

    this.model.on('displayName', () => {
      P2PHelper.setDisplayName(this.model.displayName);
    });

    this.httpServer = new HTTPServer(8080);

    this.httpServer.addEventListener('request', (evt) => {
      var request  = evt.request;
      var response = evt.response;

      if (request.path.substr(-1) === '/') {
        request.path = request.path.substring(0, request.path.length - 1);
      }

      console.log(request);

      var path = decodeURIComponent(request.path) || '/';

      this.storage.list(path, function(directory) {
        if (directory instanceof File) {
          response.headers['Content-Type'] = directory.type;
          response.sendFile(directory);
          return;
        }

        var baseHref = request.path;
        if (baseHref !== '/') {
          baseHref += '/';
        }

        var rows = [];
        for (var name in directory) {
          rows.push('<tr>' +
            '<td>' +
              '<a href="' + baseHref + encodeURIComponent(name) + '"' +
                (directory[name] instanceof File ? ' target="_blank"' : '') +
              '>' +
                name +
              '</a>' +
            '</td>' +
            '<td>' +
              (directory[name] instanceof File ? 'File' : 'Folder') +
            '</td>' +
            '<td>' +
              (directory[name] instanceof File ? directory[name].size : '--') +
            '</td>' +
            '<td>' +
              (directory[name] instanceof File ? directory[name].lastModifiedDate.toLocaleFormat() : '--') +
            '</td>' +
          '</tr>');
        }

        rows = rows.join('');

        var body =
`<!DOCTYPE html>
<html>
<head>
  <style>
  table { width: 100%; }
  th { text-align: left; }
  </style>
</head>
<body>
  <h1>Index of ${path}</h1>
  <p>
    <a href="${baseHref}../">Up to parent level</a>
  </p>
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Type</th>
        <th>Size</th>
        <th>Last Modified</th>
      </tr>
    </thead>
    <tbody>${rows}</tbody>
  </table>
  <script>
    document.body.addEventListener('click', function(evt) {
      if (!evt.target.matches('a[target="_blank"]')) {
        return;
      }

      evt.preventDefault();

      window.open(evt.target.href, 'VIEWER');
    });
  </script>
</body>
</html>`;

        response.send(body);
      });
    });

    P2PHelper.addEventListener('peerlistchange', (evt) => {
      this.model.peers = evt.peerList;
    });

    P2PHelper.addEventListener('connected', (evt) => {
      console.log(evt.groupOwner);
      this.model.groupOwner = evt.groupOwner;

      // RECEIVED a connection from another device.
      if (evt.groupOwner.isLocal) {
        this.httpServer.start();
        this.setActiveView('server');
      }

      // INITIATED a connection from this device.
      else {
        this.setActiveView('browse');
      }
    });

    P2PHelper.addEventListener('disconnected', (evt) => {
      this.model.groupOwner = null;

      this.httpServer.stop();
      this.setActiveView('home');
    });

    P2PHelper.setDisplayName(this.model.displayName);
    P2PHelper.startScan();

    window.addEventListener('visibilitychange', (evt) => {
      if (document.hidden) {
        this.httpServer.stop();

        P2PHelper.stopScan();
        P2PHelper.disconnect();
        return;
      }

      P2PHelper.startScan();
    });
  }

  setActiveView(viewName) {
    if (this.activeView) {
      this.activeView.setActive(false);
    }

    var view = this.controllers[viewName].view;
    view.setActive(true);

    this.activeView = view;
  }

  connect(peer) {
    this.setActiveView('browse');

    P2PHelper.stopScan();
    P2PHelper.connect(peer.address);
  }

  disconnect() {
    this.setActiveView('home');

    P2PHelper.disconnect();
    P2PHelper.startScan();
  }
}
