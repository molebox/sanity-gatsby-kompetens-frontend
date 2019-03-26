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
import { createSkillObject, Options, CompanyData, FocusProps, SkillsProps, RolesProps, createFocusObject, getAllCompaniesFocuses, createRoleObject, getAllCompaniesRoles, getAllCompaniesSkills, search, MatchedSelection } from '../components/utilities';
import { ValueType } from 'react-select/lib/types';

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

const findCompanyFocusById = (companies: CompanyData[], id: string) => companies.find((company: CompanyData) => company.node.focus.some((focus) => focus.id === id));

function findFocus(companies: CompanyData[], focusId: string) {
  return companies.find(({node}: CompanyData) =>
  node.focus.some((focus) => focus.id === focusId)
  );
}

export default function IndexPage() {

    const [matchedComps, setMatchedComps] = React.useState<CompanyData[]>([]);
    const [isSelectedMade, setIsSelectedMade] = React.useState(false);
    const [matchedFocus, setMatchedFocus] = React.useState({});

    const companyInfo: any = useStaticQuery(indexPageQuery);
    const companies: CompanyData[] = companyInfo.allSanityCompany.edges;

    const allCompanyFocuses = companies.map((company: CompanyData) => {
      return {id: company.node.id, focus: company.node.focus};
    });

    const allCompanySkills = companies.map((company: CompanyData) => {
      return {id: company.node.id, skills: company.node.skills};
    });

    const allCompanyRoles = companies.map((company: CompanyData) => {
      return {id: company.node.id, roles: company.node.roles};
    });

    // const {name} = props.data.site.siteMetadata;
    const animateIn = useSpring({
      opacity: 1,
      from: { opacity: 0 },
      delay: 1000,
      duration: 2000
      });

    const getSelectedFocus = (selectedFocus: Options[]) => {
      console.log('THE SELECTED FOCUS: ', selectedFocus);

      const selected = createFocusObject(selectedFocus);
      const matchedFocuses: Array<MatchedSelection<FocusProps>> = allCompanyFocuses.map((comp) => {
      const found = getAllCompaniesFocuses(comp.focus, selected);
      return {matches: found, companyId: comp.id, hits: found.length};
    });

      const test = search(companies, matchedFocuses);
      console.log('focus search result: ', test);

      console.log('matchedFocuses: ', matchedFocuses);
    };

    const getSelectedRoles = (selectedRoles: Options[]) => {
      console.log('THE SELECTED ROLES: ', selectedRoles);

      const selected = createRoleObject(selectedRoles);
      const matchedRoles: Array<MatchedSelection<RolesProps>> = allCompanyRoles.map((comp) => {
      const found = getAllCompaniesRoles(comp.roles, selected);
      return {matches: found, companyId: comp.id, hits: found.length};
    });

      const test = search(companies, matchedRoles);
      console.log('roles search result: ', test);

      console.log('matchedRoles: ', matchedRoles);
    };

    const getSelectedSkills = (selectedSkills: Options[]) => {
      console.log('THE SELECTED SKILLS: ', selectedSkills);

      const selected = createSkillObject(selectedSkills);
      const matchedSkills = allCompanySkills.map((comp) => {
      const found = getAllCompaniesSkills(comp.skills, selected);
      return {matches: found, companyId: comp.id, hits: found.length};
    });

      const test = search(companies, matchedSkills);
      console.log('skills search result: ', test);

      console.log('matchedSkills: ', matchedSkills);
    };

    return (
      <MuiThemeProvider theme={theme}>
        <div >
          {/* <div className={styles.showcase}>
          <Background>
            <h1>TEST</h1>
          </Background>
          </div> */}
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
                      })}
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
