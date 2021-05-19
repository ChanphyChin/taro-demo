export interface MessageDataInterface {
    config: {
      component: string;
      config: string;
    },
    index: number;
    items: any[];
    pageType?: string;
    type?: string;
}
export interface ComponentConfigInterface {
    [key: string]: any;
}

export interface CustomerTextConfig {
    color: string;
    fontSize: number;
    text: string;
}