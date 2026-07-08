export default function NoChildNotice() {
  return (
    <div className="flex flex-col items-center rounded-[2rem] border-2 border-dashed border-outline-variant bg-surface-container-low/50 p-12 text-center">
      <span className="material-symbols-outlined mb-3 text-5xl text-outline">school</span>
      <h4 className="mb-1 text-xl font-extrabold text-on-surface">No child linked to your account yet</h4>
      <p className="max-w-md font-medium text-on-surface-variant">
        Once the school enrolls your child and links them to your account, their details will appear here.
      </p>
    </div>
  );
}
