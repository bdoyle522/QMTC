import { useCallback, useState } from 'react';
import { v4 as uuid } from 'uuid';

import {
  NUMBER,
  predicateOptions,
  stringOperators,
  integersOperators,
  BETWEEN,
} from '../constants';
import { getTypeOfPredicate, generateSQLStatement } from '../utils';

const createItem = () => ({
  [uuid()]: {
    predicate: predicateOptions[0].value,
    operator: stringOperators[0].value,
    userInput: '',
    userInput2: '',
  },
});

export default function useSQL() {
  const [items, setItems] = useState(createItem());
  const [output, setOutput] = useState('');

  const onAddItem = useCallback(() => {
    setItems({
      ...items,
      ...createItem(),
    });
  }, [items, setItems]);

  const onSearch = useCallback(() => {
    const rows = Object.values(items);
    if (
      rows.some(
        (item) =>
          !item.userInput || (item.operator === BETWEEN && !item.userInput2)
      )
    ) {
      return alert('Please fill in all fields to generate your SQL statement');
    }
    setOutput(generateSQLStatement(rows));
  }, [items, setOutput]);

  const onReset = useCallback(() => {
    setItems(createItem());
    setOutput('');
  }, [setItems]);

  const onDeleteItem = useCallback(
    (key) => {
      if (Object.keys(items).length < 2) {
        onReset();
      } else {
        const newItems = { ...items };
        delete newItems[key];
        setItems(newItems);
      }
    },
    [items, setItems, onReset]
  );

  const updateItems = useCallback(
    (field, value, key) => {
      let updatedItem;
      if (
        field === 'predicate' &&
        getTypeOfPredicate(items[key].predicate) !== getTypeOfPredicate(value)
      ) {
        const newType = getTypeOfPredicate(value);
        updatedItem = {
          predicate: value,
          operator:
            newType === NUMBER
              ? integersOperators[0].value
              : stringOperators[0].value,
          userInput: '',
          userInput2: '',
        };
      } else {
        updatedItem = {
          ...items[key],
          [field]: value,
        };
      }
      const updatedItems = {
        ...items,
        [key]: updatedItem,
      };
      setItems(updatedItems);
    },
    [items, setItems]
  );
  return {
    items,
    onAddItem,
    onDeleteItem,
    updateItems,
    onSearch,
    onReset,
    output,
  };
}
