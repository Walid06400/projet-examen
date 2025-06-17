// resources/js/Components/DangerZone.jsx
import { useForm } from '@inertiajs/react'
import ConfirmationModal from '@/Components/ConfirmationModal'

export default function DangerZone({ userId }) {
  const { delete: destroy } = useForm()

  const handleDelete = () => {
    ConfirmationModal.show({
      message: 'Êtes-vous sûr de vouloir supprimer votre compte ?',
      onConfirm: () => destroy(route('profil.destroy')),
    })
  }

  return (
    <div className="border border-red-200 rounded-lg p-6 bg-red-50">
      <h3 className="text-lg font-semibold text-red-700 mb-4">Zone dangereuse</h3>
      <button 
        onClick={handleDelete}
        className="btn btn-error"
      >
        Supprimer le compte
      </button>
    </div>
  )
}
