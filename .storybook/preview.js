import GlobalStyles from "../src/GlobalStyles"
import Theme from '../src/Theme.js';
import GlobalFonts from '../src/assets/variable/fonts.js';
import { MemoryRouter } from "react-router-dom";


export const parameters = {
  //  layout: 'fullscreen',
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
    <MemoryRouter>
      <GlobalStyles />
      <GlobalFonts />
      <Theme>
      <Story />
      </Theme>
    </MemoryRouter>
  ),
]
