"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseService = exports.MESSAGES = exports.STATUS = void 0;
const STATUS = (message) => {
    const code = {
        success: 200,
        notFound: 404,
        notConnectDb: 400
    };
    return message ? code[message] : code['notConnectDb'];
};
exports.STATUS = STATUS;
const MESSAGES = (message) => {
    const code = {
        notConnectDb: 'could not connect to db'
    };
    return message ? code[message] : code['notConnectDb'];
};
exports.MESSAGES = MESSAGES;
const responseService = (code, data = null, errors) => {
    return Object.assign({ code, errors: errors !== null && errors !== void 0 ? errors : null }, (data && {
        data: data !== null && data !== void 0 ? data : {}
    }));
};
exports.responseService = responseService;
