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
    interval: 300000,
  },

  start: function() {
    Log.info('Starting module: ' + this.name);
    this.loaded = false;
    this.updateMqtt(this);
  },

  updateMqtt: function(self) {
    self.sendSocketNotification('MQTT_SERVER', { mqttServer: self.config.mqttServer});
    setTimeout(self.updateMqtt, self.config.interval, self);
  },


  socketNotificationReceived: function(notification, payload) {
    if (notification === 'MQTT_DATA') {
      topic = 'hermes/external/MagicMirror2/';
      data = JSON.parse(payload.data);
      if (payload.topic === topic + 'MM_Hide' || payload.topic === topic + 'MM_Show'){
          this.sendNotification(data.message.toString());
      }else if (payload.topic === topic + 'MM_Move'){
      }
      this.loaded = true;
    }

    if (notification === 'ERROR') {
      this.sendNotification('SHOW_ALERT', payload);
    }
  },
});