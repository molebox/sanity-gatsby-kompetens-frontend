import { graphql, useStaticQuery } from 'gatsby';
import * as React from 'react';
import * as styles from './Index.module.scss';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Skills from '../components/skills/Skills';
import Roles from '../components/roles/Roles';
import Industry from '../components/industry/Industry';
import Focus from '../components/focus/Focus';
import PlaceHolder from '../components/results/Placeholder';

import * as _ from 'lodash';
import { createSkillObject, Options, CompanyData, FocusProps, SkillsProps, RolesProps, createFocusObject, getAllCompaniesFocuses, createRoleObject, getAllCompaniesRoles, getAllCompaniesSkills, MatchedSelection, groupBy, DataTypes } from '../components/utilities';
import Button from '@material-ui/core/Button';
import Search from '../components/results/Search';

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
  typography: {
    useNextVariants: true,
  },
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

    const [matchedComps, setMatchedComps] = React.useState<Array<MatchedSelection<any>>>([]);
    const [focusHits, setFocusHits] = React.useState<Array<MatchedSelection<FocusProps>>>([]);
    const [rolesHits, setRolesHits] = React.useState<Array<MatchedSelection<RolesProps>>>([]);
    const [skillsHits, setSkillsHits] = React.useState<Array<MatchedSelection<SkillsProps>>>([]);

    const companyInfo: any = useStaticQuery(indexPageQuery);
    const companies: CompanyData[] = companyInfo.allSanityCompany.edges;

    const allCompanyFocuses = companies.map((company: CompanyData) => {
      return {id: company.node.id, focus: company.node.focus, company};
    });

    const allCompanySkills = companies.map((company: CompanyData) => {
      return {id: company.node.id, skills: company.node.skills, company};
    });

    const allCompanyRoles = companies.map((company: CompanyData) => {
      return {id: company.node.id, roles: company.node.roles, company};
    });

    const getSelectedFocus = (selectedFocus: Options[]) => {
      setFocusHits([]);

      const selected = createFocusObject(selectedFocus);
      const matchedFocuses: Array<MatchedSelection<FocusProps>> = allCompanyFocuses.map((comp) => {
      const found = getAllCompaniesFocuses(comp.focus, selected);
      return {matches: found, company: comp.company};
    });

      setFocusHits(matchedFocuses);
    };

    const getSelectedRoles = (selectedRoles: Options[]) => {
      setRolesHits([]);

      const selected = createRoleObject(selectedRoles);
      const matchedRoles: Array<MatchedSelection<RolesProps>> = allCompanyRoles.map((comp) => {
      const found = getAllCompaniesRoles(comp.roles, selected);
      return {matches: found, company: comp.company};
    });

      setRolesHits(matchedRoles);
    };

    const getSelectedSkills = (selectedSkills: Options[]) => {
      setSkillsHits([]);

      const selected = createSkillObject(selectedSkills);
      const matchedSkills = allCompanySkills.map((comp) => {
      const found = getAllCompaniesSkills(comp.skills, selected);
      return {matches: found, company: comp.company};
    });

      setSkillsHits(matchedSkills);
    };

    const handleSearch = () => {

      const searchData = [...focusHits, ...rolesHits, ...skillsHits];

      focusHits && focusHits.forEach((result) => {
        if (result.matches && result.matches.length === 0) {
          _.pull(searchData, result);
        }
      });

      rolesHits && rolesHits.forEach((result) => {
        if (result.matches && result.matches.length === 0) {
          _.pull(searchData, result);
        }
      });

      skillsHits && skillsHits.forEach((result) => {
        if (result.matches && result.matches.length === 0) {
          _.pull(searchData, result);
        }
      });

      const sortedMatches = searchData.reduce((accumulator: any[], currentValue: DataTypes) => {
        // tslint:disable-next-line:one-variable-per-declaration
        const compId = currentValue.company.node.id;
        const found: any | undefined = accumulator.find((elem: DataTypes) => {
              return elem.company.node.id === compId;
          });
        if (found && found.matches) {
          found.matches = [...found.matches, ...currentValue.matches];
        } else {
          accumulator.push(currentValue);
          }
        return accumulator;
          }, []);

      sortedMatches.forEach((match: any) => {
        match.matches = _.uniq(match.matches);
      });

      setMatchedComps(sortedMatches);
      console.log({sortedMatches});

    };

    return (
      <MuiThemeProvider theme={theme}>
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
                  <Button variant="contained" onClick={handleSearch}>Search Test</Button>
                </div>
                {matchedComps.length > 0 ? (
                  <Search matches={matchedComps}/>
                ) : (
                  <div className={styles.results}>
                    <PlaceHolder />
                  </div>
                )}
                <div className={styles.footer}/>
              </div>
            </div>
      </MuiThemeProvider>
    );
}
