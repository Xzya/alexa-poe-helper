import { RequestEnvelope, ResponseEnvelope } from "../node_modules/ask-sdk-model";
import { handler } from "../lambda/custom";
import { IntentTypes, SlotTypes, RequestTypes, LocaleTypes } from "../lambda/custom/lib/constants";

export type PartialDeep<T> = {
    [P in keyof T]?: PartialDeep<T[P]>;
};

/**
 * Accepts a partial T object and returns it as T.
 * Useful when you only need a few fields of T but still want to get type
 * completions and to suppress compilation error.
 * 
 * @param value 
 */
export function partial<T>(value: PartialDeep<T>): T {
    return (value as any) as T;
}

/**
 * Calls the skill handler with the given RequestEnvelope. Returns a promise
 * with the response.
 * 
 * @param event 
 */
export function skill(event: RequestEnvelope) {
    return new Promise((fulfill, reject) => {
        return handler(event, null, (err, res) => {
            if (err) return reject(err);
            return fulfill(res);
        });
    });
}

/**
 * Returns a partial ResponseEnvelope with the given ssml pattern.
 * 
 * @param pattern 
 */
export function ssml(pattern: string | RegExp) {
    return partial<ResponseEnvelope>({
        response: {
            outputSpeech: {
                ssml: expect.stringMatching(pattern)
            }
        }
    });
}

/**
 * Returns a RequestEnvelope with the given type.
 * 
 * @param options 
 */
export function RequestWithType(options: {
    type: RequestTypes;
    locale: LocaleTypes;
}) {
    return partial<{}>({
        "context": {
            "System": {}
        },
        "request": {
            "type": options.type,
            "locale": options.locale
        }
    }) as RequestEnvelope;
}

/**
 * Returns a RequestEnvelope with the given intent.
 * 
 * @param options 
 */
export function RequestWithIntent(options: {
    name: IntentTypes;
    locale: LocaleTypes;
}) {
    return partial<RequestEnvelope>({
        "context": {
            "System": {}
        },
        "request": {
            "type": "IntentRequest",
            "locale": options.locale,
            "intent": {
                "name": options.name
            }
        }
    });
}

/**
 * InProgress dialog with slot value match
 */

export function RequestInProgressMatch(options: {
    intentName: IntentTypes;
    locale: LocaleTypes,
    slotName: SlotTypes;
    slotValue: string;
}) {
    return partial<RequestEnvelope>({
        "context": {
            "System": {}
        },
        "request": {
            "type": "IntentRequest",
            "locale": options.locale,
            "intent": {
                "name": options.intentName,
                "confirmationStatus": "NONE",
                "slots": {
                    [options.slotName]: {
                        "name": options.slotName,
                        "value": options.slotValue,
                        "resolutions": {
                            "resolutionsPerAuthority": [
                                {
                                    "status": {
                                        "code": "ER_SUCCESS_MATCH"
                                    },
                                    "values": [
                                        {
                                            "value": {
                                                "name": options.slotValue
                                            }
                                        }
                                    ]
                                }
                            ]
                        },
                        "confirmationStatus": "NONE"
                    }
                }
            },
            "dialogState": "STARTED"
        }
    });
}

export function ResponseInProgressMatch(options: {
    intentName: IntentTypes;
    slotName: SlotTypes;
    slotValue: string;
}) {
    return partial<ResponseEnvelope>({
        "response": {
            "directives": [
                {
                    "type": "Dialog.Delegate",
                    "updatedIntent": {
                        "name": options.intentName,
                        "confirmationStatus": "NONE",
                        "slots": {
                            [options.slotName]: {
                                "name": options.slotName,
                                "value": options.slotValue,
                                "confirmationStatus": "NONE"
                            }
                        }
                    }
                }
            ]
        }
    });
}

/**
 * InProgress dialog with ambiguous slot values.
 */

export function RequestInProgressAmbiguous(options: {
    intentName: IntentTypes,
    slotName: SlotTypes,
    slotResolutionValues: string[];
}) {
    return partial<RequestEnvelope>({
        "context": {
            "System": {}
        },
        "request": {
            "type": "IntentRequest",
            "locale": "en-US",
            "intent": {
                "name": options.intentName,
                "confirmationStatus": "NONE",
                "slots": {
                    "quest": {
                        "name": options.slotName,
                        "value": "",
                        "resolutions": {
                            "resolutionsPerAuthority": [
                                {
                                    "status": {
                                        "code": "ER_SUCCESS_MATCH"
                                    },
                                    "values": options.slotResolutionValues.map((item) => {
                                        return {
                                            "value": {
                                                "name": item
                                            }
                                        };
                                    })
                                }
                            ]
                        },
                        "confirmationStatus": "NONE"
                    }
                }
            },
            "dialogState": "IN_PROGRESS"
        }
    });
}

export function ResponseInProgressAmbiguous(options: {
    slotName: SlotTypes,
    pattern: string | RegExp;
}) {
    return partial<ResponseEnvelope>({
        "response": {
            "outputSpeech": {
                "type": "SSML",
                "ssml": expect.stringMatching(options.pattern)
            },
            "directives": [
                {
                    "type": "Dialog.ElicitSlot",
                    "slotToElicit": options.slotName
                }
            ],
            "reprompt": {
                "outputSpeech": {
                    "type": "SSML",
                    "ssml": expect.stringMatching(options.pattern)
                }
            },
            "shouldEndSession": false
        },
    });
}

/**
 * Completed dialog.
 */

export function RequestCompleted(options: {
    intentName: IntentTypes;
    locale: LocaleTypes,
    slotName: SlotTypes;
    slotValue: string;
}) {
    return partial<RequestEnvelope>({
        "context": {
            "System": {}
        },
        "request": {
            "type": "IntentRequest",
            "locale": "en-US",
            "intent": {
                "name": options.intentName,
                "confirmationStatus": "NONE",
                "slots": {
                    "quest": {
                        "name": options.slotName,
                        "value": options.slotValue,
                        "resolutions": {
                            "resolutionsPerAuthority": [
                                {
                                    "status": {
                                        "code": "ER_SUCCESS_MATCH"
                                    },
                                    "values": [
                                        {
                                            "value": {
                                                "name": options.slotValue,
                                            }
                                        }
                                    ]
                                }
                            ]
                        },
                        "confirmationStatus": "NONE"
                    }
                }
            },
            "dialogState": "COMPLETED"
        }
    });
}
