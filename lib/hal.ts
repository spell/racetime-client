export interface HalLink {
    href: string;
}

export interface HalPaginatedResponse<T> {
    _embedded: T;
    _links: {
        self: HalLink;
        profile: HalLink;
        search: HalLink;
        first?: HalLink;
        prev?: HalLink;
        next?: HalLink;
        last?: HalLink;
    };
    page:  {
        size: number;
        totalElements: number;
        totalPages: number;
        number: number;
    }
}
