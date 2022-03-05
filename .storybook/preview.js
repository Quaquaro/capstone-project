import GlobalStyles from "../src/GlobalStyles"
import Theme from '../src/Theme.js';
import GlobalFonts from '../src/assets/variable/fonts.js';


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
  (Story) => (
    <>
      <GlobalStyles />
      <GlobalFonts />
      <Theme>
      <Story />
      </Theme>
    </>
  ),
]
