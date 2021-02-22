import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '../Button';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import styles from './ActionButtons.module.css';

export const ActionButtons = ({ onSearch, onReset }) => (
  <div className={styles.buttonsWrapper}>
    <Button
      label="Search"
      buttonType="primary"
      leftIcon={faSearch}
      className={styles.searchButton}
      onClick={onSearch}
      id="search"
    />
    <Button
      className={styles.resetButton}
      label="Reset"
      buttonType="secondary"
      onClick={onReset}
      id="reset"
    />
  </div>
);

ActionButtons.propTypes = {
  onSearch: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
};
