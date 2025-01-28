import { ImageResponse } from '@vercel/og';


export default async function handler() {
  return new ImageResponse(
    // <div
    //   style={{
    //     display: 'flex',
    //     fontSize: 40,
    //     color: 'white',
    //     background: 'black',
    //     width: '100%',
    //     height: '100%',
    //     textAlign: 'center',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //   }}
    // >
    //   <h1 tw=" text-4xl font-sans font-black tracking-tight text-white md:text-6xl">
    //     auriom
    //   </h1>
    // </div>
    <div
      style={{
        display: 'flex',
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        letterSpacing: '-.02em',
        fontWeight: 700,
        background: 'black',
      }}
    >
      <div
        style={{
          left: 42,
          top: 42,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <span
          style={{
            width: 24,
            height: 24,
            borderRadius: 12,
            background: '#3AF613',
          }}
        />
        <span
          style={{
            marginLeft: 8,
            fontSize: 20,
            color: 'white',
          }}
          tw="font-sans"
        >
          auriom.club
        </span>
      </div>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          padding: '20px 50px',
          margin: '0 42px',
          fontSize: 40,
          width: 'auto',
          maxWidth: 550,
          textAlign: 'center',
          backgroundColor: 'none',
          borderRadius: '16px',
          border: 'white',
          boxShadow: '6px 6px 0px rgb(255,255,255)',
          color: 'white',
          lineHeight: 1.4,
        }}
        tw="font-sans"
      >
        The social platform for music lovers.
      </div>
    </div>,
    {
      width: 800,
      height: 400,
    }
  );
}
