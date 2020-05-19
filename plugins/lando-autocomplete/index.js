'use strict';

const _ = require('lodash');

const getCommandArgumentCompletion = (tasksList, command, optionsInput) => {
    let options = [];
    _.forEach(tasksList, task => {
        const isCommandMatch = command !== task.command;
        if (isCommandMatch) {
            return;
        }
        options = Object.keys(task.options);
    });

    const missingCompletion = !options instanceof Array;
    if (missingCompletion) {
        console.log('Missing completion');
        return;
    }

    return options;
};

const getCommandCompletion = tasksList => {
    const commands = [];
    _.forEach(_.sortBy(tasksList, 'command'), task => {
        commands.push(task.command);
    });

    return commands;
};

module.exports = lando => {
    const pluginAddedObserverCount = 1;
    // Suppress max listener warnings
    // app.events.setMaxListeners(app.events.getMaxListeners() + pluginAddedObserverCount);

    lando.events.on('post-bootstrap-tasks', lando => {
        lando.autocomplete = {
            getCompletions: userInput => {
                let completions = [];
                let command, optionsInput;
                if (userInput.indexOf(' ')) {
                    // If user is tab completing bin/lando.js <tab>, do this.
                    [command, ...optionsInput] = userInput.split(' ');
                    completions = getCommandArgumentCompletion(lando.tasks, command, optionsInput);
                } else {
                    // If user is tab completing bin/lando.js command <tab>, do this.
                    completions = getCommandCompletion(lando.tasks);
                }
                return completions;
            }
        };
    });
};
