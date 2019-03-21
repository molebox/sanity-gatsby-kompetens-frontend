import * as React from 'react';
import { graphql, StaticQuery } from 'gatsby';
import Img from 'gatsby-image';
import * as styles from './PlaceHolder.module.scss';

const PlaceHolder = () => (
  <StaticQuery
    query={graphql`
      query {
       file(relativePath: { eq: "happy-office.jpg" }) {
        childImageSharp {
          fluid(quality: 100, maxWidth: 600, maxHeight: 500) {
            ...GatsbyImageSharpFluid
          }
        }
       }
      }
    `}
    render={(data) => <Img fluid={data.file.childImageSharp.fluid} />}
  />
);
export default PlaceHolder;

// interface Props {
//     isVisible: boolean;
// }

// export default function PlaceHolder({data}: any) {
// console.log({data});
// return (
//         <div>
//           <Img fixed={data.file.childImageSharp.fixed} />
//         </div>
//     );
//     // return data ? (
//     //     <div className={styles.outerContainer}>
//     //         <div className={styles.container}>
//     //         <Img fixed={data.file.childImageSharp.fixed} />
//     //         </div>
//     //     </div>
//     // ) : null;
// }

// export const query = graphql`
//   query {
//     file(relativePath: { eq: "assets/happy-office.jpg" }) {
//       childImageSharp {
//         fixed(width: 125, height: 125) {
//           ...GatsbyImageSharpFixed
//         }
//       }
//     }
//   }
// `
