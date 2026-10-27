import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
} from 'react-native';
import {colors} from '../theme/colors';

type ModalOptions = {
  title: string;
  message: string;
};

type ModalContextValue = {
  showModal: (options: ModalOptions) => void;
};

const ModalContext = createContext<ModalContextValue | undefined>(undefined);

export function ModalProvider({children}: {children: React.ReactNode}) {
  const [modal, setModal] = useState<ModalOptions | null>(null);

  const showModal = useCallback((options: ModalOptions) => {
    setModal(options);
  }, []);

  const dismiss = useCallback(() => {
    setModal(null);
  }, []);

  const value = useMemo(() => ({showModal}), [showModal]);

  return (
    <ModalContext.Provider value={value}>
      {children}
      <Modal
        visible={modal !== null}
        transparent
        animationType="fade"
        onRequestClose={dismiss}>
        <Pressable style={styles.backdrop} onPress={dismiss}>
          <Pressable style={styles.card} onPress={() => {}}>
            <Text style={styles.title}>{modal?.title ?? ''}</Text>
            <Text style={styles.message}>{modal?.message ?? ''}</Text>
            <Pressable
              style={({pressed}) => [
                styles.button,
                pressed ? styles.buttonPressed : undefined,
              ]}
              onPress={dismiss}>
              <Text style={styles.buttonLabel}>OK</Text>
            </Pressable>
          </Pressable>
        </Pressable>
      </Modal>
    </ModalContext.Provider>
  );
}

export function useModal(): ModalContextValue {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  card: {
    width: '100%',
    maxWidth: 340,
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: colors.border,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 10,
  },
  message: {
    fontSize: 15,
    lineHeight: 22,
    color: colors.textMuted,
    marginBottom: 20,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  buttonPressed: {
    backgroundColor: colors.primaryPressed,
  },
  buttonLabel: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
