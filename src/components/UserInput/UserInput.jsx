import React from 'react';
import PropTypes from 'prop-types';

import { NUMBER, TEXT } from '../../constants';

import styles from './UserInput.module.css';

export const UserInput = ({ inputType, value, onChange, placeholder }) => (
  <input
    className={styles.input}
    tabIndex={0}
    step={inputType === NUMBER ? 1 : undefined}
    min={inputType === NUMBER ? 0 : undefined}
    onChange={onChange}
    value={value}
    placeholder={placeholder}
    type={inputType === NUMBER ? 'number' : undefined}
  />
);

UserInput.propTypes = {
  inputType: PropTypes.oneOf([NUMBER, TEXT]).isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    .isRequired,
};
