module.exports = {
    presets: ['next/babel'],

    // fullcalendar attempts to import its own CSS files, but zzz.js does not allow this.
    // throw away these statements before they arrive at zzz.js,
    // but you'll need to import them manually in pages/_app.jsx.
    // will also work for any other 3rd-party packages that attempt to do this.
    overrides: [
        {
            include: ['./node_modules'],
            plugins: [
                [
                    'babel-plugin-transform-import-ignore',
                    {
                        patterns: ['.css'],
                    },
                ],
            ],
        },
    ],

    plugins: [['@babel/plugin-proposal-decorators', { legacy: true }]],
};
