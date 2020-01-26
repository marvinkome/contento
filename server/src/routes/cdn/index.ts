import Site from '@models/sites';
import Page, { IPage } from '@models/pages';
import { Router } from 'express';
import { authorizedToSite } from '@libs/auth';
import { handleError, ErrorHandler } from '@libs/errors';
const router = Router();

/**
 * This is the endpoint to get site basic details like name and id
 *
 * @param siteid: ID of the site to retrieve
 */
router.get('/sites/:siteid', authorizedToSite, async (req, res, next) => {
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
router.get('/sites/:siteid/pages', authorizedToSite, async (req, res, next) => {
    const site = await Site.findOne({ _id: req.params.siteid });

    if (!site) {
        const error = handleError(404, 'Site not found');
        return res.status(error.statusCode).send(error.body);
    }

    const pages = await Page.find({ site: site.id }); // get all pages with this site

    return res.send({
        meta: {
            type: 'Site',
            id: site.id,
            createdAt: site.createdAt,
            updatedAt: site.updatedAt
        },
        pages: pages.map((page: IPage) => ({
            meta: {
                type: 'Page',
                id: page.id,
                createdAt: page.createdAt,
                updatedAt: page.updatedAt
            },
            name: page.name,
            slug: page.slug
        }))
    });
});

/**
 * This is the endpoint to get all details for a page
 *
 * @param siteid: ID of the site to retrieve
 * @param pageid: ID of the page to retrieve
 */
router.get('/sites/:siteid/pages/:page_slug', authorizedToSite, async (req, res, next) => {
    const page = await Page.findOne({ slug: req.params.page_slug, site: req.params.siteid });

    if (!page) {
        const error = handleError(404, 'Page not found');
        return res.status(error.statusCode).send(error.body);
    }

    return res.send({
        meta: {
            type: 'Page',
            id: page.id,
            createdAt: page.createdAt,
            updatedAt: page.updatedAt
        },
        name: page.name,
        slug: page.slug,
        contents: page.contents.map((content) => ({
            meta: {
                type: 'Content',
                id: content.id,
                createdAt: content.createdAt,
                updatedAt: content.updatedAt
            },
            type: content.type,
            name: content.name,
            content: content.content
        }))
    });
});

export default router;
