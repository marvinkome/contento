import Site from '@models/sites';
import rateLimit from 'express-rate-limit';
import Page, { IPage } from '@models/pages';
import { keyBy } from 'lodash';
import { Router } from 'express';
import { authorizedToSite } from '@libs/auth';
import { handleError } from '@libs/errors';
const router = Router();

// rate limit
const limiter = rateLimit({
    windowMs: 1000,
    max: 120
});
router.use(limiter);

/**
 * This is the default endpoint, redirects to documentation
 */
router.get('/', (_, res) => {
    res.redirect('https://github.com/marvinkome/contento/wiki/Contento-API');
});

/**
 * This is the endpoint to get site basic details like name and id
 *
 * @param siteid: ID of the site to retrieve
 */
router.get('/sites/:siteid', authorizedToSite, async (req, res) => {
    const site = await Site.findOne({ _id: req.params.siteid });

    if (!site) {
        const error = handleError(404, 'Site not found');
        return res.status(error.statusCode).send(error.body);
    }

    return res.send({
        meta: {
            type: 'Site',
            id: site.id,
            createdAt: site.createdAt,
            updatedAt: site.updatedAt
        },
        name: site.name
    });
});

/**
 * This is the endpoint to get all the pages in a site
 *
 * @param siteid: ID of the site to retrieve
 */
router.get('/sites/:siteid/pages', authorizedToSite, async (req, res) => {
    const site = await Site.findOne({ _id: req.params.siteid });

    if (!site) {
        const error = handleError(404, 'Site not found');
        return res.status(error.statusCode).send(error.body);
    }

    const pages = await Page.find({ site: site.id }); // get all pages with this site
    const groupedPages = keyBy(
        pages.map((page: IPage) => ({
            meta: {
                type: 'Page',
                id: page.id,
                createdAt: page.createdAt,
                updatedAt: page.updatedAt
            },
            name: page.name,
            slug: page.slug
        })),
        'slug'
    );

    return res.send({
        meta: {
            type: 'Site',
            id: site.id,
            createdAt: site.createdAt,
            updatedAt: site.updatedAt
        },
        pages: groupedPages
    });
});

/**
 * This is the endpoint to get all details for a page
 *
 * @param siteid: ID of the site to retrieve
 * @param pageid: ID of the page to retrieve
 */
router.get('/sites/:siteid/pages/:page_slug', authorizedToSite, async (req, res) => {
    const page = await Page.findOne({ slug: req.params.page_slug, site: req.params.siteid });

    if (!page) {
        const error = handleError(404, 'Page not found');
        return res.status(error.statusCode).send(error.body);
    }

    const contents = keyBy(
        page.contents.map((content) => ({
            meta: {
                type: 'Content',
                id: content.id,
                createdAt: content.createdAt,
                updatedAt: content.updatedAt
            },
            type: content.type,
            name: content.name,
            slug: content.slug,
            content: content.content
        })),
        'slug'
    );

    return res.send({
        meta: {
            type: 'Page',
            id: page.id,
            createdAt: page.createdAt,
            updatedAt: page.updatedAt
        },
        name: page.name,
        slug: page.slug,
        contents
    });
});

export default router;
