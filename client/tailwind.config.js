import defaultTheme from 'tailwindcss/defaultTheme'
import colors from 'tailwindcss/colors'

module.exports = {
    mode: 'jit',
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
        "./pages/**/*.{html,js}"
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter var', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                sky: colors.sky,
                cyan: colors.cyan,
            },
        },
    },
    darkMode: 'class',
    plugins: [
        require('@tailwindcss/forms')
    ]
}