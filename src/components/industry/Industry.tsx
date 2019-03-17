import * as React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

const {useState} = React;

interface Options {
  value: string;
  label: string;
}

const styles = (theme: any) => ({
    root: {
        display: 'flex',

    },
    formControl: {
        margin: theme.spacing.unit * 3,
        fontWeight: 'bold'
    },
    group: {
        margin: `${theme.spacing.unit}px 0`,
        fontWeight: 'bold'
    },
  });

const industryQuery = graphql`
{
  allSanityIndustry {
    edges {
      node {
        industry
      }
    }
  }
}

`;

const Industry = (classes: any) => {

    const allIndustries: any = useStaticQuery(industryQuery);
    const industries: Options[] = allIndustries.allSanityIndustry.edges.map(({node}: any) => ({label: node.industry, value: node.industry}));
    const [industry, setIndustry] = useState(industries[0].value);

    const handleChange = (event: React.ChangeEvent<{}>) => {
        setIndustry(event.target.value);
      };

    return (
        <div className={classes.root}>
            <FormControl component="fieldset" className={classes.formControl}>
                <h3 style={{color: '#005056'}}>Industry</h3>
                <RadioGroup
                    aria-label="Industry"
                    name="industryRadioButtons"
                    className={classes.group}
                    value={industry}
                    onChange={handleChange}
                    row
                >
                    {industries.map((item: any, index: number) => {
                        return (
                            <FormControlLabel
                                key={index}
                                value={item.value}
                                control={<Radio color="primary"/>}
                                label={item.label}
                            />
                        );
                    })}
                </RadioGroup>
            </FormControl>
        </div>
  );
};

export default withStyles(styles)(Industry);
