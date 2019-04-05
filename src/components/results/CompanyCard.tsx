import * as React from 'react';
import * as styles from './CompanyCard.module.scss';
import {Data} from '../utilities';
import { useSpring, animated } from 'react-spring';

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
    return (
    <div className={styles.Card} onClick={() => setFlip((state) => !state)}>
      <animated.div className={[styles.flip, styles.front].join(' ')} style={{opacity: opacity.interpolate((o: any) => 1 - o), transform}}>
        <div className={styles.title}>
            <h1>{props.companyName.toUpperCase()}</h1>
        </div>
        <div className={styles.contactInfo}>
            <h5>{props.contactPerson}</h5>
            <h5>{props.contactNumber}</h5>
            <h5>{props.email}</h5>
            <h5>{props.website}</h5>
            <h5>{props.recruitmentWebsite}</h5>
        </div>
        {/* <h5>VIEW MORE</h5> */}
      </animated.div>
      <animated.div className={[styles.flip, styles.back].join(' ')} style={{ opacity, transform: transform.interpolate((t) => `${t} rotateX(180deg)`) }}>
        <h5>{props.biography}</h5>
      </animated.div>
    </div>
  );
}
