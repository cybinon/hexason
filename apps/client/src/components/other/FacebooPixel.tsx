import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Script from 'next/script'


const FacebookPixel = ({ children }: any) => {
  // const router = useRouter()
  const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID

  return (
    <Script id="facebook-pixel">
      {`
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', ${FB_PIXEL_ID});
        fbq('track', 'PageView');
      `}
    </Script>
  )
}
export default FacebookPixel