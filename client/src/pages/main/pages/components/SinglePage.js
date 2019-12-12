import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { FiTrash2 } from 'react-icons/fi';
import { DELETE_PAGE, GET_PAGES } from '../graphql';

export default function SinglePage({ page }) {
    const [deletePage] = useMutation(DELETE_PAGE, {
        update(cache, { data }) {
            // read current data from cache
            const { pages } = cache.readQuery({ query: GET_PAGES });

            // re-write cache with new data from mutation
            cache.writeQuery({
                query: GET_PAGES,
                data: { pages: pages.filter((page) => page.id !== data.deletePage) }
            });
        }
    });

    return (
        <div className="page">
            <div className="page-title">
                <a href="/editor/569987" title="Click to add contents to Page name page">
                    {page.name}
                </a>
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
