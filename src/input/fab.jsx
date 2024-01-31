import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ButtonBase from '@material-ui/core/ButtonBase';
import { withStyles } from '@material-ui/core/styles';
import { capitalize } from '@/utils';

import Typography from '@/basics/typography';

const side = 44;
const border = 6;
const textMargin = 8;

const styles = theme => ({
  // Used to modify other classes.
  text: {},
  focusVisible: {},

  root: {
    padding: [[0, border]],
    height: side + border * 2,
    color: theme.palette.text.secondary,

    '&:hover, &$focusVisible': {
      color: theme.palette.text.primary,
    },

    '&:disabled': {
      opacity: 0.6,
    },
  },
  iconAlignLeft: {
    '& $text': {
      textAlign: 'left',
      marginLeft: textMargin,
    },
  },
  iconAlignRight: {
    flexDirection: 'row-reverse',

    '& $text': {
      textAlign: 'right',
      marginRight: textMargin,
    },
  },
  iconContainer: {
    minWidth: side,
    minHeight: side,
    display: 'flex',
    borderRadius: '50%',
    alignItems: 'center',
    margin: [[0, border]],
    justifyContent: 'center',
    color: theme.palette.common.white,
    boxShadow: theme.customShadows.fab,
    background: '#3752A9',

    '$root:hover &, $root$focusVisible &': {
      boxShadow: theme.customShadows.fabHover,
      background: theme.palette.blue.checkboxCheck,
    },

    '$root$focusVisible &': {
      margin: 0,
      boxShadow: 'none',
      border: [[2, 'solid', '#FFFFFF']],
      outline: [[2, 'solid', '#2A4283']],
      backgroundColor: '#2A4283',
    },
  },
  icon: {
    fontSize: 30,
  },
});

class Fab extends React.PureComponent {
  static propTypes = {
    icon: PropTypes.elementType.isRequired,
    label: PropTypes.string.isRequired,

    /** @ignore */
    classes: PropTypes.shape({}).isRequired,
    size: PropTypes.oneOf(['small', 'large']),
    iconAlign: PropTypes.oneOf(['left', 'right']),
  };

  static defaultProps = {
    size: 'large',
    iconAlign: 'left',
  };

  render() {
    const { size, label, classes, iconAlign, icon: Icon, ...rest } = this.props;

    const { className: externalClassName, ...buttonProps } = rest;

    const className = classNames(
      classes.root,
      externalClassName,
      classes[`iconAlign${capitalize(iconAlign)}`],
    );

    const textVariant = size === 'small' ? 'medium' : 'intro';

    return (
      <ButtonBase
        className={className}
        focusVisibleClassName={classes.focusVisible}
        {...buttonProps}
      >
        <span className={classes.iconContainer}>
          <Icon className={classes.icon} />
        </span>

        <Typography color="inherit" variant={textVariant} className={classes.text}>
          <strong>{label}</strong>
        </Typography>
      </ButtonBase>
    );
  }
}

export default withStyles(styles)(Fab);
