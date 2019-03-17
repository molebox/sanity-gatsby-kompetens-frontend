module.exports = {
  siteMetadata: {
    name: `Competence Match`,
    tagline: `get a job`
  },  
  plugins: [
    `gatsby-plugin-sass`,
    `gatsby-plugin-typescript`,
    `gatsby-plugin-tslint`,
    {
      resolve: 'gatsby-source-sanity',
      options: {
        projectId: 'e35olh42',
        dataset: 'kompetens',
        // a token with read permissions is required
        // if you have a private dataset
        // token: process.env.MY_SANITY_TOKEN
      }
    },
    {
      resolve: `gatsby-plugin-prefetch-google-fonts`,
      options: {
        fonts: [
          {
            family: `Montserrat`,
            subsets: [`latin`],
            variants: [`300`, `400`,`700`, `800`]
          },
          {
            family: `Open Sans`,
            variants: [`300`, `400`,`700`, `800`]
          },
        ],
      },
    }
  ],
}
