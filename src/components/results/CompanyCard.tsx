import * as React from 'react';
import * as styles from './CompanyCard.module.scss';
import {Data} from '../utilities';
// import { useSpring, animated } from 'react-spring';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Typography } from '@material-ui/core';
// import { withStyles } from '@material-ui/core/styles';

// const CustomExpansionPanel = withStyles({
//   root: {
//     width: '80%',
//     border: 'none',
//     borderRadius: '7px 27px 7px 27px',
//     boxShadow: 'none',
//     '&:not(:last-child)': {
//       borderBottom: 0,
//     },
//     '&:before': {
//       display: 'none',
//     },
//   },
//   expanded: {
//     margin: 'auto',
//   },
// })(ExpansionPanel);

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

  const [anchorEl, setAnchorEl] = React.useState(null);

  const filteredWebsite = props.website.replace('http://', '');
  const filteredRecruitment = props.recruitmentWebsite.replace('http://', '');
  const handleClick = (event: any) => {
      setAnchorEl(event.currentTarget);
    };

  const handleClose = () => {
      setAnchorEl(null);
    };

  const open = Boolean(anchorEl);
  const ITEM_HEIGHT = 48;

  return (
    <div className={styles.Card}>
      <div className={[styles.front, styles.container].join(' ')}>

        <div className={styles.top}>
          <IconButton
            aria-label="Matches"
            aria-owns={open ? 'matches-menu' : undefined}
            aria-haspopup="true"
            onClick={handleClick}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="matches-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            PaperProps={{
              style: {
                maxHeight: ITEM_HEIGHT * 4.5,
                width: 250,
              },
            }}
          >
          <div style={{justifyContent: 'center', display: 'flex', outline: 'none'}}>
            <h6>MATCHES</h6>
          </div>
            {props.matches.map((match) => (
              <MenuItem key={match.id} onClick={handleClose}>
                {match.name}
              </MenuItem>
            ))}
          </Menu>
          <Divider/>
        </div>

          <div className={styles.middle}>
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
          </div>

          {/* <div className={styles.bottom}>
          <CustomExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <div style={{justifyContent: 'center', display: 'flex', outline: 'none'}}>
                <h5>About {props.companyName}</h5>
              </div>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography>
              <h5>{props.biography}</h5>
              </Typography>
            </ExpansionPanelDetails>
          </CustomExpansionPanel>
          </div> */}

          {/* <div className={styles.bottom}>
            <div className={styles.biography}>
              <h5>{props.biography}</h5>
            </div>
          </div> */}

      </div>
    </div>
  );
}
