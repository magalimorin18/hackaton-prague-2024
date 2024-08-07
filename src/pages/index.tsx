// core
import type { NextPage } from 'next';

// components
import NavBar from '../components/NavBar/NavBar';

// styles
import SocialGraph from '../components/SocialGraph/SocialGraph';

const Home: NextPage = () => {
  return (
    <div>
      <NavBar />

      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <SocialGraph />
        </div>
      </section>

      <div className="gap-8 columns-2 ...">
        <div className="w-full">
          {/* <pre className={styles.codeblock}>
            {JSON.stringify(graphData, null, 4)}
          </pre> */}
        </div>
      </div>
    </div>
  );
};

export default Home;
