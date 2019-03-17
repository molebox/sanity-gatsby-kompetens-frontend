import * as React from 'react';
// import * as styles from './Index.module.scss';

import Select, { components } from 'react-select';

const controlStyles = {
    borderRadius: '1px solid black',
    padding: '5px',
    background: '#c9d8c5',
    color: 'black',
    marginTop: '25px'
  };

const ControlComponent = (props: any) => (
    <div style={controlStyles}>
      {<p>Custom Control</p>}
      <components.Control {...props} />
    </div>
  );

// const groupStyles = {
//     border: `2px dotted #a8b6bf`,
//     borderRadius: '5px',
//     background: '#f2fcff'
//   };

// const Group = (props: any) => (
//     <div style={groupStyles}>
//       <components.Group {...props}/>
//     </div>
//   );
const skillOptions = [
    { value: 'vanilla', label: 'Vanilla', rating: 'safe' },
    { value: 'chocolate', label: 'Chocolate', rating: 'good' },
    { value: 'strawberry', label: 'Strawberry', rating: 'wild' },
    { value: 'salted-caramel', label: 'Salted Caramel', rating: 'crazy' },
  ];
const roleOptions = [
    { value: 'vanilla', label: 'Vanilla', rating: 'safe' },
    { value: 'chocolate', label: 'Chocolate', rating: 'good' },
    { value: 'strawberry', label: 'Strawberry', rating: 'wild' },
    { value: 'salted-caramel', label: 'Salted Caramel', rating: 'crazy' },
  ];

const groupedOptions = [
    {
      label: 'Roles',
      options: roleOptions,
    },
    {
      label: 'Skills',
      options: skillOptions,
    },
  ];

export default () => (
    <Select
      defaultValue={skillOptions[0]}
      options={groupedOptions}
      components={{ Control: ControlComponent }}
      isMulti
    />
  );
