import * as React from 'react';
import * as styles from './CompanyCard.module.scss';
import { MatchedSelection, DataTypes, Matches } from '../utilities';

export interface CompanyInfo {
    id: string;
    companyName: string;
    contactPerson: string;
    email: string;
    contactNumber: string;
    website: string;
    recruitmentWebsite: string;
    biography: string;
    matches: Matches[];
}

export default function CompanyCard(props: CompanyInfo) {

    return (
        <div key={props.id} className={styles.card}>
            <div className={styles.container}>
                <div className={styles.infoAndMatches}>
                    <h2>{props.companyName}</h2>
                    <h3>{props.contactPerson}</h3>
                    <h4>{props.contactNumber}</h4>
                    <h4>{props.email}</h4>
                    <h4>{props.website}</h4>
                    <h4>{props.recruitmentWebsite}</h4>
                {props.matches.map((match) => {
                    return <h4>{match}</h4>
                })}
                </div>
                <div className={styles.biography}>
                    <p>{props.biography}</p>
                </div>
            </div>

            {/* <div className={styles.fadeout}/> */}
        </div>
    );
}
