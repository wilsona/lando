'use strict';

const _ = require('lodash');

const getCommandArgumentCompletion = (task, optionsInput) => {
    let options = [];
    options = Object.keys(task.options);

    const missingCompletion = !options instanceof Array;
    if (missingCompletion) {
        console.log('Missing completion');
        return;
    }

    return options;
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
                [command, ...optionsInput] = userInput.split(' ');

                if (optionsInput.length === 0) {
                    // in command word, return all commands
                    completions = _.map(lando.tasks, task => task.command);
                } else {
                    // command word complete, return its options
                    completions = getCommandArgumentCompletion(
                            _.find(lando.tasks, task => command === task.command),
                            optionsInput);
                }

                return completions;
            }
        };
    });
};
