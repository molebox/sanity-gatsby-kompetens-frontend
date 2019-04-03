import * as React from 'react';
import * as styles from './CompanyCard.module.scss';
import {Data} from '../utilities';

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

    console.log('matches: ', props.matches);

    const matches = props.matches.map((match) => (
        <div key={match.id}>
            <h4>{match.name}</h4>
        </div>
    ));

    return (
        <div key={props.id} className={styles.card}>
            <div className={styles.container}>
                <div className={styles.mainInfo}>
                    <div className={styles.compInfo}>
                        <h2>{props.companyName}</h2>
                        <h4>{props.contactPerson}</h4>
                        <h4>{props.contactNumber}</h4>
                        <h4>{props.email}</h4>
                        <h4>{props.website}</h4>
                        <h4>{props.recruitmentWebsite}</h4>
                    </div>
                    <div className={styles.matches}>
                        <h2>Matches</h2>
                        {props.matches.map((match) => (
                            <div key={match.id}>
                                <h4>{match.name}</h4>
                            </div>
                        ))}
                    </div>
                </div>
                <div className={styles.biography}>
                    <p>{props.biography}</p>
                </div>
            </div>

            {/* <div className={styles.fadeout}/> */}
        </div>
    );
}
