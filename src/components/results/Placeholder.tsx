import * as React from 'react';
import SearchImage from '../../assets/search.svg';
import * as styles from '../../pages/Intro.module.scss';

const PlaceHolder = () => (
  <div className={styles.container}>
    <div className={[styles.hireImage, styles.card].join(' ')}>
      <SearchImage/>
    </div>
  </div>
);
export default PlaceHolder;

// const PlaceHolder = () => (
//   <StaticQuery
//     query={graphql`
//       query {
//        file(relativePath: { eq: "happy-office.jpg" }) {
//         childImageSharp {
//           fluid(quality: 100, maxWidth: 600, maxHeight: 500) {
//             ...GatsbyImageSharpFluid
//           }
//         }
//        }
//       }
//     `}
//     render={(data) => <Img fluid={data.file.childImageSharp.fluid} />}
//   />
// );
// export default PlaceHolder;
