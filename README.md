# WEPO-Assigment2

## First step
1. Run `npm install -d` to install important dependencies.
2. Run `bower install` to install all external dependencies.

Note: might have to run with `sudo` command.

## Instruction
### Grunt commands
1. Run `grunt checkjs` to perform jshint for every `.js` file in the `client/` folder.
2. Run `grunt makejs` to concat every `.js` file in the `client/` folder and minify it. The output will go to `client/js/dest/output.min.js`.
3. Or just run the default `grunt` task to run all the tasks.

### Start servers
1. Run `./start-client.bat` to start simpleHTTPserver on port 8000.
2. Run `./start-server.bat` to start socket.io on port 8080.
