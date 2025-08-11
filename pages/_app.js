import '../styles/globals.css';
import { TranslationProvider } from '../context/TranslationContext';

export default function App({ Component, pageProps }) {
  return (
    <TranslationProvider>
      <Component {...pageProps} />
    </TranslationProvider>
  );
}