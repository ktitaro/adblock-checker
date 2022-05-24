# AdBlock Checker

Checks whether resource is blocked on the website by one of the most popular adblockers.

# Most popular adblockers

* [AdBlock - best ad blocker](https://getadblock.com/en/) (10,000,000+ users)
* [AdBlock Plus - free ad blocker](https://adblockplus.org/) (10,000,000+ users)
* [uBlock Origin](https://ublockorigin.com/) (10,000,000+ users)

# How to run locally

Download most recent versions of adblockers extensions:

* [AdBlock releases](https://code.getadblock.com/releases/)
* [AdBlock Plus releases](https://gitlab.com/eyeo/adblockplus/downloads)
* [uBlock Origin releases](https://github.com/gorhill/uBlock/releases)

You should then unzip your downloads and move them to the `extensions` folder. By default that folder already contains archives of the most recent versions adblockers to the date, but they're moving fast and most likely you'll need to refresh them. If for some reason you don't want to refresh adblockers to latest version, just unpack the archives in the `extensions` folder.

```sh
$ yarn install
$ yarn start --help # information about utility
$ yarn start -w https://www.amiunique.org/ -r https://analytics.amiunique.org/matomo.js
```

When running first time, extensions will be installed. Unfortunately, you won't have a real data when program running first time. To get a real data, you need to run the program once again after installation 🤷‍♂️

```sh
# Example of an output
{
  "adblock": {
    "total": 1,
    "blocked": 0
  },
  "adblockplus": {
    "total": 1,
    "blocked": 0
  },
  "uBlock": {
    "total": 1,
    "blocked": 1
  }
```
