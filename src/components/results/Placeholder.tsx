import * as React from 'react';
import { graphql } from "gatsby"
import Img from "gatsby-image"
import * as styles from './PlaceHolder.module.scss';

interface Props {
    isVisible: boolean;
}

export default function PlaceHolder({data}: any) {
console.log({data});
    return <div><Img fixed={data.file.childImageSharp.fixed} /></div>
    // return data ? (
    //     <div className={styles.outerContainer}>
    //         <div className={styles.container}>
    //         <Img fixed={data.file.childImageSharp.fixed} />
    //         </div>
    //     </div>
    // ) : null;
}

export const query = graphql`
  query {
    file(relativePath: { eq: "assets/happy-office.jpg" }) {
      childImageSharp {
        # Specify the image processing specifications right in the query.
        # Makes it trivial to update as your page's design changes.
        fixed(width: 125, height: 125) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`
