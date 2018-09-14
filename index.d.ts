declare module "djs-router" {

    export class RouterData {
        constructor();
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
    type validStopFunction = stopFunction | { toStop: stopFunction };
    type validKey = string | RegExp;

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