export function parseDuration(durationStr: string) {
    const regex = /^(\d+)(ms|s|m|h)$/;
    const match = durationStr.match(regex);
    if (!match) {
        return null;
    }
    const number = parseInt(match[1]);
    const unit = match[2];
    switch (unit) {
        case "ms":
            return number * 1;
        case "s":
            return number * 1000;
        case "m":
            return number * 60000;
        case "h":
            return number * 3600000;
    }
}