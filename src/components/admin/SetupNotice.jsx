export default function SetupNotice() {
  return (
    <div className="rounded-2xl border-2 border-secondary-container bg-surface-container-low p-8">
      <div className="mb-4 flex items-center gap-3">
        <span className="material-symbols-outlined text-3xl text-primary">bolt</span>
        <h3 className="text-2xl font-black text-on-surface">Connect Supabase to see live data</h3>
      </div>
      <p className="mb-6 max-w-2xl font-medium text-on-surface-variant">
        The admin panel is ready — it just needs your Supabase project keys. Follow these steps:
      </p>
      <ol className="mb-6 space-y-3 text-on-surface">
        {[
          "Create a project at supabase.com and open Settings → API.",
          "Copy the Project URL and the anon public key.",
          "Duplicate the file .env.example to .env and paste both values.",
          "Run supabase/schema.sql in the Supabase SQL Editor to create the tables.",
          "Restart the dev server (npm run dev) so Vite picks up the .env file.",
        ].map((step, i) => (
          <li key={i} className="flex gap-3">
            <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary-container text-sm font-bold text-on-primary-container">
              {i + 1}
            </span>
            <span className="pt-0.5 font-medium">{step}</span>
          </li>
        ))}
      </ol>
      <div className="rounded-xl border-2 border-outline-variant bg-surface-container-lowest p-4 font-mono text-sm text-on-surface-variant">
        VITE_SUPABASE_URL=https://your-project-ref.supabase.co
        <br />
        VITE_SUPABASE_ANON_KEY=your-anon-public-key
      </div>
    </div>
  );
}
