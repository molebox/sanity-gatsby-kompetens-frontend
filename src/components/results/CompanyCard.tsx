import * as React from 'react';
import * as styles from './CompanyCard.module.scss';

export interface CompanyInfo {
    id: string;
    companyName: string;
    contactPerson: string;
    email: string;
    contactNumber: string;
    website: string;
    recruitmentWebsite: string;
    biography: string;
}

export default function CompanyCard(props: CompanyInfo) {

    return (
        <div key={props.id} className={styles.card}>
            <h2>{props.companyName}</h2>
            <h3>{props.contactPerson}</h3>
            <h4>{props.contactNumber}</h4>
            <h4>{props.email}</h4>
            <h4>{props.website}</h4>
            <h4>{props.recruitmentWebsite}</h4>
            <p>{props.biography}</p>
        </div>
    );
}
