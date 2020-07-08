import Site from '@models/sites';
import Page from '@models/pages';
import { IUser } from '@models/users';

export async function setupUserAfterSignUp(user: IUser): Promise<void> {
    // create an example site
    const site = new Site({
        name: 'Example site',
        description: 'This is an example site to get you started on Contento',
        owner: user
    });

    await site.save();

    // add contents into the page
    const contents = [
        {
            type: 'TEXT',
            name: 'Header Title',
            slug: 'headerTitle',
            content: 'Header Title'
        },
        {
            type: 'TEXT',
            name: 'Header Subtitle',
            slug: 'headerSubtitle',
            content: 'Header Title'
        },
        {
            type: 'TEXT',
            name: 'Body',
            slug: 'mainBody',
            content: 'This is body of the page'
        },
        {
            type: 'TEXT',
            name: 'Footer Text',
            slug: 'footerText',
            content: 'Some footer text'
        }
    ];

    // create an example page in the site
    const page = new Page({
        name: 'Homepage',
        slug: 'home',
        site: site.id,
        contents
    });

    await page.save();
}
