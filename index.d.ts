

declare module "djs-router" {

    import * as Discord from 'discord.js';

    export class RouterData {
        constructor();
        channel: Discord.Channel;
        oldChannel: Discord.Channel;
        newChannel: Discord.Channel;

        clientUserGuildSettings: Discord.ClientUserGuildSettings;
        clientUserSettings: Discord.ClientUserSettings;

        info: string;

        emoji: Discord.Emoji;
        oldEmoji: Discord.Emoji;
        newEmoji: Discord.Emoji;

        error: Error;

        guild: Discord.Guild;
        oldGuild: Discord.Guild;
        newGuild: Discord.Guild;

        user: Discord.User | Discord.UserResolvable;
        oldUser: Discord.User;
        newUser: Discord.User;

        member: Discord.GuildMember;
        oldMember: Discord.GuildMember;
        newMember: Discord.GuildMember;
        members: Discord.GuildMember[];

        speaking: boolean;
        time: Date;

        message: Discord.Message;
        oldMessage: Discord.Message;
        newMessage: Discord.Message;
        messages: Discord.Collection<Discord.Snowflake, Discord.Message>;

        messageReaction: Discord.MessageReaction;
        rateLimit: Discord.RateLimitInfo;
        replayed: number;

        role: Discord.Role;
        oldRole: Discord.Role;
        newRole: Discord.Role;

        oldNote: string;
        newNote: string;
        [key: string]: any;

    }

    export class RouteStop {
        constructor(key: string | RegExp, fnc: Function);

        key: string | RegExp;
        value: Function;
        fnc: Function;
        parentArrays: RouteStop[];
        parentRouter: Router;

        delete(): never;
        pushParent(arr: any, key: any): never;
        pushRouter(router: Router): never;
    }

    interface ContInterface {
        error?: boolean,
        empty?: boolean,
        nonEmpty?: boolean,
        bubble?: boolean,
    }

    type stopFunction = (data: RouterData, next: Function) => void;
    export type validStopFunction = stopFunction | { toStop: stopFunction };
    export type validKey = string | RegExp;

    export class Router {
        constructor();
        deletable(bool: boolean): never;
        continue(bool: ContInterface): never;
        getRegexRoute(key: string): RouteStop[];
        setRegex(stop: RouteStop, atStart: boolean): never;
        setRoute(stop: RouteStop, atStart: boolean): never;
        getRoute(key: string): RouteStop[];

        getStop(args: [validKey, validStopFunction]): RouteStop;
        getStop(args: [validStopFunction]): RouteStop;
        stop(key: validKey, value: validStopFunction): never;
        stop(key: validStopFunction): never;
        stops(ss_: [validKey, validStopFunction][] | [validStopFunction][]): never;
        start(key: validKey, value: validStopFunction): never;
        start(key: validStopFunction): never;
        starts(ss_: [validKey, validStopFunction][] | [validStopFunction][]): never;

        route(key: string, data_: RouterData): Promise<boolean>;
        route(key: string): Promise<boolean>;

        keyer(keyfnc: Function): never;
        anyStops(): boolean;
        toStop(): Function;
    }

    export function client(client: any): Router;

}

declare module "djs-router/cmd" {

    import { validStopFunction, validKey } from "djs-router";

    export class CommandSet extends Map {
        toStops(): [validKey, Function][];
        addCmd(key: validKey, fnc: validStopFunction, i: {}): never;
        addCmd(arr: [validKey, validStopFunction, {}][]): never;
    }

    export class Command {
        constructor(key: validKey, fnc: validStopFunction, i: {});
        key: validKey;
        fnc: validStopFunction;
        i: {};
    }

}