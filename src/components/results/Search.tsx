import * as React from 'react';
import {graphql, useStaticQuery} from 'gatsby';

interface Focus {
    focus: string;
}
interface Roles {
    role: string;
}
interface Skills {
    skillName: string;
}

interface SearchProps {
    selectedRoles: Roles[];
    selectedFocuses: Focus[];
    selectedSkills: Skills[];
}

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
      };
  }

export const companyQuery = graphql`
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

export default function Search() {

    const companyInfo: CompanyInfoProps = useStaticQuery(companyQuery);

  return (
    <div>
      Hi
    </div>
  )
}
