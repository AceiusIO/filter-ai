# filter-ai
 Learns to censor.

[![forthebadge](https://forthebadge.com/images/badges/made-with-javascript.svg)](https://forthebadge.com)  
![shields-io](https://img.shields.io/badge/Customization%20Options-Existing-green) ![shields-io](https://img.shields.io/badge/Development%20Progress-10%-orange)

filter-ai is a javascript algorithm designed to censor bad content: Hate Speech, Racism, Bullying, Swearing. It detects, deletes, and catalogs abusive messages. It's open source, and be implemented anywhere, from a discord bot to a minecraft server.

This is a breif overview of the documentation. For more information go to https://aceius.gitbook.io.

## 💾 Project setup
First, clone the project to disk with the GitHub CLI, GitHub Desktop, or however you get your git repos. You will need to do this if you want to help develop or build from source.  
In order to commit to the project or build the code, you will need the folowing installed:
 - [NodeJS](https://nodejs.dev) (For easy testing I guess)
 - [Yarn](https://yarnpkg.org) (Run `npm install yarn -g`)

Then, install the rest of the dependencies with yarn.
```sh
yarn install
```

## 📜 Creating Wordlists
You will need to create 3 wordlists for the app to function. If you just need to test the app, you can use `tiertest.txt`.  
An example wordlist.txt is as follows:
```txt
apple
orange
pear
```
Every word should be placed on its own line. There are no comments currently, but that may change.

### Tier #1
Tier one words should be words that most people would not be offended by, such as stupid. Minor insults, and wanna be swear words. Reccomended if you want the squeaky clean shine.
### Tier #2
Tier two words are words that a majority of people would find offensive, such as swear words. This is the default.
### Tier #3
Tier three words are words that almost all people would find offensive, such as racial slurs, NSFW language, and the likes. Turning this off would basically make the bot inactive so it can't be disabled.

## ⚙️ Customize configuration
Using filter.properties, we can set how much the bot will be active. By default the bot is on mode 2, filtering tier 2 words and above. You can change this to mode 3 (level 3 words only) or mode 1 (filter everything).

## 🚀 Running the App
Using Node.js, we can run the app with:
```sh
node main.js <tier1wordlist> <tier2wordlist> <tier3wordlist>
```

## 📜 Licencing
filter-ai is licenced under the GNU GPL v3, and as such, comes with no warranty, so if you do somthing stupid, I'm not responsible. :|