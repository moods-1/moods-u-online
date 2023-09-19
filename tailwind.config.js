/** @type {import('tailwindcss').Config} */

module.exports = {
	content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
	theme: {
		extend: {
			keyframes: {
				'fade-in': {
					'0%': { opacity: 0 },
					'100%': {opacity: 1},
				}
			},
			animation: {
				'fade-in': 'fade-in 1500ms ease-in forwards',
			}

		},
	},
	plugins: [],
};
