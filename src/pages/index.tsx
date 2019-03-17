import { graphql, useStaticQuery } from 'gatsby';
import * as React from 'react';
import * as styles from './Index.module.scss';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Skills from '../components/skills/Skills';
import Roles from '../components/roles/Roles';
import Industry from '../components/industry/Industry';
import Focus from '../components/focus/Focus';
import PlaceHolder from '../components/results/Placeholder';
import CompanyCard from '../components/results/CompanyCard';
import { useSpring, animated, useTransition, useChain, config } from 'react-spring';
import { CompanyInfo } from './../components/results/CompanyCard';

interface CompanyInfoProps {
  data: {
    allSanityCompany: {
      edges: {
        node: {
          id: string;
          companyName: string,
          contactPerson: string;
          contactNumber: string;
          email: string;
          website: string;
          recriutmentWebsite: string;
          biography: string;
          roles: {
            id: string;
            role: string;
          }
          skills: {
            id: string;
            skillName: string;
          }
        }
      },
    },
  };
}

export const indexPageQuery = graphql`
{
  allSanityCompany {
    edges {
      node {
        id
        companyName
        contactPerson
        contactNumber
        email
        website
        recriutmentWebsite
        biography
        roles {
          id
          role
        }
        skills {
          id
          skillName
        }
      }
    }
  }
}
`;

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#005056',
      main: '#005056',
      dark: '#005056',
      contrastText: '#fff',
    },
    secondary: {
      light: '#4C3735',
      main: '#4C3735',
      dark: '#4C3735',
      contrastText: '#fff',
    }
  }
});

export default function IndexPage() {

    const companyInfo: any = useStaticQuery(indexPageQuery);

    // const {name} = props.data.site.siteMetadata;
    const animateIn = useSpring({
      opacity: 1,
      from: { opacity: 0 },
      delay: 1000,
      duration: 2000
      });

    return (
      <MuiThemeProvider theme={theme}>
        <div className={styles.container}>
          <div className={styles.header}>
            <h1>Competence Match</h1>
          </div>
          <div className={styles.main}>
            <div className={[styles.industry, styles.card].join(' ')}>
              <Industry/>
            </div>
            <div className={[styles.selections, styles.selectionContainer].join(' ')}>
            {/* <h3 style={{color: '#005056'}}>Select your...</h3> */}
              <Focus/>
              <Roles/>
              <Skills/>
            </div>
            {companyInfo ? (
              <animated.div style={animateIn} className={styles.results}>
                 {companyInfo.allSanityCompany.edges.map((props: CompanyInfo) => {
                    return (
                      <div key={props.node.id}>
                        <CompanyCard
                          id={props.node.id}
                          companyName={props.node.companyName}
                          contactPerson={props.node.contactPerson}
                          email={props.node.email}
                          contactNumber={props.node.contactNumber}
                          website={props.node.website}
                          recruitmentWebsite={props.node.recruitmentWebsite}
                          biography={props.node.biography}
                        />
                      </div >
                    );
                  })
                }
            </animated.div>
            ) : (
              <div className={[styles.results, styles.resultsContainer].join(' ')}>
                 <PlaceHolder isVisible={true}/>
              </div>
            )}

            <div className={styles.footer}/>
          </div>
        </div>
      </MuiThemeProvider>
    );
}
