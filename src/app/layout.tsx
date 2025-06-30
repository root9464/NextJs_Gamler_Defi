import { GlobalProvider } from '@/components/providers/global';
import type { Metadata } from 'next';
import Head from 'next/head';
import Script from 'next/script';
import type { ReactNode } from 'react';
import './globals.css';

export const metadata: Metadata = {
  title: 'Gamler',
  description: 'Gamler online gamefi platform',
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang='en'>
      <Head>
        <meta httpEquiv='Content-Security-Policy' content="script-src 'self'; connect-src 'self';" />
      </Head>
      <body>
        <Script
          id='yandex-metrika'
          strategy='afterInteractive' // Загружаем после загрузки страницы
          dangerouslySetInnerHTML={{
            __html: `
            (function(m,e,t,r,i,k,a){
              m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
              m[i].l=1*new Date();
              for(var j=0;j<document.scripts.length;j++){
                if(document.scripts[j].src===r){return;}
              }
              k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
            })(window,document,"script","https://mc.yandex.ru/metrika/tag.js","ym");
            ym(98838447, "init", {
              clickmap: true,
              trackLinks: true,
              accurateTrackBounce: true,
              webvisor: true
            });
          `,
          }}
        />
        <GlobalProvider>{children}</GlobalProvider>
      </body>
    </html>
  );
}
