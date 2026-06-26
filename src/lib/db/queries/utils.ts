export function firstOrUndefined<T>(array: T[]) {
    if (array.length === 0) {
        return undefined
    }
    return array[0];
}