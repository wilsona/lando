'use strict';

const _ = require('lodash');

const getCommandArgumentCompletion = (task, optionsInput) => {
    let options = [];
    let lastInput = _.last(optionsInput);
    let lastOption;

    if (!_.startsWith(lastInput, '--')) {
        // we have an empty string or a partial option argument string
        // get the previous input
    }

    if (_.startsWith(lastInput, '--')) {
        let optionName = _.trimStart(lastInput, '-');
        let lastOption = task.options[optionName];
        let lastOptionBoolean = option.boolean;
    }

    if (!lastInput || lastOptionBoolean) {
        // suggest a new option
        options = Object.keys(task.options);

        const missingCompletion = !options instanceof Array;
        if (missingCompletion) {
            console.log('Missing completion');
            return;
        }

        options = _.map(options, option => `--${option}`);
        _.pullAll(options, optionsInput);
    } else {
        // try to complete an argument to the last option
    }

    return options;
};

module.exports = lando => {

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
