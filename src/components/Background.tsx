import * as React from 'react';
import { graphql, StaticQuery } from 'gatsby';
import BackgroundImage from 'gatsby-background-image';

const imgStyle = {
    position: '',
    opacity: '0.8',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover'
};

const Background = ({className, children}: any) => (
    <StaticQuery
        query={graphql`
        query {
            file(relativePath: { eq: "desk.jpg" }) {
            childImageSharp {
                fluid(quality: 100, maxWidth: 4160, maxHeight: 2500) {
                ...GatsbyImageSharpFluid_withWebp
                }
            }
            }
        }
        `}
        render={(data: any) => {
        // Set ImageData.
        const imageData = data.file.childImageSharp.fluid;
        return (
            <BackgroundImage
                Tag="section"
                className={className}
                fluid={imageData}
                style={imgStyle}
            >
            {children}
            </BackgroundImage>
        );
        }
    }
    />
);

export default Background;
