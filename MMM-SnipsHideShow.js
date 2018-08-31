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
    PAGEONE: ["clock", "MMM-EyeCandy", "compliments", "calendar","newsfeed"],
    PAGETWO: [],
    PAGETHREE: [],
    PAGEFOUR: [],
    PAGEFIVE: [],
    PAGESIX: [],
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

  start: function() {
    Log.info('Starting module: ' + this.name);
    this.loaded = true;
  },

  NotificationReceived: function(notification, payload) {
    const topic = 'SnipsBridge/external/MagicMirror2/';
    if (notification.includes(topic)) {
      const data = JSON.parse(payload.toString());
      const modulename = this.moduleNames[data.module.toString()];
      if (notification === topic + 'MM_Hide'){
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
      } else  if (notification === topic + 'MM_Show'){
        if (modulename.includes("PAGE")){
          MM.getModules().enumerate((module) => {
            if (this.config[modulename.toString()].indexOf(module) > -1) {
              module.show();
            }else{
              module.hide();
            }
          });
        } else{
          MM.getModules().enumerate((module) => {
            if (module.name === modulename) {
              module.show();
            }
          });
        }
      }else if (notification === topic + 'MM_Move'){
        const targetRegion = data.position;
        MM.getModules().enumerate((module) => {
          if (module.name === modulename) {
	          const instance = document.getElementById(module.identifier);
	          const region = document.querySelector(`div.region.${targetRegion} div.container`);
            region.insertBefore(instance, region.childNodes[0])
            region.style.display = 'block';
          }
        });
      }
    }
  }
});