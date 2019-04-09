import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = (theme: any) => ({
  progress: {
    margin: theme.spacing.unit * 2,
  },
});

function Loader(props: any) {
  const { classes } = props;
  return (
    <div>
      <CircularProgress className={classes.progress} color="primary" />
    </div>
  );
}

export default withStyles(styles)(Loader);
