import * as request from "request";

export function JSONResponse<T>(resolve: (value?: T | PromiseLike<T>) => void, reject: (reason?: any) => void): request.RequestCallback {
    return (error, response, body) => {
        if (error) {
            return reject(error);
        }
        if (response.statusCode !== 200) {
            return reject(new Error(`Unexpected status code ${response.statusCode}`));
        }
        if (typeof body === "string") {
            try {
                return resolve(JSON.parse(body));
            } catch (err) {
                return reject(err);
            }
        }
        return resolve(body);
    };
}

export function JSONRequest<T>(options: (request.UriOptions & request.CoreOptions)): Promise<T> {
    return new Promise((fulfill, reject) => {
        request(options, JSONResponse<T>(fulfill, reject));
    });
}
