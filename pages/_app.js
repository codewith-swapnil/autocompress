import { I18nextProvider } from 'react-i18next';
import i18n from '../utils/i18n';
import MainLayout from './MainLayout';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <I18nextProvider i18n={i18n}>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </I18nextProvider>
  );
}

export default MyApp;