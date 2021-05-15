const path = require('path')
const withTM = require('next-transpile-modules')([
    '@fullcalendar/common',
    '@fullcalendar/daygrid',
    '@fullcalendar/react',
    '@fullcalendar/timegrid'
])

module.exports = withTM({
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')]
    },
    future: {
        webpack5: true,
    }

})