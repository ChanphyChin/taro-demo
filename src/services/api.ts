import request from 'superagent';
import { clone, forIn, isArray } from 'lodash';
import { API_ROOT } from './api-root';

export const METHOD_GET: string = 'get';
export const METHOD_POST: string = 'post';
export const METHOD_PUT: string = 'put';
export const METHOD_DELETE: string = 'delete';

const DEFAULT_METHOD: string = METHOD_GET;

const baseApiRoot = `${API_ROOT}`;

interface Config {
    method?: 'get'|'post'|'put'|'delete';
    apiRoot?: string;
    apiPath: string;
    params?: {
        [key:string]: any;
    };
    customHeaders?: {
        [key:string]: any;
    };
}

interface Api {
    request: (config: Config) => Promise<any>;
    get: (config: Config) => Promise<any>;
    post: (config: Config) => Promise<any>;
    put: (config: Config) => Promise<any>;
    delete: (config: Config) => Promise<any>;
}

export const api: Api = {
    /**
     * 发送请求
     * @param {object} config - 请求对象
     */
    request(config: Config) {
        let {
            method = DEFAULT_METHOD,
            apiRoot,
            apiPath,
            params = {},
            customHeaders,
        } = config;
        params = clone(params);
        const path = apiRoot + apiPath;
        // @ts-ignore
        let req = request[method](path);
        if (params) {
            switch (method) {
                case METHOD_GET:
                    forIn(params, (value, key) => {
                        if (isArray(value)) {
                            params[key] = value.join(',');
                        }
                    });
                    req = req.query(params);
                    break;
                case METHOD_DELETE:
                    break;
                default:
                    req = req.send(params);
                    break;
            }
        }

        // 设置请求头
        customHeaders && req.set(customHeaders);

        return req;
    },
    get: (config: Config) => Promise.resolve(),
    post: (config: Config) => Promise.resolve(),
    put: (config: Config) => Promise.resolve(),
    delete: (config: Config) => Promise.resolve(),
};

['get', 'post', 'put', 'patch', 'delete'].forEach(function(method: string) {
    // WARN: 该方法内使用了指向 api 的 this, 因此不可使用箭头函数；
     // @ts-ignore
    api[method] = function(data: Config, config: Config) {
        let { apiRoot = baseApiRoot, apiPath, params } = data;

        config = Object.assign({}, config, {
            method,
            apiRoot,
            apiPath,
            params,
        });
        return api
            .request(config)
            .then((response: any) => {
                return response.body;
            })
            .catch(errorHandle);
    };
});


/**
 * 请求失败处理
 * @param {object} error 请求信息
 * @returns {Promise}
 */
 function errorHandle(error: { status: number; }) {
     if(error.status === 401) {
        //  window.location.href = '/#/login';
     }
    return Promise.reject(error);
}