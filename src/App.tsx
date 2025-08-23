import { useState } from 'react';
import TopSection from '../src/components/TopSection';
import Modal from '../src/components/Modal';
import FormUncontrolled from '../src/components/FormUncontrolled';
import FormReactHookForm from '../src/components/FormReactHookForm';

export type ModalType = 'uncontrolled' | 'rhf' | null;

const App: React.FC = () => {
  const [modalType, setModalType] = useState<ModalType>(null);

  const openModal = (type: Exclude<ModalType, null>) => setModalType(type);
  const closeModal = () => setModalType(null);

  const modalClasses =
    modalType === 'uncontrolled'
      ? 'bg-blue-50 text-blue-800'
      : 'bg-green-50 text-green-800';

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <TopSection openModal={openModal} />

      {modalType && (
        <Modal onClose={closeModal}>
          <div
            className={`p-6 rounded-lg shadow-md w-full max-w-md ${modalClasses}`}
          >
            {modalType === 'uncontrolled' ? (
              <FormUncontrolled onClose={closeModal} />
            ) : (
              <FormReactHookForm onClose={closeModal} />
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};

export default App;
