import { muiTheme } from 'storybook-addon-material-ui'
import '!style-loader!css-loader!sass-loader!../styles.scss';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

export const decorators = [
    muiTheme()
]