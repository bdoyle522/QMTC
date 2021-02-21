import PropTypes from 'prop-types';

import styles from './SQLOutput.module.css';

export const SQLOutput = ({ output }) => {
  if (!output) {
    return null;
  }
  return (
    <div className={styles.outputBox}>
      <span>{output}</span>
    </div>
  );
};

SQLOutput.propTypes = {
  output: PropTypes.string,
};
