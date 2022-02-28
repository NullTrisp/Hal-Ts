interface HalObject {
    identifier: number | string,
    [key: string]: unknown,
    _embeded: HalEmbededObject | undefined
}

interface HalEmbededObject extends HalObject {
    url: string,
    _embeded: HalEmbededObject | undefined
}

export interface IHalBaseData {
    url: string,
    data: HalObject
}
export interface IHalResponseObject {
    _links: {
        self: {
            href: string
        }
    }
    [key: string]: unknown
    _embeded: IHalResponseObject | undefined
}

