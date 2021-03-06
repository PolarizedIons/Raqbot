import * as Discord from 'discord.js';
import Raqbot from '../bot';
import Command from './command';
import RateCommand from "./rate.command";
import StatsCommand from './stats.command';

class CommandManager {

    /**
     * Array of loaded commands
     */
    private commands: Command[] = [];

    constructor(bot: Raqbot) {
        // Put new commands here
        this.commands.push(new StatsCommand(bot, ['stats']));
        this.commands.push(new RateCommand(bot, ['rate']));
    }

    /**
     * Evaluates if so-called command is registered
     * Then executes the command if found
     * @param message - Message Event to be evaluated
     */
    public evalCommand(message: Discord.Message) {

        // Splitting into argruments
        const args = message.content.split(' ');

        // Removing prefix from first argrument (label)
        args[0] = args[0].substring(1, args[0].length);

        // Looping over all commands
        for (const command of this.commands) {

            // Looping over all command aliases
            for (const alias of command.aliases) {
                if (args[0] === alias) {

                    // Executing command and passing the arguments without arg[0] (label)
                    command.execute(message, args.slice(1, args.length + 1));
                    return;
                }
            }

        }
    }

}

export default CommandManager;
