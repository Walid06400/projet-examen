// resources/js/components/SuccessModal.jsx
import { useEffect, useRef } from 'react';
import { Dialog } from '@headlessui/react';

export default function SuccessModal({ message, onClose }) {
  const modalRef = useRef(null);

  return (
    <Dialog
      open={true}
      onClose={onClose}
      initialFocus={modalRef}
      className="relative z-50"
    >
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      {/* Modal container */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel 
          ref={modalRef}
          className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl"
        >
          <Dialog.Title className="text-lg font-bold text-green-600">
            ✅ Opération réussie !
          </Dialog.Title>
          
          <Dialog.Description className="mt-2 text-gray-600">
            {message || "Votre action a été réalisée avec succès."}
          </Dialog.Description>

          <button
            onClick={onClose}
            className="mt-4 w-full rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-green-700 focus:outline-none"
          >
            Fermer
          </button>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}

// Utilisation type dans un autre composant :
// <SuccessModal message="Votre profil a été mis à jour" onClose={() => setShowModal(false)} />
