import { Links, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react';
import type { LinksFunction } from '@remix-run/node';

// import Header from './components/Header';
// import Footer from './components/Footer';
import './tailwind.css';

export const links: LinksFunction = () => [
  { rel: 'preconnect', href: 'https://api.fontshare.com' },
  {
    rel: 'stylesheet',
    href: 'https://api.fontshare.com/v2/css?f[]=general-sans@300,400,500,600,700&display=swap',
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {/* <Header /> */}
        {children}
        <ScrollRestoration />
        <Scripts />
        {/* <Footer /> */}
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
