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
import {useSpring, animated} from 'react-spring';
import {CompanyInfo} from './../components/results/CompanyCard';

import * as _ from 'lodash';
import { Options } from './../components/commonTypes';
import { ValueType } from 'react-select/lib/types';

interface CompanyInfoProps {
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
          focus: {
            id: string;
            focus: string;
          }
          roles: {
            id: string;
            role: string;
          }
          skills: {
            id: string;
            skillName: string;
          }
        }
      };
    };
}

interface Focus {
  id: string;
  focus: string;
}
interface Roles {
  id: string;
  role: string;
}
interface Skills {
  id: string;
  skillName: string;
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
        focus {
          id
          focus
        }
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

function MatchedFocus(selectedFocuses: string[], companyFocuses: string[]) {
  const matchedFocuses: Focus[] = [];

  const findFocusById = _.keyBy(companyFocuses, 'id');

  selectedFocuses.forEach((focus: any) => {
    const match = findFocusById[focus.id];
    matchedFocuses.push(match);
  });
  return matchedFocuses;
}

function Search(company: CompanyInfoProps, selectedFocuses?: string[], selectedRoles?: Roles[], selectedSkills?: Skills[]) {
  const matches = [];

  if (selectedFocuses) {
    console.log('selectedFocuses: ', selectedFocuses);
    const test = MatchedFocus(selectedFocuses, company.allSanityCompany.edges);
    console.log('TESTING FOCUS: ', test);


  }

  if (selectedRoles) {
    company.allSanityCompany.edges.map((comp) => {
      matches.push(comp);
      matches.sort();
    });
  }

  if (selectedSkills) {
    company.allSanityCompany.edges.map((comp) => {
      matches.push(comp);
      matches.sort();
    });
  }

  return matches;
}

export default function IndexPage() {

    const companyInfo: any = useStaticQuery(indexPageQuery);

    // const {name} = props.data.site.siteMetadata;
    const animateIn = useSpring({
      opacity: 1,
      from: { opacity: 0 },
      delay: 1000,
      duration: 2000
      });

    const getSelectedFocus = (selectedFocus: ValueType<Options[]>) => {
      const focuses: string[] = [];
      if (selectedFocus) {
        selectedFocus.forEach((focus: Options) => {
          focuses.push(focus.id);
        });
      }
      Search(companyInfo, focuses);
    };
    const getSelectedRoles = (selectedRoles: ValueType<Options[]>) => {
      const roles: string[] = [];
      if (selectedRoles) {
        selectedRoles.forEach((role: Options) => {
          roles.push(role.id);
        });
      }
    };
    const getSelectedSkills = (selectedSkills: ValueType<Options[]>) => {
      const skills: string[] = [];
      if (selectedSkills) {
        selectedSkills.forEach((skill: Options) => {
          skills.push(skill.id);
        });
      }
    };

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
              <Focus getSelectedFocus={getSelectedFocus} />
              <Roles getSelectedRoles={getSelectedRoles} />
              <Skills getSelectedSkills={getSelectedSkills} />
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
