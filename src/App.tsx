import { useCallback, useState } from 'react';
import { signOut as firebaseSignOut } from '@firebase/auth';
import BottomNav from './components/BottomNav';
import Toast from './components/Toast';
import { useFirebaseAuth } from './hooks/useFirebaseAuth';
import { useMenu } from './hooks/useMenu';
import { getFirebaseAuthErrorMessage } from './utils/firebaseAuthErrors';
import DetailScreen from './screens/DetailScreen';
import FormScreen from './screens/FormScreen';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import ManageScreen from './screens/ManageScreen';
import StatsScreen from './screens/StatsScreen';
import type { MenuItemInput, Screen, ToastKind, ToastState } from './types';

export default function App() {
  const menu = useMenu();
  const { auth, user, loading: authLoading, error: authError } = useFirebaseAuth();
  const [screen, setScreen] = useState<Screen>({ name: 'home' });
  const [toast, setToast] = useState<ToastState | null>(null);

  const notify = (message: string, kind: ToastKind = 'success') => setToast({ message, kind });
  const dismissToast = useCallback(() => setToast(null), []);

  const signOut = async () => {
    if (!auth) return;

    try {
      await firebaseSignOut(auth);
      setScreen({ name: 'home' });
    } catch (error) {
      notify(getFirebaseAuthErrorMessage(error), 'error');
    }
  };

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-white/70" role="status">
        Checking sign-in…
      </div>
    );
  }

  if (!user) return <LoginScreen auth={auth} authError={authError} />;

  const userName = user.displayName || user.phoneNumber || user.email || 'NALA staff';

  const find = (id: string) => menu.items.find((i) => i.id === id);
  const go = (s: Screen) => setScreen(s);

  const renderScreen = () => {
    switch (screen.name) {
      case 'home':
        return (
          <HomeScreen
            items={menu.items}
            userName={userName}
            onOpen={(id) => go({ name: 'detail', id })}
            onAdd={() => go({ name: 'add' })}
            onSignOut={() => void signOut()}
          />
        );
      case 'detail':
        return (
          <DetailScreen
            item={find(screen.id)}
            onBack={() => go({ name: 'home' })}
            onEdit={(id) => go({ name: 'edit', id })}
          />
        );
      case 'manage':
        return (
          <ManageScreen
            items={menu.items}
            onEdit={(id) => go({ name: 'edit', id })}
            onDelete={(item) => {
              const index = menu.items.findIndex((i) => i.id === item.id);
              menu.deleteItem(item.id);
              setToast({
                message: `"${item.name}" was deleted.`,
                kind: 'success',
                action: { label: 'Undo', onClick: () => menu.restoreItem(item, index) },
              });
            }}
            onAdd={() => go({ name: 'add' })}
            onReset={() => {
              menu.resetMenu();
              notify('Original menu restored.');
            }}
          />
        );
      case 'add':
        return (
          <FormScreen
            mode="add"
            allItems={menu.items}
            onSubmit={(input: MenuItemInput) => {
              menu.addItem(input);
              notify(`"${input.name}" added to the menu.`);
              go({ name: 'manage' });
            }}
            onCancel={() => go({ name: 'home' })}
            onInvalid={() => notify('Please fix the highlighted fields.', 'error')}
          />
        );
      case 'edit':
        return (
          <FormScreen
            mode="edit"
            item={find(screen.id)}
            allItems={menu.items}
            onSubmit={(input: MenuItemInput) => {
              menu.updateItem(screen.id, input);
              notify(`"${input.name}" updated.`);
              go({ name: 'manage' });
            }}
            onCancel={() => go({ name: 'manage' })}
            onInvalid={() => notify('Please fix the highlighted fields.', 'error')}
          />
        );
      case 'stats':
        return <StatsScreen items={menu.items} />;
    }
  };

  return (
    <div className="mx-auto min-h-screen w-full max-w-md pb-24">
      {renderScreen()}
      <Toast toast={toast} onDismiss={dismissToast} />
      <BottomNav current={screen.name} onNavigate={go} />
    </div>
  );
}
