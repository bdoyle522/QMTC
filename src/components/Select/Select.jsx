import React from 'react';
import PropTypes from 'prop-types';

import styles from './Select.module.css';

export const Select = ({ options, label, onChange, value }) => (
  <select
    className={styles.select}
    name={label}
    tabIndex={0}
    onChange={onChange}
  >
    {options.map((opt) => (
      <option value={opt.value} key={opt.value}>
        {opt.label}
      </option>
    ))}
  </select>
);

Select.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    })
  ),
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};
