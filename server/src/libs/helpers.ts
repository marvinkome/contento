import shortid from 'shortid';

export function convertToSlug(str: string) {
    return (
        str
            .toLowerCase()
            .split(' ')
            .join('_') +
        '_' +
        shortid.generate()
    );
}
