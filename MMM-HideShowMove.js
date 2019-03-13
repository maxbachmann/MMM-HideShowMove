"use strict";
/*jshint esversion: 6 */ 
/**
 * @file mqtt-mm2-gateway.js
 * @author Max Bachmann <https://github.com/maxbachmann>
 * @version 0.1
 * @see https://github.com/maxbachmann-magicmirror2/mqtt-mm2-gateway.git
 */

/**
 * @license
 * Copyright (C) 2019 Max Bachmann
 * This program is free software: you can redistribute it and/or modify it
 * under the terms of the GNU General Public License as published by the 
 * Free Software Foundation, version 3. This program is distributed in the hope 
 * that it will be useful, but WITHOUT ANY WARRANTY; without even the implied 
 * warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. 
 * See the GNU General Public License for more details.
 * You should have received a copy of the GNU General Public License along with 
 * this program. If not, see <https://www.gnu.org/licenses/>.
 */

/* global Module Log MM */

/**
 * @external Module
 * @see https://github.com/MichMich/MagicMirror/blob/master/js/module.js
 */

/**
 * @external Log
 * @see https://github.com/MichMich/MagicMirror/blob/master/js/logger.js
 */

/**
 * @external MM
 * @see https://github.com/MichMich/MagicMirror/blob/master/js/main.js
 */

/**
 * @module mqtt-mm2-gateway
 * @description Gateway for mqtt and mm2 messages
 *
 * @requires external:Module
 * @requires external:Log
 * @requires external:MM
 */
Module.register("mqtt-mm2-gateway", {

  /**
   * @member {Object} defaults - Defines the default config values.
   * @property {string} host - host of the MQTT broker (domain or IPv4)
   * @property {int} port - Port of the MQTT broker
   * @property {array of strings} topics - Topics to subscribe
   * @property {string} username - username of the MQTT broker
   * @property {string} password - password of the MQTT broker
   */
  defaults: {
    host: 'localhost',
    port: 1883,
    username: "",
    password: ""
  },

  /**
   * @member {Object} options - MQTT options
   * @property {bool} clean - when false receive messages while offline
   * @property {string} clientID - clientID so it´s the same on reconnect
   */
  options: {},

  /**
   * @function start
   * @description Sets mode to initialising.
   * @override
   */
  start() {
    Log.info("Starting module: " + this.name);
    this.startHermes();
    this.loaded = true;
  },

  /**
   * @function username_is_set
   * @description check wether username is set in the config
   * @override
   *
   * @returns bool is Username set 
   */
  usernameIsSet(){
    return this.config.username !== "";
  },

  /**
   * @function start_MQTT_client
   * @description send the node_helper a message to start the mqtt client,
   * with the config options host, port, topics to subsribe to, username
   * and password
   * @override
   */
  startHermes(){
    this.options.host = this.config.host;
    this.options.port = this.config.port;
  
    if (this.usernameIsSet()){
        this.options.username = this.config.username; 
        this.options.password = this.config.password;
    }
    this.sendSocketNotification("HERMES_INIT", this.options);
  },

    /**
   * @function HideModule
   * @description Hide modules from the screen
   * @override
   */
  hideModule(payload){
    const modulename = payload.modulename;

    if (modulename === 'ALL'){
      MM.getModules().enumerate((module) => {
        module.hide();
      });
    } else{
      MM.getModules().enumerate((module) => {
        if (module.name === modulename) {
          module.hide();
        }
      });
    }
  },

  /**
   * @function ShowModule
   * @description Show modules on the screen
   * @override
   */
  showModule(payload){
    const modulename = payload.modulename;

    if (modulename.includes("PAGE")){
      MM.getModules().enumerate((module) => {
        if (this.config[modulename.toString()].indexOf(module) > -1) {
          module.show();
        }else{
          module.hide();
        }
      });
    } else {
      MM.getModules().enumerate((module) => {
        if (module.name === modulename) {
          module.show();
        }
      });
    }
  },

  /**
   * @function MoveModule
   * @description Move modules on the screen
   * @override
   */
  moveModule(payload){
    const modulename = payload.modulename;
    const targetRegion = payload.targetRegion;
    
    MM.getModules().enumerate((module) => {
      if (module.name === modulename) {
	      const instance = document.getElementById(module.identifier);
	      const region = document.querySelector(`div.region.${targetRegion} div.container`);
        region.insertBefore(instance, region.childNodes[0])
        region.style.display = 'block';
      }
    });
  },

  /**
   * @function notificationReceived
   * @description Handles incoming broadcasts from node_helper
   * @override
   *
   * @param {string} notification - Notification name
   * @param {*} payload - Detailed payload of the notification.
   */
  socketNotificationReceived(notification, payload) {

    switch(notification) {
      case "HIDE":
        this.hideModule(payload);
        break;
      case "SHOW":
        this.showModule(payload);
        break;
      case "MOVE":
        this.moveModule(payload);
        break;
      default:
        break;
    }
  }
});
