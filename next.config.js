const path = require('path');

const withTM = require('next-transpile-modules')([
    '@fullcalendar/common',
    '@fullcalendar/daygrid',
    '@fullcalendar/react',
    '@fullcalendar/timegrid',
]);

module.exports = withTM({
    pageExtensions: ['.tsx'],
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },
    async redirects() {
        return [
            {
                source: '/utilities',
                destination: '/utilities/metatool',
                permanent: true,
            },
        ];
    },
});
