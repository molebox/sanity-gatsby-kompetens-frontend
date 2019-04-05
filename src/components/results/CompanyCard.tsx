import * as React from 'react';
import * as styles from './CompanyCard.module.scss';
import {Data} from '../utilities';
import { useSpring, animated } from 'react-spring';
import Divider from '@material-ui/core/Divider';

export interface CompanyInfo {
    id: string;
    companyName: string;
    contactPerson: string;
    email: string;
    contactNumber: string;
    website: string;
    recruitmentWebsite: string;
    biography: string;
    matches: Data[];
}

export default function CompanyCard(props: CompanyInfo) {

    const [flipped, setFlip] = React.useState(false);
    const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(1000px) rotateX(${flipped ? 180 : 0}deg)`,
    config: { mass: 10, tension: 500, friction: 80 }
  });

    const filteredWebsite = props.website.replace('http://', '');
    const filteredRecruitment = props.recruitmentWebsite.replace('http://', '');

    return (
    <div className={styles.Card} onClick={() => setFlip((state) => !state)}>
      <animated.div className={[styles.flip, styles.front].join(' ')} style={{opacity: opacity.interpolate((o: any) => 1 - o), transform}}>
        <div className={styles.row}>
          <div className={styles.column}>
            <div className={styles.title}>
              <h2>{props.companyName.toUpperCase()}</h2>
            </div>
          </div>
          <div className={styles.column}>
            <div className={styles.contactInfo}>
              <h5>{props.contactPerson}</h5>
              <h5>{props.contactNumber}</h5>
              <h5>{props.email}</h5>
              <h5>{filteredWebsite}</h5>
              <h5>{filteredRecruitment}</h5>
            </div>
          </div>
        </div>
      </animated.div>
      <animated.div className={[styles.flip, styles.back].join(' ')} style={{ opacity, transform: transform.interpolate((t) => `${t} rotateX(180deg)`) }}>
      <div className={styles.matches}>
        {props.matches.map((match) => (
            <div key={match.id}>
              <h5 className={styles.match}>{match.name}</h5>
            </div>
          ))}
      </div>
      <div className={styles.biography}>
        <h5>{props.biography}</h5>
      </div>
      </animated.div>
    </div>
  );
}
