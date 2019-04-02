import * as React from 'react';
import {useSpring, animated} from 'react-spring';
import { MatchedSelection, CompanyData } from '../utilities';
import CompanyCard from './CompanyCard';
import * as styles from '../../pages/Index.module.scss';

interface Props {
  matches: Array<MatchedSelection<any>>;
}

export default function Search({matches}: Props) {

  const animateIn = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    delay: 1000,
    duration: 2000
    });

  return (
    <animated.div style={animateIn} className={[styles.results, styles.resultsContainer].join(' ')}>
    {matches.map((match: MatchedSelection<any>) => {
        return (
          <animated.div style={animateIn} key={match.company.node.id}>
            <CompanyCard
              id={match.company.node.id}
              companyName={match.company.node.companyName}
              contactPerson={match.company.node.contactPerson}
              email={match.company.node.email}
              contactNumber={match.company.node.contactNumber}
              website={match.company.node.website}
              recruitmentWebsite={match.company.node.recruitmentWebsite}
              biography={match.company.node.biography}
            />
          </animated.div >
        );
      })}
</animated.div>
  )
}
