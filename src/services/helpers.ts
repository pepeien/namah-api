export const orderObjectByKey = (unorderedObject: { [param: string]: any }) => {
    return Object.keys(unorderedObject)
        .sort()
        .reduce((obj: { [param: string]: any }, key) => {
            obj[key] = unorderedObject[key];

            return obj;
        }, {});
};

export const toCamelCase = (str: string) => {
    const map = {
        a: "á|à|ã|â|À|Á|Ã|Â",
        e: "é|è|ê|É|È|Ê",
        i: "í|ì|î|Í|Ì|Î",
        o: "ó|ò|ô|õ|Ó|Ò|Ô|Õ",
        u: "ú|ù|û|ü|Ú|Ù|Û|Ü",
        c: "ç|Ç",
        n: "ñ|Ñ",
    };

    for (const pattern in map) {
        str = str.replace(new RegExp(pattern, "g"), pattern);
    }

    return str
        .replace(/([-_][a-z]|[A-Z]|)/g, (word, index) => {
            return index === 0 ? word.toLowerCase() : word.toUpperCase();
        })
        .replace(/[^a-zA-Z]/g, "");
};

export const translateObjectKeys = <T>(targetObject: T): T => {
    let newObject = {};

    for (const [key, value] of Object.entries(targetObject as object)) {
        if (
            value &&
            typeof value === "object" &&
            typeof value.getMonth !== "function"
        ) {
            newObject = {
                ...newObject,
                [toCamelCase(key)]: Buffer.isBuffer(value)
                    ? value.toString("base64")
                    : translateObjectKeys(value),
            };
        } else {
            newObject = { ...newObject, [toCamelCase(key)]: value };
        }
    }

    return newObject as T;
};

export const translateObjectListKeys = <T>(targetObjectList: T[]): T[] => {
    const newObjectList = new Array(targetObjectList.length);

    targetObjectList.forEach((currentObject, index) => {
        newObjectList[index] = translateObjectKeys(currentObject);
    });

    return newObjectList;
};
