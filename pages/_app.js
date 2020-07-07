import React from 'react';
//Bootstrap CSS (this is first)
import 'bootstrap/dist/css/bootstrap.min.css';
//Styling CSS (this is 2nd so it overrides Bootstrap CSS and we don't need !important)
import '@/styles/main.scss';

const App = ({ Component, pageProps }) => <Component {...pageProps} />;

export default App;
