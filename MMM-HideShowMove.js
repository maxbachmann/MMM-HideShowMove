"use strict";
/**
 * @file MMM-HideShowMove.js
 * @author Max Bachmann <https://github.com/maxbachmann>
 * @version 0.1
 * @see https://github.com/project-alice-assistant/MMM-SnipsHideShow.git
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
/* global Module */

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
 * @module MMM-HideShowMove
 * @description moduel that hides, shows and moves modules
 *
 * @requires external:Module
 * @requires external:Log
 * @requires external:MM
 */
Module.register("MMM-HideShowMove", {

  /**
   * @member {Object} defaults - Defines the default config values.
   * @property {array of strings} PAGEONE - modules to show on page 1
   * @property {array of strings} PAGETWO - modules to show on page 2
   * @property {array of strings} PAGETHREE - modules to show on page 3
   * @property {array of strings} PAGEFOUR - modules to show on page 4
   * @property {array of strings} PAGEFIVE - modules to show on page 5
   * @property {array of strings} PAGESIX - modules to show on page 6
    */
  defaults: {
    PAGEONE: [],
    PAGETWO: [],
    PAGETHREE: [],
    PAGEFOUR: [],
    PAGEFIVE: [],
    PAGESIX: [],
    Startpage : "",
  },


  moduleNames: {
    "ALL"         : "ALL",
    "PAGEONE"     : "PAGEONE",
    "PAGETWO"     : "PAGETWO",
    "PAGETHREE"   : "PAGETHREE",
    "PAGEFOUR"    : "PAGEFOUR",
    "PAGEFIVE"    : "PAGEFIVE",
    "PAGESIX"     : "PAGESIX",
    "ALARM"       : "MMM-AlarmClock",
    "BACKGROUND"  : "MMM-EasyBack",
    "CALENDAR"    : "calendar",
    "CARDS"       : "MMM-CARDS",
    "CENSUS"      : "MMM-Census",
    "CLOCK"       : "clock",
    "COCKTAILS"   : "MMM-Cocktails",
    "COMPLIMENTS" : "compliments",
    "COWBOY"      : "MMM-NOAA",
    "DARWIN"      : "MMM-EOL",
    "EARTH"       : "MMM-EARTH",
    "EVENTS"      : "MMM-Events",
    "EYECANDY"    : "MMM-EyeCandy",
    "FAX"         : "MMM-rfacts",
    "FORTUNE"     : "MMM-Fortune",
    "JEOPARDY"    : "MMM-JEOPARDY",
    "LICE"        : "MMM-LICE",
    "LOCATION"    : "MMM-URHere",
    "LOTTERY"     : "MMM-Lottery",
    "MOON"        : "MMM-Lunartic",
    "NASA"        : "MMM-NASA",
    "NEO"         : "MMM-NEO",
    "NEWS"        : "newsfeed",
    "PETFINDER"   : "MMM-PetFinder",
    "PHONE"       : "MMM-FMI",
    "PICTURES"    : "MMM-EasyPix",
    "PILOTS"      : "MMM-PilotWX",
    "SHIPPING"    : "MMM-AfterShip",
    "STATION"     : "MMM-ISS",
    "STATS"       : "MMM-PC-Stats",
    "SUDOKU"      : "MMM-Sudoku",
    "SUNRISE"     : "MMM-SunRiseSet",
    "TIDES"       : "MMM-SORT",
    "TIMER"       : "MMM-EventHorizon",
    "TRIVIA"      : "MMM-ATM",
    "WEATHER"     : "weatherforecast"
    
  },

  start() {
    Log.info("Starting module: " + this.name);
    this.loaded = true;
  },

    /**
   * @function HideModule
   * @description Hide modules from the screen
   * @override
   */
  hideModule(payload){
    const data = JSON.parse(payload.toString());
    const moduleName = this.moduleNames[data.module.toString()];

    if (moduleName === "ALL"){
      MM.getModules().enumerate(module => module.hide());
    } else{
      MM.getModules().withClass(moduleName).enumerate(module => module.hide());
    }
  },

  /**
   * @function ShowModule
   * @description Show modules on the screen
   * @override
   */
  showModule(payload){
    const data = JSON.parse(payload.toString());
    const moduleName = this.moduleNames[data.module.toString()];

    if (moduleName.includes("PAGE")){
      MM.getModules().withClass(this.config[moduleName]).enumerate(module => module.show());
      MM.getModules().exceptWithClass(this.config[moduleName]).enumerate(module => module.hide());
    } else {
      MM.getModules().withClass(moduleName).enumerate(module => module.show());
    }
  },

  /**
   * @function MoveModule
   * @description Move modules on the screen
   * @override
   */
  moveModule(payload){
    const data = JSON.parse(payload.toString());
    const moduleName = this.moduleNames[data.module.toString()];
    const targetRegion = data.position.toString();
    
    MM.getModules().withClass(moduleName).enumerate((module) => {
      const instance = document.getElementById(module.identifier);
	    const region = document.querySelector(`div.region.${targetRegion} div.container`);
      region.insertBefore(instance, region.childNodes[0]);
      region.style.display = "block";
    });
  },

  /**
   * @function notificationReceived
   * @description Handles incoming broadcasts from other modules or the MagicMirror core.
   * @override
   *
   * @param {string} notification - Notification name
   * @param {*} payload - Detailed payload of the notification.
   */
  notificationReceived(notification, payload) {
    if(notification === 'DOM_OBJECTS_CREATED' && this.config.Startpage !== ""){
      MM.getModules().exceptWithClass(this.config[this.config.Startpage]).exceptWithClass(this.name).enumerate(module => module.hide());
      return
    }

    eventName = notification.replace('projectalice/events/', '')
    switch(eventName) {
      case 'onMagicMirrorHideModule':
        this.hideModule(payload);
        break;
      case 'onMagicMirrorShowModule':
        this.showModule(payload);
        break;
      case 'onMagicMirrorMoveModule':
        this.moveModule(payload);
        break;
    }
  }
});
