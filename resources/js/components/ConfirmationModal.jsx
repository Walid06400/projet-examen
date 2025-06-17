// resources/js/Components/ConfirmationModal.jsx
import { Dialog } from '@headlessui/react'
import { useEffect, useRef } from 'react'

export default function ConfirmationModal({ message, onConfirm, onCancel }) {
  const cancelButtonRef = useRef(null)

  return (
    <Dialog
      open={true}
      onClose={onCancel}
      initialFocus={cancelButtonRef}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md rounded-lg bg-white p-6">
          <Dialog.Title className="text-lg font-bold text-red-600">
            ⚠️ Confirmation requise
          </Dialog.Title>
          
          <Dialog.Description className="mt-4 text-gray-600">
            {message || "Êtes-vous sûr de vouloir effectuer cette action ?"}
          </Dialog.Description>

          <div className="mt-6 flex justify-end gap-3">
            <button
              ref={cancelButtonRef}
              onClick={onCancel}
              className="px-4 py-2 text-gray-500 hover:text-gray-700"
            >
              Annuler
            </button>
            
            <button
              onClick={onConfirm}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Confirmer
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}
