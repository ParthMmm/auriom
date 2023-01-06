import { UserProfile } from '@clerk/nextjs';
import Link from 'next/link';

const UserProfilePage = () => (
  <div className="dark flex min-h-screen flex-col items-center justify-center bg-white py-24  dark:bg-black">
    <h1 className=" mb-24 text-4xl font-black tracking-tight text-white md:text-6xl">
      <Link href="/">auriom</Link>
    </h1>
    <UserProfile
      path="/auth/settings"
      routing="path"
      appearance={{
        variables: {
          colorPrimary: '#D013F6',
          colorTextSecondary: '#fff',
          fontFamily: 'var(--font-object-sans)',

          fontWeight: {
            normal: 315,
            medium: 570,
            bold: 730,
          },
        },
        layout: {
          socialButtonsVariant: 'iconButton',
        },
        elements: {
          card: {
            boxShadow: '6px 6px 0px #fff',
            border: '2px solid #fff',
            backgroundColor: '#000',
            textTransform: 'uppercase',

            // borderRadius
          },
          headerTitle: {
            fontSize: '24px',
          },
          button: {
            boxShadow: '3px 3px 0px #fff',
            border: '2px solid #fff',
            '&:focus': {
              boxShadow: '4px 4px 0px #fff',
              border: '2px solid #fff',
              transform: 'scale(1.01)',
            },
            '&:active': {
              boxShadow: '2px 2px 0px #fff',
              transform: 'translate(1px)',
            },
          },
          dividerBox: {
            display: 'none',
          },
          formFieldInput: {
            boxShadow: '3px 3px 0px #fff',
            border: '2px solid #fff',
            transition: 'all 0.2s ease-in-out',
            '&:focus': {
              boxShadow: '4px 4px 0px #fff',
              border: '2px solid #fff',
              transform: 'scale(1.01)',
            },
          },
          footer: {
            '& + div': {
              border: '2px solid #000',
              boxShadow: '-4px 1px 0 0 #000',
            },
          },
          footerActionLink: {
            fontWeight: 600,
            borderBottom: '2px solid',
            borderColor: '#E062F9',
            '&:focus': {
              boxShadow: 'none',
            },
          },
          logoImage: {
            filter: 'hue-rotate(140deg)',
          },
        },
      }}
    />
  </div>
);

export default UserProfilePage;
