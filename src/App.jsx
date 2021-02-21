import { SQLInput } from './components/SQLInput';
import { SQLOutput } from './components/SQLOutput';
import { ActionButtons } from './components/ActionButtons';
import useSql from './hooks/useSQL';
import styles from './App.module.css';

function App() {
  const {
    items,
    onAddItem,
    onDeleteItem,
    updateItems,
    onSearch,
    onReset,
    output,
  } = useSql();

  return (
    <div className={styles.appWrapper}>
      <h3>Search for Sessions</h3>
      <SQLInput
        items={items}
        onAddItem={onAddItem}
        onDeleteItem={onDeleteItem}
        updateItems={updateItems}
        onSearch={onSearch}
      />
      <ActionButtons onSearch={onSearch} onReset={onReset} />
      <SQLOutput output={output} />
    </div>
  );
}

export default App;
