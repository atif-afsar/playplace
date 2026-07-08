import { useState } from "react";
import { Link } from "react-router-dom";

const LOGO =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAvKSuIuDCT5yEAu8dKAYZKC0RxJq4k5vXA1t3Yf8Z1Ogv1AlQmnwoRsJXbzave4hlpgMFjtBkesaI0m89YqOBkBqHTzo_lYABi7r0XBRS3CTwSxVv7X5eevtGPJi_6n049Ce_UY3UnJ6t3wm1Kfv8S1R2BgCADmFTWzPPnFFy6wwkvMmNWUmLTvfV_ovV2deL9LlFVw0Enerh1O9fKZwwf1YbohWTjVXqzKiFRTPpz13iW_XMNSV6TDCNL9s8TzLR4Bw";

export default function LoginCard() {
  const [tab, setTab] = useState("parent");
  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setNotice("");
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    setNotice(
      `${tab === "parent" ? "Parent" : "Admin"} login will connect to Supabase Auth soon.`
    );
  };

  return (
    <div className="w-full max-w-[480px]">
      <div className="relative rounded-[2rem] border-[3px] border-surface-variant bg-white p-6 shadow-md shadow-primary/10 md:p-8">
        <div className="-mt-16 mb-8 flex justify-center">
          <div className="rounded-full border-[3px] border-surface-variant bg-white p-4 shadow-lg">
            <img src={LOGO} alt="Play Place" className="h-20 w-20 object-contain" />
          </div>
        </div>

        <div className="mb-8 text-center">
          <h2 className="font-display text-2xl font-extrabold text-on-background">Welcome Back!</h2>
          <p className="text-base font-medium text-on-surface-variant">
            Please enter your details to login
          </p>
        </div>

        <div className="mb-8 flex rounded-full bg-surface-container-high p-1">
          {["parent", "admin"].map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={`font-display flex-1 rounded-full px-4 py-3 text-sm font-semibold transition-all duration-300 ${
                tab === t
                  ? "bg-primary-container text-white"
                  : "text-on-surface-variant hover:bg-surface-variant/50"
              }`}
            >
              {t === "parent" ? "Parent Login" : "Admin Login"}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="font-display ml-2 text-sm font-semibold text-primary">
              Email or Username
            </label>
            <div className="group relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline transition-colors group-focus-within:text-secondary">
                person
              </span>
              <input
                required
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. happy.parent@mail.com"
                className="form-input w-full rounded-2xl border-[3px] border-surface-variant py-4 pl-12 pr-4 focus:border-secondary-container"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="font-display ml-2 text-sm font-semibold text-primary">
              Secret Password
            </label>
            <div className="group relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline transition-colors group-focus-within:text-secondary">
                lock
              </span>
              <input
                required
                type={showPass ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="form-input w-full rounded-2xl border-[3px] border-surface-variant py-4 pl-12 pr-12 focus:border-secondary-container"
              />
              <button
                type="button"
                onClick={() => setShowPass((v) => !v)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-outline hover:text-primary"
                aria-label={showPass ? "Hide password" : "Show password"}
              >
                <span className="material-symbols-outlined">
                  {showPass ? "visibility_off" : "visibility"}
                </span>
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between px-2">
            <label className="group flex cursor-pointer items-center gap-2">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="h-5 w-5 rounded border-2 border-surface-variant text-primary focus:ring-primary/20"
              />
              <span className="text-sm font-bold text-on-surface-variant transition-colors group-hover:text-primary">
                Remember me
              </span>
            </label>
            <a href="#" className="text-sm font-bold text-primary hover:underline">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bouncy-button mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-primary-container py-5 text-xl font-bold text-on-primary-container transition-all hover:bg-primary-container/90 disabled:opacity-70"
            style={{ boxShadow: "0 4px 0 #752305" }}
          >
            {loading ? "Logging in…" : "Login Now"}
            {!loading && <span className="material-symbols-outlined">rocket_launch</span>}
          </button>
          {notice && (
            <p className="rounded-2xl bg-surface-container-low px-4 py-3 text-center text-sm font-medium text-on-surface-variant">
              {notice}
            </p>
          )}
        </form>

        <div className="mt-8 text-center">
          <p className="text-base font-medium text-on-surface-variant">
            New to Play Place?{" "}
            <Link to="/admissions" className="font-bold text-tertiary hover:underline">
              Register your child
            </Link>
          </p>
        </div>
      </div>

      <div className="mt-8 flex justify-center gap-4 opacity-40">
        <span className="material-symbols-outlined text-tertiary">potted_plant</span>
        <span className="material-symbols-outlined text-secondary-fixed-dim">wb_sunny</span>
        <span className="material-symbols-outlined text-primary-container">toys</span>
      </div>
    </div>
  );
}
