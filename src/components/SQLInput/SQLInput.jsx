import React from 'react';
import { Button } from '../Button';

import { SQLLine } from './SQLLine';

import styles from './SQLInput.module.css';

export const SQLInput = ({
  items,
  onDeleteItem,
  updateItems,
  onAddItem,
  onSearch,
}) => {
  return (
    <div className={styles.sqlWrapper}>
      {Object.entries(items).map(([key, row]) => {
        return (
          <SQLLine
            onDelete={onDeleteItem}
            rowId={key}
            onUpdate={updateItems}
            key={key}
            row={row}
            onSearch={onSearch}
          />
        );
      })}
      <Button
        label="And"
        buttonType="primary"
        onClick={onAddItem}
        className={styles.addButton}
      />
      <hr className={styles.divider} />
    </div>
  );
};
