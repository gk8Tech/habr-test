export const SuggestEnum = {
    User: 'user',
    Company: 'company'
} as const;

export type SuggestType = (typeof SuggestEnum)[keyof typeof SuggestEnum];

export interface IResponseSuggestList {
    data?: ISuggest[] | null,
}

export interface ISuggest {
    readonly type: SuggestType,
    readonly alias: string,
    avatar?: string,
    name?: string,
}


