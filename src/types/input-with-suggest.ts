export const enum SuggestType {
    User = "user",
    Company = "company",
}

export interface IResponseSuggestList {
    data: ISuggest[] | null,
}

export interface ISuggest {
    type: SuggestType,
    alias: string,
    avatar?: string,
    name?: string,
}


