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
import Background from '../components/Background';

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

interface CompanyData {
  node: {
    id: string;
    companyName: string,
    contactPerson: string;
    contactNumber: string;
    email: string;
    website: string;
    recruitmentWebsite: string;
    biography: string;
    focus: Focus[];
    roles: Roles[];
    skills: Skills[];
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

// function MatchedFocus(selectedFocuses: string[], companyData: companyData[]) {
//   const matchedFocuses: Focus[] = [];

//   const findFocusById = _.keyBy(companyFocuses, 'id');

//   selectedFocuses.forEach((focus: any) => {
//     const match = findFocusById[focus.id];
//     matchedFocuses.push(match);
//   });
//   return matchedFocuses;
// }

const findCompanyById = (companies: CompanyData[], companyName: string) => companies.find((company: CompanyData) => company.companyName === companyName);

function getRoles(companies: CompanyData[], roleId: string) {
  const company = findCompanyById(companies, roleId);
  return (company && company.node.roles) || [];
}

function getSkills(companies: CompanyData[], skillId: string) {
  const company = findCompanyById(companies, skillId);
  return (company && company.node.skills) || [];
}

function getFocus(companies: CompanyData[], companyName: string) {
  const company = findCompanyById(companies, companyName);
  console.log(company);
  return (company && company.node.focus) || [];
}

function findFocus(companies: CompanyData[], focusId: string) {
  return companies.find(({node}: CompanyData) =>
  node.focus.some((focus) => focus.id === focusId)
  );
}

function getAllCompaniesFocuses(companies: CompanyData[]) {
  return _.map(companies, _.property('node.focus'));
}

function searchFocuses(compFocuses: Focus[], selectedFocuses: Focus[]) {
  console.log('searchFocuses: ', compFocuses.filter((focus) => !selectedFocuses.includes(focus)));
  return compFocuses.filter((focus) => !selectedFocuses.includes(focus));
}

function searchSkills(compSkills: Skills[], selectedSkills: Options[]) {
  console.log('searchSkills: ', compSkills.filter((skill) => !selectedSkills.includes(skill)));
  return compSkills.filter((skill) => !selectedSkills.includes(skill));
}

function searchRoles(compRoles: Roles[], selectedRoles: Options[]) {
  console.log('searchRoles: ', compRoles.filter((role) => !selectedRoles.includes(role)));
  return compRoles.filter((role) => !selectedRoles.includes(role));
}

function createFocusObject(selectedFocus: Options[]) {
  const selectionFocus: Focus[] = [];
  selectedFocus.forEach(({ id, value }: Options) => {
    const focus = {
      id,
      focus: value
    };
    selectionFocus.push(focus);
  });
  return selectionFocus;
}

export default function IndexPage() {

    const [matchedComps, setMatchedComps] = React.useState<CompanyData[]>([]);
    const [isSelectedMade, setIsSelectedMade] = React.useState(false);
    const companyInfo: any = useStaticQuery(indexPageQuery);
    const companies: CompanyData[] = companyInfo.allSanityCompany.edges;

    const focuses = companies.reduce((total: Focus[], amount: CompanyData) => {
      amount.node.focus.forEach((focus: Focus) => {
          total.push(focus);
      });
      return total;
    }, []);

    const skills = companies.reduce((total: Skills[], amount: CompanyData) => {
      amount.node.skills.forEach((skill: Skills) => {
          total.push(skill);
      });
      return total;
    }, []);

    const roles = companies.reduce((total: Roles[], amount: CompanyData) => {
      amount.node.roles.forEach((role: Roles) => {
          total.push(role);
      });
      return total;
    }, []);

    // const {name} = props.data.site.siteMetadata;
    const animateIn = useSpring({
      opacity: 1,
      from: { opacity: 0 },
      delay: 1000,
      duration: 2000
      });

    const getSelectedFocus = (selectedFocus: Options[]) => {
      setIsSelectedMade(true);

      const allFocus: any[] = _.flattenDeep(getAllCompaniesFocuses(companies));
      console.log('focuses: ', allFocus);

      const selectionFocus: Focus[] = createFocusObject(selectedFocus);

      const focusResult = searchFocuses(focuses, selectionFocus);
      console.log('focusResult: ', focusResult);

      const matches: any[] = [];
      if (selectedFocus) {
        selectedFocus.forEach(({id}: Options) => {
          focuses.forEach((focus: Focus) => {
            if (id === focus.id) {
              const matchedFocus = findFocus(companies, id);
              matches.push(matchedFocus);
              setMatchedComps([...matches]);
            }
          });
        });
      }
      console.log({matchedComps});
    };
    const getSelectedRoles = (selectedRoles: ValueType<Options[]>) => {
      setIsSelectedMade(true);
      const roles: string[] = [];
      if (selectedRoles) {
        selectedRoles.forEach((role: Options) => {
          roles.push(role.id);
        });
      }
    };
    const getSelectedSkills = (selectedSkills: ValueType<Options[]>) => {
      setIsSelectedMade(true);
      const skills: string[] = [];
      if (selectedSkills) {
        selectedSkills.forEach((skill: Options) => {
          skills.push(skill.id);
        });
      }
    };

    return (
      <MuiThemeProvider theme={theme}>
        <div className={styles.outerContainer}>
          <div className={styles.showcase}>
          <Background>
            <h1>TEST</h1>
          </Background>
          </div>
            <div className={styles.container}>
              <div className={styles.header}>
                <h1>A title could go here...</h1>
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
                {isSelectedMade ? (
                  <animated.div style={animateIn} className={[styles.results, styles.resultsContainer].join(' ')}>
                    {companyInfo.allSanityCompany.edges.map(({node}: CompanyData) => {
                        return (
                          <animated.div style={animateIn} key={node.id}>
                            <CompanyCard
                              id={node.id}
                              companyName={node.companyName}
                              contactPerson={node.contactPerson}
                              email={node.email}
                              contactNumber={node.contactNumber}
                              website={node.website}
                              recruitmentWebsite={node.recruitmentWebsite}
                              biography={node.biography}
                            />
                          </animated.div >
                        );
                      })
                  }
                </animated.div>
                ) : (
                  <div className={styles.results}>
                    <PlaceHolder />
                  </div>
                )}

                <div className={styles.footer}/>
              </div>
            </div>
        </div>
      </MuiThemeProvider>
    );
}
