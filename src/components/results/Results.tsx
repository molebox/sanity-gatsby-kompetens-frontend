import * as React from 'react';
import {useSpring, animated} from 'react-spring';
import {MatchedSelection, Data} from '../utilities';
import CompanyCard from './CompanyCard';
import * as styles from '../../pages/Search.module.scss';

interface Props {
  matches: Array<MatchedSelection<Data>>;
}

export default function Results({matches}: Props) {

  const animateIn = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    delay: 1000,
    duration: 2000
    });

  return (
    <div className={[styles.results, styles.resultsContainer].join(' ')}>
      <animated.div style={animateIn}>
          {matches.map((match: MatchedSelection<Data>) => {
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
                    matches={match.matches}
                  />
                </animated.div >
              );
            })}
          </animated.div>
    </div>
  );
}
