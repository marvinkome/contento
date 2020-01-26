export function convertToSlug(str: string) {
    return str
        .toLowerCase()
        .split(' ')
        .join('_');
}
