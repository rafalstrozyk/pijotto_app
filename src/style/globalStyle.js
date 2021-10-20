import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`

html {
	font-size: 16px;
}

    html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;

	font: inherit;
	vertical-align: baseline;
	

}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}

* {
	transition: color .4s ease, background-color .4s ease;
}
body {
	
	font-size: 87.5%;
	line-height: 1;
	background-color: ${({ theme }) => theme.palette.primary.light};
	color: ${({ theme }) => theme.palette.primary.contrastText};
	overflow-y: ${({ state }) => (state.scroll ? 'scroll' : 'hidden')};	
	@media only screen and (min-width: 1366px) { 
		font-size: 106.25%;
	}
	@media only screen and (min-width: 768px) { 
		font-size: 100%;
	}
	@media only screen and (min-width: 414px) { 
		font-size: 93.75%;
	}
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}

#root {
	min-height: 100vh;
	display: grid;
	grid-template-rows:64px auto 200px;
	row-gap: 20px;
	grid-template-areas: 
		"navbar"
		"content"
		"footer";
	width: 100%;
	height: 100%;
}
`;
