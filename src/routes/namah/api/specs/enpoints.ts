import { Endpoint } from 'pepefolio';

export default [
    {
        name: 'Auth',
        path: 'auth',
        version: 1,

        variants: [
            {
                method: 'POST',
                parameters: {
                    body: [
                        {
                            label: 'email',
                            defaultValue: 'namahcast@big-bang-web.br',
                            type: 'string',
                        },
                        {
                            label: 'password',
                            defaultValue: '123456',
                            type: 'string',
                        },
                    ],
                },
            },
        ],
    },
    {
        name: 'Banners',
        path: 'banners',
        version: 1,
        variants: [
            {
                method: 'GET',
                parameters: {
                    query: [
                        {
                            label: 'id',
                            defaultValue: '552',
                            type: 'string',
                        },
                    ],
                },
            },
        ],
    },
    {
        name: 'Concepts',
        path: 'concepts',
        version: 1,
        variants: [
            {
                method: 'GET',
                parameters: {
                    query: [
                        {
                            label: 'limit',
                            defaultValue: '3',
                            type: 'number',
                        },
                    ],
                },
            },
        ],
    },
    {
        name: 'Courses',
        path: 'courses',
        version: 1,
        variants: [
            {
                method: 'GET',
                parameters: {
                    query: [
                        {
                            label: 'id',
                            defaultValue: '12023154',
                            type: 'string',
                        },
                        {
                            label: 'author',
                            defaultValue: 'Fernanda Cunha',
                            type: 'string',
                        },
                        {
                            label: 'limit',
                            defaultValue: '2',
                            type: 'number',
                        },
                    ],
                },
            },
        ],
    },
    {
        name: 'Podcasts',
        path: 'podcasts',
        version: 1,
        variants: [
            {
                method: 'GET',
                parameters: {
                    query: [
                        {
                            label: 'id',
                            defaultValue: '121',
                            type: 'string',
                        },
                        {
                            label: 'author',
                            defaultValue: 'Namahcast',
                            type: 'string',
                        },
                        {
                            label: 'limit',
                            defaultValue: '2',
                            type: 'number',
                        },
                    ],
                },
            },
        ],
    },
    {
        name: 'Posts',
        path: 'posts',
        version: 1,
        variants: [
            {
                method: 'GET',
                parameters: {
                    query: [
                        {
                            label: 'id',
                            defaultValue: '681',
                            type: 'string',
                        },
                        {
                            label: 'author',
                            defaultValue: 'Namahblogger',
                            type: 'string',
                        },
                    ],
                },
            },
        ],
    },
    {
        name: 'Products',
        path: 'products',
        version: 1,
        variants: [
            {
                method: 'GET',
                parameters: {
                    query: [
                        {
                            label: 'id',
                            defaultValue: '39',
                            type: 'string',
                        },
                        {
                            label: 'limit',
                            defaultValue: '3',
                            type: 'number',
                        },
                    ],
                },
            },
        ],
    },
    {
        name: 'Search',
        path: 'search',
        version: 1,
        variants: [
            {
                method: 'GET',
                parameters: {
                    query: [
                        {
                            label: 'q',
                            defaultValue: 'Namahblogger',
                            type: 'string',
                        },
                    ],
                },
            },
        ],
    },
    {
        name: 'Users',
        path: 'users',
        version: 1,
        variants: [
            {
                method: 'GET',
                parameters: {
                    query: [
                        {
                            label: 'name',
                            defaultValue: 'Namahcast',
                            type: 'string',
                        },
                    ],
                },
            },
        ],
    },
] as Endpoint[];
