[![Codacy Badge](https://api.codacy.com/project/badge/Grade/86d29e99f3154b71951c97b4f53fe782)](https://www.codacy.com/app/MagicMirror2/MMM-HideShowMove?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=maxbachmann-magicmirror2/MMM-HideShowMove&amp;utm_campaign=Badge_Grade)

# MMM-SnipsHideShow
This is an extension for the [MagicMirror²](https://github.com/MichMich/MagicMirror).  It provides the ability to use it with the offline voice recognition Snips to Hide, Show and Move modules
To work this module requires the module [mqtt-mm2-gateway](https://github.com/maxbachmann-magicmirror2/mqtt-mm2-gateway) and the offline Voice Recognition [Snips](https://snips.ai) with the [MM2-HideShowMove App](https://console.snips.ai/store/de/skill_kzPyY9z80KY) and is currently only avaible in German. A explanation on how to install Snips and the App is included in the installation Guide.

[demonstration video german](https://www.youtube.com/watch?v=09XWlDiJ6dM)

## Installation
1.  Follow the instructions for [mqtt-mm2-gateway](https://github.com/maxbachmann-magicmirror2/mqtt-mm2-gateway)
2.  Navigate into your MagicMirror's `modules` folder and execute `git clone https://github.com/maxbachmann-magicmirror2/MMM-HideShowMove.git`. A new folder will appear, likely called `MMM-HideShowMove`.  Navigate into it.
3.  Execute `npm install` to install the node dependencies.
4.  The installation of the App inside Snips can be done according to this [explanation](https://docs.snips.ai/articles/console/actions/skills). 
5.  The app you need to add is called `MM2-HideShowMove` (more information about it can be found [here](https://github.com/maxbachmann-snips/Snips-MagicMirror2))

## Using the module
To use this module, add this to the modules array in the `config/config.js` file:
````javascript
modules: [
	{
		module: 'MMM-HideShowMove',
		config: {
			// See 'Configuration options' for more information.
		}
	}
]
````
Additionally `mqtt-mm2-gateway` needs to configured. Therefore configure it to subscribe the topic `external/MagicMirror2/HideShowMove/#`. A example config could look like this:
````javascript
modules: [
	{
		module: 'mqtt-mm2-gateway',
		config: {
			host: "localhost",	// hostname (required parameter)
			port: 1883,		// would not have to be specified since 1883 is the default aswell
			username: "user",	// this is a example DON´T use this password and username outside a test environment
			password: "password",
			topics: [
				"external/MagicMirror2/HideShowMove/#"
				//can be more topics in the list when needed for other modules
			]
		}
	}
]
````
In this example the broker runs on the same host as the gateway and on the default port 1883. It uses a username and password, so setting username and password in the gateway is not required when no username and password are set for the broker.
For a deeper explanation on the config of the `mqtt-mm2-gateway` read [this](https://github.com/maxbachmann-magicmirror2/mqtt-mm2-gateway) description

## Configuration options
The following options can be configured:

| option      | description                                                 |
|-------------|-------------------------------------------------------------|
| `PAGEONE`   | modules to show on the first Page **See:** [Pages](#pages)  |
| `PAGETWO`   | modules to show on the second Page **See:** [Pages](#pages) |
| `PAGETHREE` | modules to show on the third Page **See:** [Pages](#pages)  |
| `PAGEFOUR`  | modules to show on the fourth Page **See:** [Pages](#pages) |
| `PAGEFIVE`  | modules to show on the fifth Page **See:** [Pages](#pages)  |
| `PAGESIX`   | modules to show on the fixth Page **See:** [Pages](#pages)  |

## Pages
A list of the modulenames of the modules that get shown on the Page. You find those modulenames in the `config.js` in the format `module : <modulename>`.
So the command for the config is 
```javascript
	PAGE<pagenumber>: [<modulename 1>, ... , <modulename n>, ],
```

## Module Names
An object with the modules that you want to react on a command. The modulenames for those modules you can find in the `config.js` in the format `module : <modulename>` (e.g. "MMM-HideShowMove" for this module). Then simply change the `moduleNames object` in `MMM-HideShowMove.js`
The Format is 
```javascript
 moduleNames : {
   "ALL"       : "ALL",
   "PAGEONE"   : "PAGEONE",
   "PAGETWO"   : "PAGETWO",
   "PAGETHREE" : "PAGETHREE",
   "PAGEFOUR"  : "PAGEFOUR",
   "PAGEFIVE"  : "PAGEFIVE",
   "PAGEFIVE"  : "PAGEFIVE",
   <command>   : <moduleName of module that should react>,
   },
```

## Contributing Guidelines
Contributions of all kinds are welcome, not only in the form of code but also with regards bug reports and documentation.

Please keep the following in mind:

-   **Bug Reports**:  Make sure you're running the latest version. If the issue(s) still persist: please open a clearly documented issue with a clear title.
-   **Minor Bug Fixes**: Please send a pull request with a clear explanation of the issue or a link to the issue it solves.
-   **Major Bug Fixes**: please discuss your approach in an issue before you start to alter a big part of the code.
-   **New Features**: please please discuss in a issue before you start to alter a big part of the code. Without discussion upfront, the pull request will not be accepted / merged.

## Planned
1.  add more supported modules
2.  english Version
3.  add moduleNames into a yml file to make it easier to configure without altering the js code
