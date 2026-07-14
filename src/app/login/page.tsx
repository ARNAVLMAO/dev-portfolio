import { redirect } from "next/navigation";
import { createSession } from "@/lib/auth";

export default function LoginPage() {
  async function login(formData: FormData) {
    "use server";
    const password = formData.get("password");
    
    // In production, ADMIN_PASSWORD should be set in .env
    if (password === (process.env.ADMIN_PASSWORD || "Rajinibala@23")) {
      await createSession();
      redirect("/admin");
    }
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="w-full max-w-sm p-8 bg-white border border-sage-dark/30 rounded-xl shadow-sm">
        <h1 className="text-2xl font-semibold mb-6 text-center">Admin Login</h1>
        <form action={login} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-ink mb-1" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              required
              className="w-full px-4 py-2 border border-sage-dark/50 rounded-md focus:outline-none focus:ring-2 focus:ring-olive/50 bg-cream/50"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-ink text-white font-medium py-2 rounded-md hover:bg-ink-light transition-colors"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}
