import { graphql, useStaticQuery } from 'gatsby';
import * as React from 'react';
import * as styles from './Search.module.scss';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Skills from '../components/skills/Skills';
import Roles from '../components/roles/Roles';
import Industry from '../components/industry/Industry';
import Focus from '../components/focus/Focus';
import PlaceHolder from '../components/results/Placeholder';

import * as _ from 'lodash';
import { createSkillObject, Options, CompanyData, createFocusObject, getAllCompaniesFocuses, createRoleObject, getAllCompaniesRoles, getAllCompaniesSkills, MatchedSelection, Data, createObject, sortByMatches} from '../components/utilities';
import Button from '@material-ui/core/Button';
import Results from '../components/results/Results';

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

export default function Search() {

    const [matchedComps, setMatchedComps] = React.useState<Array<MatchedSelection<Data>>>([]);
    const [focusHits, setFocusHits] = React.useState<Array<MatchedSelection<Data>>>([]);
    const [rolesHits, setRolesHits] = React.useState<Array<MatchedSelection<Data>>>([]);
    const [skillsHits, setSkillsHits] = React.useState<Array<MatchedSelection<Data>>>([]);
    const [loading, setLoading] = React.useState(false);

    const companyInfo: any = useStaticQuery(indexPageQuery);
    const companies: CompanyData[] = companyInfo.allSanityCompany.edges;

    const allCompanyFocuses = companies.map((company: CompanyData) => {
      const focuses = createFocusObject(company.node.focus);
      return {id: company.node.id, name: focuses, company};
    });

    const allCompanySkills = companies.map((company: CompanyData) => {
      const skills = createSkillObject(company.node.skills);
      return {id: company.node.id, name: skills, company};
    });

    const allCompanyRoles = companies.map((company: CompanyData) => {
      const roles = createRoleObject(company.node.roles);
      return {id: company.node.id, name: roles, company};
    });

    const getSelectedFocus = (selectedFocus: Options[]) => {
      setFocusHits([]);

      const selected = createObject(selectedFocus);
      const matchedFocuses: Array<MatchedSelection<Data>> = allCompanyFocuses.map((comp) => {
      const found = getAllCompaniesFocuses(comp.name, selected);
      return {matches: found, company: comp.company};
    });

      setFocusHits(matchedFocuses);
    };

    const getSelectedRoles = (selectedRoles: Options[]) => {
      setRolesHits([]);

      const selected = createObject(selectedRoles);
      const matchedRoles: Array<MatchedSelection<Data>> = allCompanyRoles.map((comp) => {
      const found = getAllCompaniesRoles(comp.name, selected);
      return {matches: found, company: comp.company};
    });

      setRolesHits(matchedRoles);
    };

    const getSelectedSkills = (selectedSkills: Options[]) => {
      setSkillsHits([]);

      const selected = createObject(selectedSkills);
      const matchedSkills: Array<MatchedSelection<Data>> = allCompanySkills.map((comp) => {
      const found = getAllCompaniesSkills(comp.name, selected);
      return {matches: found, company: comp.company};
    });

      setSkillsHits(matchedSkills);
    };

    const handleSearch = () => {
      setLoading(true);
      setMatchedComps([]);

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

      const sortedMatches = searchData.reduce((accumulator: any[], currentValue: MatchedSelection<Data>) => {
        // tslint:disable-next-line:one-variable-per-declaration
        const compId = currentValue.company.node.id;
        const found: any | undefined = accumulator.find((elem: MatchedSelection<Data>) => {
              return elem.company.node.id === compId;
          });
        if (found && found.matches) {
          found.matches = [...found.matches, ...currentValue.matches];
        } else {
          accumulator.push(currentValue);
          }
        return accumulator;
          }, []);

      const unique = sortedMatches.map((match: MatchedSelection<Data>) => ({
        ...match,
        ...match.matches,
        matches: match.matches = _.uniqBy(match.matches, 'id')
      }));

      setMatchedComps(sortByMatches(unique));
      setLoading(false);
    };

    return (
      <MuiThemeProvider theme={theme}>
            <div className={styles.container}>
              <div className={styles.header}/>
              <div className={styles.main}>
                <div className={[styles.industry, styles.card].join(' ')}>
                  <Industry/>
                </div>
                <div className={[styles.selections, styles.selectionContainer].join(' ')}>
                  <Focus getSelectedFocus={getSelectedFocus} />
                  <Roles getSelectedRoles={getSelectedRoles} />
                  <Skills getSelectedSkills={getSelectedSkills} />
                  <div className={styles.searchBtn}>
                    <Button variant="contained" color="primary" onClick={handleSearch}>Search</Button>
                  </div>
                </div>
                {matchedComps.length > 0 ? (
                    <Results matches={matchedComps}/>
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
