# MMM-SnipsHideShow

This is an extension for the [MagicMirror²](https://github.com/MichMich/MagicMirror).  It provides the ability to use it with the offline voice recognition Snips to Hide, Show and Move modules
To work this module requires the module Snips-MM2-Bridge and the offline Voice Recognition Snips with the MagicMirrorHideShow App and is currently only avaible in German. A explanation on how to install Snips and the App is included in the installation Guide.


## Installation
1. Follow the instructions for [Snips-MM2-Bridge](https://gitlab.com/CaptnsTech/snips-mm2-bridge)
2. Navigate into your MagicMirror's `modules` folder and execute `git clone https://gitlab.com/CaptnsTech/mmm-snipshideshow.git`. A new folder will appear, likely called `mmm-snipshideshow`.  Navigate into it.
3. Execute `npm install` to install the node dependencies.
5. The installation of the App inside Snips can be done according to this [explanation](https://snips.gitbook.io/getting-started/install-an-assistant). 
6. The app you need to add is called `MM2-HideShowMove` (more information about it can be found [here](https://gitlab.com/CaptnsTech/Snips-MagicMirror2))


## Using the module

To use this module, add this to the modules array in the `config/config.js` file:
````javascript
modules: [
	{
		module: 'MMM-SnipsHideShow',
		config: {
			// See 'Configuration options' for more information.
		}
	}
]
````

## Configuration options

The following options can be configured:

| Option  | Description  |
|---|---|
| `PAGEONE`  | modules to show on the first Page **See:** Pages |
| `PAGETWO`  | modules to show on the second Page **See:** Pages |
| `PAGETHREE`  | modules to show on the third Page **See:** Pages |
| `PAGEFOUR`  | modules to show on the fourth Page **See:** Pages |
| `PAGEFIVE`  | modules to show on the fifth Page **See:** Pages |
| `PAGESIX`  | modules to show on the Page sixth **See:** Pages |

## PAGES

Ah list of the modulenames of the modules that get shown on the Page. You find those modulenames in the `config.js` in the format `module : <modulename>`.
So the command for the config is 
```javascript
	PAGE<pagenumber>: [<modulename 1>, ... , <modulename n>, ],
```

## moduleNames

An object with the modules that you want to react on a command. The modulenames for those modules you can find in the `config.js` in the format `module : <modulename>`. Then simply change the `moduleNames object` in `MMM-SnipsHideShow.js`
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

- **Bug Reports**:  Make sure you're running the latest version. If the issue(s) still persist: please open a clearly documented issue with a clear title.
- **Minor Bug Fixes**: Please send a pull request with a clear explanation of the issue or a link to the issue it solves.
- **Major Bug Fixes**: please discuss your approach in an GitLab issue before you start to alter a big part of the code.
- **New Features**: please please discuss in a GitLab issue before you start to alter a big part of the code. Without discussion upfront, the pull request will not be accepted / merged.


## Planned
1. add more supported modules
2. english Version


The MIT License (MIT)
=====================

Copyright © 2018 Max Bachmann

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the “Software”), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

**The software is provided “as is”, without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose and noninfringement. In no event shall the authors or copyright holders be liable for any claim, damages or other liability, whether in an action of contract, tort or otherwise, arising from, out of or in connection with the software or the use or other dealings in the software.**
