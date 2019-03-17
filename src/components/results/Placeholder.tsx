import * as React from 'react';
import * as styles from './PlaceHolder.module.scss';

interface Props {
    isVisible: boolean;
}

export default function PlaceHolder({isVisible}: Props) {

    return isVisible ? (
        <div className={styles.outerContainer}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2>Which companies match your skills?</h2>
                </div>
                <div className={styles.content}>
                    <h3>Finding the right company to work for can be a hard task. Its even harder trying to second guess if you are a good match for a prospective employer.</h3>
                    <h3>Begin by thinking about the things that <em>you</em> are good at, and then find the right company that matches <em>your</em> skillsets.</h3>
                </div>
            </div>
        </div>
    ) : null;
}
