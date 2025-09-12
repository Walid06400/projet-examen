// resources/js/Pages/Profil.jsx
import { usePage, useForm } from '@inertiajs/react'
import SuccessModal from '@/Components/SuccessModal'
import DangerZone from '@/Components/DangerZone'

export default function Profil() {
  const { auth } = usePage().props
  const { data, setData, patch, errors, reset } = useForm({
    name: auth.user.name,
    email: auth.user.email,
    avatar: null,
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    
    patch(route('profil.update'), {
      preserveScroll: true,
      onSuccess: () => {
        reset('avatar')
        SuccessModal.show({ message: 'Profil mis à jour !' })
      },
    })
  }

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8">
      {/* Section Avatar */}
      <div className="text-center">
        <img 
          src={auth.user.avatar || '/images/default-avatar.png'} 
          className="w-32 h-32 rounded-full mx-auto mb-4"
          alt="Avatar"
        />
        <input
          type="file"
          onChange={(e) => setData('avatar', e.target.files[0])}
          className="file-input file-input-bordered w-full max-w-xs"
        />
        {errors.avatar && <p className="text-red-500 mt-2">{errors.avatar}</p>}
      </div>

      {/* Formulaire */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-1">Nom</label>
          <input
            type="text"
            value={data.name}
            onChange={(e) => setData('name', e.target.value)}
            className="input input-bordered w-full"
          />
          {errors.name && <p className="text-red-500 mt-2">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            value={data.email}
            onChange={(e) => setData('email', e.target.value)}
            className="input input-bordered w-full"
            disabled
          />
        </div>

        <button type="submit" className="btn btn-primary w-full">
          Enregistrer les modifications
        </button>
      </form>

      <DangerZone userId={auth.user.id} />
    </div>
  )
}
