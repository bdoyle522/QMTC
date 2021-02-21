import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './Button.module.css';

const PRIMARY = 'primary';
const SECONDARY = 'secondary';

export const Button = ({ label, onClick, buttonType, leftIcon, className }) => (
  <button
    className={cn(className, styles.button, {
      [styles.primary]: buttonType === PRIMARY,
      [styles.secondary]: buttonType === SECONDARY,
    })}
    type="button"
    onClick={onClick}
    tabIndex={0}
  >
    {!!leftIcon && <FontAwesomeIcon icon={leftIcon} />}
    {label}
  </button>
);

Button.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  buttonType: PropTypes.oneOf([PRIMARY, SECONDARY]),
  className: PropTypes.string,
  leftIcon: PropTypes.any,
};
