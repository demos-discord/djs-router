

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

    export interface ToStopInterface {
        toStop: () => validStopFunction;
    }
    export interface ToStopsInterface {
        toStops: () => [validKey, validStopFunction][];
    }
    type stopFunction = (data: RouterData, next: Function) => void;
    export type validStopFunction = stopFunction | ToStopInterface;
    export type validKey = string | RegExp;

    export class Router implements ToStopInterface {
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
        stops(ss_: [validKey, validStopFunction][] | [validStopFunction][] | ToStopsInterface): never;
        start(key: validKey, value: validStopFunction): never;
        start(key: validStopFunction): never;
        starts(ss_: [validKey, validStopFunction][] | [validStopFunction][] | ToStopsInterface): never;

        route(key: string, data_: RouterData): Promise<boolean>;
        route(key: string): Promise<boolean>;

        keyer(keyfnc: (data: RouterData) => any): never;
        anyStops(): boolean;
        toStop(): validStopFunction;
    }

    export function client(client: any): Router;

    interface SymbolMetadataObj {
        [key: string]: Symbol
    }

    export const Symbol: SymbolMetadataObj;

}

declare module "djs-router/cmd" {

    import { validStopFunction, validKey, ToStopInterface, ToStopsInterface } from "djs-router";
    type validCommandInfo = {
        [key: string]: any
    }

    export class CommandSet extends Map implements ToStopsInterface {
        toStops(): [validKey, validStopFunction][];
        addCmd(key: validKey, fnc: validStopFunction, i?: validCommandInfo): never;
        addCmds(arr: [validKey, validStopFunction, validCommandInfo?][]): never;
        addCmd(key: Command): never;
    }

    export class Command {
        constructor(key: validKey, fnc: validStopFunction, i: {});
        key: validKey;
        fnc: validStopFunction;
        i: {};
    }

}