import { extendTheme, ThemeConfig } from "@chakra-ui/react"

const config: ThemeConfig = {
    initialColorMode: 'dark',
    useSystemColorMode: false
}
const colors = {
    brand: {
        900: '#1a365d',
        800: '#153e75',
        700: '#2a69ac',
    },

}

const fonts = {
    heading: `'Chivo', sans-serif`,
    body: `'Cabin', sans-serif`,
}

export const theme = extendTheme({ config, colors, fonts })