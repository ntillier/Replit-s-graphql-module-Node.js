export declare const configFields: string[];
export interface IJsonToGraphQLOptions {
    pretty?: boolean;
    ignoreFields?: string[];
    includeFalsyKeys?: boolean;
}
export declare function jsonToGraphQLQuery(query: any, options?: IJsonToGraphQLOptions): string;
