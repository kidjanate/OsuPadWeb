# [OsuPadWeb](https://osupad.kjn.in.th/)
A website for config and setting the [OsuPad](https://github.com/kidjanate/OsuPad)

If you're already have your own OsuPad. You can go to this website for config it!

## Features you can config
 * Keybinding (just this for now)

## Run command yourself
If you want to run the command to OsuPad with yourself you can press F12 and go to console then type
```js
getDevice(); // Select your OsuPad then connect
await RunCommand(`your command here`);
```

### The commands avaliable
```js
await RunCommand("config"); // Get the current config from OsuPad
await RunCommand("setkey-left A"); // Set the left key bind
await RunCommand("setkey-right A"); // Set the right key bind
```
