import shortid from 'shortid';

export function convertToSlug(str) {
    return (
        str
            .toLowerCase()
            .split(' ')
            .join('_') +
        '_' +
        shortid.generate()
    );
}
