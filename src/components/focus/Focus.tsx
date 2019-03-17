import * as React from 'react';
import Select, { components } from 'react-select';
import { graphql, useStaticQuery } from 'gatsby';

interface Options {
  value: string;
  label: string;
}

const focusQuery = graphql`
{
    allSanityFocus {
      edges {
        node {
          focus
        }
      }
    }
  }
`;

const controlStyles = {
  borderRadius: '20px',
  padding: '15px',
  background: '#E5E5E5',
  color: '#005056',
  marginTop: '25px',
};

const ControlComponent  = (props: any) => (
  <div style={controlStyles}>
    {<h3>Company Focus</h3>}
    <components.Control  {...props} />
  </div>
);

export default () => {

    const allFocus: any = useStaticQuery(focusQuery);
    const focuses: Options[] = allFocus.allSanityFocus.edges.map(({node}: any) => ({label: node.focus, value: node.focus}));

    return (
        <Select
            options={focuses}
            components={{ Control: ControlComponent }}
            theme={(theme) => ({
              ...theme,
              borderRadius: 0,
              colors: {
              ...theme.colors,
              primary: '#4C3735',
              primary25: '#739FA2',
              primary50: '#99B9BB',
              },
            })}
            isMulti
            isClearable
        />
  );
};
