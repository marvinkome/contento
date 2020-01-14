import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import { FiTrash2 } from 'react-icons/fi';
import { DELETE_PAGE, GET_SITE_PAGES } from '../graphql';

export default function SinglePage({ page }) {
    const { siteid } = useParams();

    const [deletePage] = useMutation(DELETE_PAGE, {
        // update after mutation
        update(cache, { data }) {
            // read current data from cache
            const { site } = cache.readQuery({ query: GET_SITE_PAGES, variables: { siteid } });

            // re-write cache with new data from mutation
            cache.writeQuery({
                query: GET_SITE_PAGES,
                data: {
                    site: {
                        ...site,
                        pages: site.pages.filter((page) => page.id !== data.deletePage)
                    }
                }
            });
        },

        // variable
        variables: { siteid }
    });

    return (
        <div className="page">
            <div className="page-title">
                <Link
                    to={`/sites/${siteid}/editor/${page.id}`}
                    title={`Click to add contents to ${page.name} page`}
                >
                    {page.name}
                </Link>
            </div>

            <div className="page-actions">
                <FiTrash2
                    onClick={() => deletePage({ variables: { id: page.id } })}
                    title="Delete page"
                    className="delete-icon icon"
                />
            </div>
        </div>
    );
}
