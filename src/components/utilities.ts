 import * as _ from 'lodash';

 export interface Options {
    id: string;
    value: string;
    label: string;
  }

//  export interface CompanyInfoProps {
//     allSanityCompany: {
//       edges: {
//         node: {
//           id: string;
//           companyName: string,
//           contactPerson: string;
//           contactNumber: string;
//           email: string;
//           website: string;
//           recriutmentWebsite: string;
//           biography: string;
//           focus: {
//             id: string;
//             focus: string;
//           }
//           roles: {
//             id: string;
//             role: string;
//           }
//           skills: {
//             id: string;
//             skillName: string;
//           }
//         }
//       };
//     };
// }

 export interface CompanyData {
    node: {
      id: string;
      companyName: string,
      contactPerson: string;
      contactNumber: string;
      email: string;
      website: string;
      recruitmentWebsite: string;
      biography: string;
      focus: Data[];
      roles: Data[];
      skills: Data[];
    };
  }

 export interface Data {
   id: string;
   name: string;
 }

//  export interface FocusProps extends Base {
//     focus: string;
//   }
//  export interface RolesProps extends Base {
//     role: string;
//   }
//  export interface SkillsProps extends Base {
//     skillName: string;
//   }

 export interface MatchedSelection<T> {
    matches: T[];
    // companyId: string;
    company: CompanyData;
  }

//  export type Matches = FocusProps[] | RolesProps[] | SkillsProps[];

// export type DataTypes = MatchedSelection<Data> | MatchedSelection<RolesProps> | MatchedSelection<SkillsProps>;

  // tslint:disable-next-line: adjacent-overload-signatures
 export function getAllCompaniesFocuses(companyFocus: Data[], selected: Data[]) {
  return companyFocus.filter((compFocus) => {
    return selected.find((selectedFocus) => {
      return compFocus.id === selectedFocus.id;
    });
  });
}
// tslint:disable-next-line: adjacent-overload-signatures
 export function getAllCompaniesSkills(companySkill: Data[], selected: Data[]) {
  return companySkill.filter((compSkill) => {
    return selected.find((selectedSkill) => {
      return compSkill.id === selectedSkill.id;
    });
  });
}
// tslint:disable-next-line: adjacent-overload-signatures
 export function getAllCompaniesRoles(companyRole: Data[], selected: Data[]) {
  return companyRole.filter((compRole) => {
    return selected.find((selectedRole) => {
      return compRole.id === selectedRole.id;
    });
  });
}

 export function createFocusObject(selectedFocus: Options[]) {
  const selectionFocus: Data[] = [];
  selectedFocus.forEach(({ id, value }: Options) => {
    const focus = {
      id,
      name: value
    };
    selectionFocus.push(focus);
  });
  return selectionFocus;
}

 export function createRoleObject(selectedRole: Options[]) {
  const selectionRole: Data[] = [];
  selectedRole.forEach(({ id, value }: Options) => {
    const role = {
      id,
      name: value
    };
    selectionRole.push(role);
  });
  return selectionRole;
}

 export function createSkillObject(selectedSkill: Options[]) {
  const selectionSkill: Data[] = [];
  selectedSkill.forEach(({ id, value }: Options) => {
    const skill = {
      id,
      name: value
    };
    selectionSkill.push(skill);
  });
  return selectionSkill;
}

//  export function groupBy(objectArray: any, property: any) {
//   return objectArray.reduce( (acc: any, obj: any) => {
//     const key = obj[property];
//     if (!acc[key]) {
//       acc[key] = [];
//     }
//     acc[key].push(obj);
//     return acc;
//   }, []);
// }

//  export const getFocusHits = (selectedFocus?: Array<MatchedSelection<FocusProps>>) => selectedFocus ? selectedFocus.filter((focus) => focus.hits) : undefined;

//  export const getSkillsHits = (selectedSkill?: Array<MatchedSelection<SkillsProps>>) => selectedSkill ? selectedSkill.filter((skill) => skill.hits) : undefined;

//  export const getRoleHits = (selectedRole?: Array<MatchedSelection<RolesProps>>) => selectedRole ? selectedRole.filter((role) => role.hits) : undefined;

// tslint:disable-next-line: adjacent-overload-signatures
 export function getAllCompaniesDetails<T extends Data>(companyDetail: T[], selected: T[]) {
  return companyDetail.filter((comp) => {
    return selected.find((selectedOption) => {
      return comp.id === selectedOption.id;
    });
  });
}

//  export function sortByHits<T>(selected?: Array<MatchedSelection<T>>) {
//     return selected ? selected.sort((a, b) => (a.hits < b.hits ? 1 : -1)) : undefined;
//  }

// function getRoles(companies: CompanyData[], roleId: string) {
//   const company = findCompanyById(companies, roleId);
//   return (company && company.node.roles) || [];
// }

// function getSkills(companies: CompanyData[], skillId: string) {
//   const company = findCompanyById(companies, skillId);
//   return (company && company.node.skills) || [];
// }

// function getCompanyFocus(companies: CompanyData[], focusId: string) {
//   const company = findCompanyById(companies, focusId);
//   console.log(company);
//   return (company && company.node.focus) || [];
// }

// function match(companies: CompanyData[], focusId: string) {
//   const items = companies.filter((item) => item.node.focus.indexOf(focusId as string) !== -1);
//   return items;
// }

    // const focuses = companies.reduce((total: Focus[], amount: CompanyData) => {
    //   amount.node.focus.forEach((focus: Focus) => {
    //       total.push(focus);
    //   });
    //   return total;
    // }, []);

    // const skills = companies.reduce((total: Skills[], amount: CompanyData) => {
    //   amount.node.skills.forEach((skill: Skills) => {
    //       total.push(skill);
    //   });
    //   return total;
    // }, []);

    // const roles = companies.reduce((total: Roles[], amount: CompanyData) => {
    //   amount.node.roles.forEach((role: Roles) => {
    //       total.push(role);
    //   });
    //   return total;
    // }, []);
