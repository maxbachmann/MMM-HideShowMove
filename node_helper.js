/*jshint esversion: 6 */ 
var NodeHelper = require("node_helper");
const { withHermes } = require("hermes-javascript");

module.exports = NodeHelper.create({

    start() {
        console.log(this.name + ": Starting node helper");
        this.loaded = false;
    },

    hideModule: function(msg, flow) {
      console.log("Intent hide module received");
      const modulename = msg.slots.find(slot => slot.slotName === "MODULE");
      if (modulename != null){
        this.sendSocketNotification("HIDE", {modulename});
        return "Ich werde das Modul ausblenden";
      } else {
        return "Es tut mir Leid aber ich habe dich leider nicht verstanden.";
      }
    },

    showModule: function(msg, flow) {
      console.log("Intent show module received");
      const modulename = msg.slots.find(slot => slot.slotName === "MODULE");
      if (modulename != null){
        this.sendSocketNotification("SHOW", {modulename});
        return "Ich werde das Modul einblenden";
      } else {
        return "Es tut mir Leid aber ich habe dich leider nicht verstanden.";
      }
    },

    moveModule: function(msg, flow) {
      console.log("Intent move module received");
      const modulename = msg.slots.find(slot => slot.slotName === "MODULE");
      const targetRegion = msg.slots.find(slot => slot.slotName === "POSITION");
      if (modulename != null && targetRegion != null){
        this.sendSocketNotification("HIDE", {modulename, targetRegion});
        return "Ich werde das Modul bewegen";
      } else {
        return "Es tut mir Leid aber ich habe dich leider nicht verstanden.";
      }
    },

    hermesDialog(hermes, done){
      try {
        const dialog = hermes.dialog();

        const intents = [
          {
            intent: "maxbachmann:MM_HIDE",
            action: (msg, flow) => this.hideModule
          },
          {
            intent: "maxbachmann:MM_SHOW",
            action: (msg, flow) => this.showModule
          },
          {
            intent: "maxbachmann:MM_MOVE",
            action: (msg, flow) => this.moveModule
          }
        ];
        dialog.flows(intents);
      } catch (error) {
        done();
      }
    },

    startHermes(config) {
      this.maxRetryCount = config.maxRetryCount;
      const hermesOptions = {
        address: config.host + ":" + config.port,
        logs: true
      };

      if ("username" in config && "password" in config){
        hermesOptions.username = config.username;
        hermesOptions.password = config.password;
      }

      withHermes((hermes, done) => this.hermesDialog, hermesOptions);
    },

    socketNotificationReceived(notification, payload) {
        console.log(this.name + ": Socket notification received: ", notification, ": ", payload);
        if (notification === "HERMES_CONFIG") {
            this.startHermes(payload);
            this.loaded = true;
        }
    },
});
