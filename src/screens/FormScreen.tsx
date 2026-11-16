import EmptyState from '../components/EmptyState';
import Header from '../components/Header';
import ItemForm from '../components/ItemForm';
import type { MenuItem, MenuItemInput } from '../types';

interface Props {
  /** Item being edited; leave undefined for the Add screen. */
  item?: MenuItem;
  mode: 'add' | 'edit';
  allItems: MenuItem[];
  onSubmit: (input: MenuItemInput) => void;
  onCancel: () => void;
  onInvalid: () => void;
}

export default function FormScreen({ item, mode, allItems, onSubmit, onCancel, onInvalid }: Props) {
  if (mode === 'edit' && !item) {
    return (
      <>
        <Header title="Edit Dish" onBack={onCancel} />
        <EmptyState title="Dish not found" actionLabel="Back" onAction={onCancel} />
      </>
    );
  }
  const otherNames = allItems.filter((i) => i.id !== item?.id).map((i) => i.name);
  return (
    <>
      <Header title={mode === 'add' ? 'Add Dish' : 'Edit Dish'} onBack={onCancel} />
      <ItemForm
        // Remount the form when switching items so it starts with the selected dish's values.
        key={item?.id ?? 'new'}
        item={item}
        otherNames={otherNames}
        submitLabel={mode === 'add' ? 'Save dish' : 'Save changes'}
        onSubmit={onSubmit}
        onCancel={onCancel}
        onInvalid={onInvalid}
      />
    </>
  );
}
