

const mozillaVpn = {

  async init() {
    this.port = await browser.runtime.connectNative("mozillavpn");
    this.port.onMessage.addListener(this.handleResponse);

    // Is Mozilla VPN installed?
    await browser.storage.local.set({ "mozillaVpnInstalled": !this.port.error });

    // TODO get and set MozillaVpnAuthenticatedUser
    await browser.storage.local.set({ "mozillaVpnAuthenticatedUser": false });

    // TODO get and set mozillaVpnStatus
    await browser.storage.local.set({ "mozillaVpnStatus": false });

    const { mozillaVpnHideUi } = await browser.storage.local.get("mozillaVpnHideUi");
    if (typeof(mozillaVpnHideUi) === "undefined") {
      await browser.storage.local.set({ "mozillaVpnHideUi": true });
    }

    // TODO get and set MozillaVPN current exit server
    await browser.storage.local.set({ "mozillaVpnCurrentServer": {} });
  },

  getMozillaVpnServers() {
    this.port.postMessage({t: 'servers'});
  },

  handleResponse(response) {
    if (response.servers) {
      browser.storage.local.set({ "mozillaVpnServers": response.servers.countries });
    }
  },

  pickServerBasedOnWeight() {
    console.log("...sum all weights for servers in selected city");
    console.log("...pick random between 0 and sum");
    console.log("...if server weight is >= random, use it");
    console.log("...else subtract that server's weight from the sum and keep going");
  }
};

mozillaVpn.init();
