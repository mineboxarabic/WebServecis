export function checkId(id) {
    const error = { error: "Invalid id", ok: false, status: 400};
    if (id == undefined) {
        return error;
    }
    if (isNaN(id)) {
        error.error = "Id is not a number";
        return error;
    }
    return { ok: true };
}
export function checkForSpecialCharacters(str) {
    const error = { error: "Invalid string", ok: false, status: 400};
    if (str == undefined) {
        return error;
    }
    if (str.match(/^[a-zA-Z0-9]+$/)) {
        return { ok: true };
    }
    error.error = "String contains special characters";
    return error;

}

export function checkAttributes(obj){
    const error = { error: "Invalid user attributes, they are undefied or empty OR BOTH", ok: false, status: 400 };
    for (const key in obj) {
        if (obj[key] == undefined || obj[key] == "") {
            return error;
        }
    }
    return { ok: true };
}