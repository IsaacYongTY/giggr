import path from 'path';

import nextTranspileModules from 'next-transpile-modules';

const withTM = nextTranspileModules([
    '@fullcalendar/common',
    '@fullcalendar/daygrid',
    '@fullcalendar/react',
    '@fullcalendar/timegrid',
]);

module.exports = withTM({
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },
    // future: {
    //     webpack5: true,
    // }
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
