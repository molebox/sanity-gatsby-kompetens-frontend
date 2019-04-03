import * as React from 'react';
import Hire from '../assets/hire.svg';
import * as styles from './Intro.module.scss';

const Intro = () => (

    <div className={styles.container}>
      <div className={[styles.hireImage, styles.card].join(' ')}>
        <Hire/>
      </div>
    </div>
);
export default Intro;

// const Intro = () => (
//   <StaticQuery
//     query={graphql`
//       query {
//        file(relativePath: { eq: "hire.svg" }) {
//         childImageSharp {
//           fluid(quality: 100, maxWidth: 600, maxHeight: 500) {
//             ...GatsbyImageSharpFluid
//           }
//         }
//        }
//       }
//     `}
//     render={(data) => (
//     <div className={styles.container}>
//       <Img fluid={data.file.childImageSharp.fluid} />
//     </div>
//     )}
//   />
// );
// export default Intro;
