export default function AdminPanel({
  recipes,
  adminForm,
  setAdminForm,
  handleAddRecipe,
  handleDeleteRecipe,
  darkMode
}) {
  return (
    <div className="p-10 max-w-7xl mx-auto">
      <h2 className="text-4xl font-black mb-8 text-orange-500">
        Master Recipe Dashboard
      </h2>

      <form onSubmit={handleAddRecipe} className="mb-10">
        <input placeholder="Title" value={adminForm.title}
          onChange={e => setAdminForm({ ...adminForm, title: e.target.value })} />
        <button type="submit">Add Recipe</button>
      </form>

      {recipes.map(r => (
        <div key={r._id} className="flex justify-between mb-2">
          <span>{r.title}</span>
          <button onClick={() => handleDeleteRecipe(r._id)}>DELETE</button>
        </div>
      ))}
    </div>
  );
}
