'use strict';
/* global Module */

/* Magic Mirror
 * Module: MMM-SnipsHideShow
 *
 * By Max Bachmann
 * MIT Licensed.
 */

Module.register('MMM-SnipsHideShow', {

  defaults: {
    mqttServer: '',
    topic: 'hermes/external/MagicMirror2',
    interval: 300000,
  },

  start: function() {
    Log.info('Starting module: ' + this.name);
    this.loaded = false;
    this.updateMqtt(this);
  },

  updateMqtt: function(self) {
    self.sendSocketNotification('MQTT_SERVER', { mqttServer: self.config.mqttServer, topic: self.config.topic, mode: self.config.mode });
    setTimeout(self.updateMqtt, self.config.interval, self);
  },


  socketNotificationReceived: function(notification, payload) {
    if (notification === 'MQTT_DATA' && payload.topic === this.config.topic) {
        if (payload.topic === 'MM_Hide' || payload.topic === 'MM_Show'){
            this.sendNotification(payload.data);
        }else if (payload.topic === 'MM_Move'){
        }
      this.loaded = true;
    }

    if (notification === 'ERROR') {
      this.sendNotification('SHOW_ALERT', payload);
    }
  },
});