export function convertToSlug(str) {
    return str
        .toLowerCase()
        .split(' ')
        .join('_');
}
