export async function getServerSideProps() {
  return {
    redirect: {
      destination: 'https://github.com/sk1t0n',
      permanent: false
    }
  };
}

export default function About() {
  return <div>About</div>;
}
