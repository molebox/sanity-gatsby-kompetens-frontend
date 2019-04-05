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
      recriutmentWebsite: string;
      biography: string;
      focus: FocusProps[];
      roles: RolesProps[];
      skills: SkillsProps[];
    };
  }

 export interface Data {
   id: string;
   name: string;
 }

 export interface FocusProps {
    id: string;
    focus: string;
  }
 export interface RolesProps {
    id: string;
    role: string;
  }
 export interface SkillsProps {
    id: string;
    skillName: string;
  }

 export interface MatchedSelection<T> {
    matches: T[];
    // companyId: string;
    company: CompanyData;
  }

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

 export function createObject(selectedFocus: Options[]) {
  const selectionFocus: Data[] = [];
  selectedFocus.forEach(({ id, value }: Options) => {
    const item = {
      id,
      name: value
    };
    selectionFocus.push(item);
  });
  return selectionFocus;
}

 export function createFocusObject(selectedFocus: FocusProps[]) {
  const selectionFocus: Data[] = [];
  selectedFocus.forEach(({ id, focus }: FocusProps) => {
    const item = {
      id,
      name: focus
    };
    selectionFocus.push(item);
  });
  return selectionFocus;
}

 export function createRoleObject(selectedRole: RolesProps[]) {
  const selectionRole: Data[] = [];
  selectedRole.forEach(({ id, role }: RolesProps) => {
    const item = {
      id,
      name: role
    };
    selectionRole.push(item);
  });
  return selectionRole;
}

 export function createSkillObject(selectedSkill: SkillsProps[]) {
  const selectionSkill: Data[] = [];
  selectedSkill.forEach(({ id, skillName }: SkillsProps) => {
    const skill = {
      id,
      name: skillName
    };
    selectionSkill.push(skill);
  });
  return selectionSkill;
}

 export const sortByMatches = (matches: Array<MatchedSelection<Data>>): Array<MatchedSelection<Data>> => matches.sort((a, b) => (a.matches < b.matches ? 1 : -1));