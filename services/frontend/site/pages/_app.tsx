import '@assets/main.css';
import '@assets/chrome-bug.css';
import 'keen-slider/keen-slider.min.css';

import { FC, useEffect } from 'react';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { CommerceProvider } from '@framework';
import useCart from '@framework/cart/use-cart';

import { Head } from '@components/common';
import { ManagedUIContext } from '@components/ui/context';
import { datadogRum } from '@datadog/browser-rum';

import userData from '@config/user_data.json';

datadogRum.init({
  applicationId: `${
    process.env.NEXT_PUBLIC_DD_APPLICATION_ID || 'DD_APPLICATION_ID_PLACEHOLDER'
  }`,
  clientToken: `${
    process.env.NEXT_PUBLIC_DD_CLIENT_TOKEN || 'DD_CLIENT_TOKEN_PLACEHOLDER'
  }`,
  site: `${process.env.NEXT_PUBLIC_DD_SITE || 'datadoghq.com'}`,
  service: `${process.env.NEXT_PUBLIC_DD_SERVICE || 'frontend'}`,
  version: `${process.env.NEXT_PUBLIC_DD_VERSION || '1.0.0'}`,
  env: `${process.env.NEXT_PUBLIC_DD_ENV || 'development'}`,
  sampleRate: 100,
  trackInteractions: true,
  trackFrustrations: true,
  defaultPrivacyLevel: 'mask-user-input',
  allowedTracingOrigins: [/http(?:s*):\/\/.*(?:\:*)/],
  enableExperimentalFeatures: ['clickmap']
});

datadogRum.startSessionReplayRecording();

const user = userData[Math.floor(Math.random() * userData.length)];

datadogRum.setUser(user);

const Noop: FC = ({ children }) => <>{children}</>;

const CartWatcher = () => {
  const { data: cartData } = useCart();
  useEffect(() => {
    if (!cartData) {
      return;
    }

    if (window) {
      window.onbeforeunload = function () {
        console.log('exiting...');
        if (cartData.totalPrice > 0) {
          datadogRum.addAction('User left without checking out', {
            createdAt: cartData.createdAt,
            discounts: cartData.discounts,
            id: cartData.id,
            lineItems: cartData.lineItems,
            subtotalPrice: cartData.subtotalPrice,
            totalPrice: cartData.totalPrice,
          });
        }
      };
    }

    // return function cleanup() {
    //   if (window) {
    //     window.onbeforeunload = null;
    //   }
    // };
  }, [cartData]);

  return null;
};

export default function MyApp({ Component, pageProps }: AppProps) {
  const { locale = 'en-US' } = useRouter();

  const Layout = (Component as any).Layout || Noop;

  useEffect(() => {
    document.body.classList?.remove('loading');
  }, []);

  return (
    <>
      <CommerceProvider locale={locale}>
        <Head />
        <ManagedUIContext>
          <CartWatcher />
          <Layout pageProps={pageProps}>
            <Component {...pageProps} />
          </Layout>
        </ManagedUIContext>
      </CommerceProvider>
    </>
  );
}
