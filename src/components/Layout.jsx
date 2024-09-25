import { Toaster } from 'react-hot-toast';
import Header from './Header/Header';

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            padding: '16px',
            marginTop: '80px',
          },
        }}
      />
      {children}
    </>
  );
}
