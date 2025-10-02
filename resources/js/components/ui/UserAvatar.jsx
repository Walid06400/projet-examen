import { useForm } from '@inertiajs/react';

export default function UserAvatar({ user }) {
  const { data, setData, post, processing, errors } = useForm({
    avatar: null,
  });

  function submit(e) {
    e.preventDefault();
    post(route('settings.profile.avatar.update'), {
      preserveScroll: true,
      onSuccess: () => {
        // Optionnel : toast.success("Avatar mis à jour !");
      },
    });
  }

  return (
    <form onSubmit={submit} encType="multipart/form-data">
      <input
        type="file"
        name="avatar"
        onChange={e => setData('avatar', e.target.files[0])}
      />
      {errors.avatar && <div className="text-red-600">{errors.avatar}</div>}
      <button type="submit" disabled={processing}>
        Mettre à jour l’avatar
      </button>
    </form>
  );
}
