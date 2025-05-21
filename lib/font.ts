import localFont from 'next/font/local'

export const poppins = localFont({
  src: [
    {
      path: '../public/assets/fonts/poppins/Poppins-Thin.ttf',
      weight: '100',
    },
    {
      path: '../public/assets/fonts/poppins/Poppins-ExtraLight.ttf',
      weight: '200',
    },
    {
      path: '../public/assets/fonts/poppins/Poppins-Light.ttf',
      weight: '300',
    },
    {
      path: '../public/assets/fonts/poppins/Poppins-Regular.ttf',
      weight: '400',
    },
    {
      path: '../public/assets/fonts/poppins/Poppins-Medium.ttf',
      weight: '500',
    },
    {
      path: '../public/assets/fonts/poppins/Poppins-SemiBold.ttf',
      weight: '600',
    },
    {
      path: '../public/assets/fonts/poppins/Poppins-Bold.ttf',
      weight: '700',
    },
    {
      path: '../public/assets/fonts/poppins/Poppins-ExtraBold.ttf',
      weight: '800',
    },
    {
      path: '../public/assets/fonts/poppins/Poppins-Black.ttf',
      weight: '900',
    },
  ],
  variable: '--font-poppins',
})
