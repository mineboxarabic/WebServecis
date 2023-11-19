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

export function checkAttributes(obj){
    const error = { error: "Invalid user", ok: false, status: 400 };
    for (const key in obj) {
        if (obj[key] == undefined) {
            return error;
        }
    }
    return { ok: true };
}