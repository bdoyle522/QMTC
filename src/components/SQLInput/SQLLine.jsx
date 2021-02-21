import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import { CustomSelect as Select } from '../Select';
import { UserInput } from '../UserInput';
import { Helper } from './Helper';
import { NUMBER, predicateOptions, BETWEEN } from '../../constants';
import {
  getPredicateOperators,
  getTypeOfPredicate,
  generatePlaceholderText,
} from '../../utils';

import styles from './SQLLine.module.css';

export const SQLLine = ({ onDelete, rowId, row, onUpdate, onSearch }) => {
  const onChange = useCallback(
    (field, value) => {
      onUpdate(field, value, rowId);
    },
    [onUpdate, rowId]
  );

  const onSubmit = (e) => {
    e.preventDefault();
    onSearch();
  };

  const { predicate, operator, userInput, userInput2 } = row;

  const predicateType = getTypeOfPredicate(predicate);
  const placeholderText = generatePlaceholderText(predicate);

  return (
    <form className={styles.lineWrapper} onSubmit={onSubmit}>
      <FontAwesomeIcon
        className={styles.removeRow}
        onClick={() => onDelete(rowId)}
        onKeyDown={(e) => {
          if (e.key === ' ' || e.key === 'enter') {
            e.preventDefault();
            onDelete(rowId);
          }
        }}
        icon={faTimes}
        tabIndex={0}
        color="#c8d0db"
      />
      <Select
        options={predicateOptions}
        value={predicate}
        onChange={(e) => onChange('predicate', e.target.value)}
      />
      {predicateType === NUMBER && <Helper text="is" />}
      <Select
        options={getPredicateOperators(predicate)}
        value={operator}
        onChange={(e) => onChange('operator', e.target.value)}
      />
      <UserInput
        onChange={(e) => onChange('userInput', e.target.value)}
        value={userInput}
        inputType={predicateType}
        placeholder={placeholderText}
      />
      {operator === BETWEEN && (
        <>
          <Helper text="and" />
          <UserInput
            onChange={(e) => onChange('userInput2', e.target.value)}
            value={userInput2}
            inputType={predicateType}
            placeholder={placeholderText}
          />
        </>
      )}
    </form>
  );
};

SQLLine.propTypes = {
  onDelete: PropTypes.func.isRequired,
  rowId: PropTypes.string.isRequired,
  onUpdate: PropTypes.func.isRequired,
  row: PropTypes.object.isRequired,
};
