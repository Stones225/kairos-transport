import {ReactNode} from 'react';
import {NextIntlClientProvider} from 'next-intl';
import Header from '../src/components/Layout/Header';
import Footer from '../src/components/Layout/Footer';

export function generateStaticParams() {
  return [{locale: 'en'}, {locale: 'fr'}];
}

export default async function RootLayout({
  children,
  params: {locale}
}: {
  children: ReactNode;
  params: {locale: string};
}) {
  let messages;
  try {
    messages = (await import(`./${locale}/messages`)).default;
  } catch (error) {
    messages = (await import('./en/messages')).default;
  }

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Header locale={locale} />
          {children}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
