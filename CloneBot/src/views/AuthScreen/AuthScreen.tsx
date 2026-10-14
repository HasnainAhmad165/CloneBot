import { AlarmClock, CheckSquare, LockKeyhole, ShieldCheck, Eye, EyeOff } from "lucide-react";
import { Brand } from "../../components/ui";
import { Button } from "../../components/elements";
import { useState } from "react";

export function AuthScreen({
  mode,
  setMode,
  onSubmit,
  keepSigned,
  setKeepSigned,
}: {
  mode: "signin" | "signup";
  setMode: (m: "signin" | "signup") => void;
  onSubmit: () => void;
  keepSigned: boolean;
  setKeepSigned: (v: boolean) => void;
}) {
  const [show, setShow] = useState(false);
  return (
    <div className="auth-layout">
      <section className="auth-pitch">
        <Brand small />
        <div className="pitch-copy">
          <span className="eyebrow">PRIVATE BY DESIGN</span>
          <h1>
            {mode === "signin"
              ? "Your AI-powered digital self"
              : "Set up your assistant in three steps"}
          </h1>
          <p>
            A private assistant that learns only what you choose to share,
            drafts replies in context, and keeps your commitments on track.
          </p>
        </div>
        <div className="pitch-features">
          {[
            [
              LockKeyhole,
              "Knowledge Privacy",
              "You decide what files or texts your Clone learns.",
            ],
            [
              CheckSquare,
              "Reply Approval Control",
              "CloneBot drafts replies, but you click send.",
            ],
            [
              AlarmClock,
              "Event Reminders",
              "Never forget a commitment made in chat again.",
            ],
          ].map(([Icon, title, copy]: any) => (
            <div className="pitch-feature" key={title}>
              <span>
                <Icon size={20} />
              </span>
              <div>
                <strong>{title}</strong>
                <small>{copy}</small>
              </div>
            </div>
          ))}
        </div>
        <div className="auth-foot">Your knowledge stays under your control</div>
      </section>
      <section className="auth-side">
        <form
          className="auth-card"
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
        >
          {mode === "signin" && (
            <div className="auth-tabs">
              <button
                type="button"
                className="selected"
                onClick={() => setMode("signin")}
              >
                Sign in
              </button>
              <button type="button" onClick={() => setMode("signup")}>
                Create account
              </button>
            </div>
          )}
          <div className="auth-title">
            <h2>
              {mode === "signin" ? "Welcome back" : "Create your account"}
            </h2>
            <p>
              {mode === "signin"
                ? "Enter your credentials to access your digital clone."
                : "Only you can see what your assistant learns."}
            </p>
          </div>
          {mode === "signup" && (
            <label>
              Full name
              <input placeholder="Jawad Tariq" required />
            </label>
          )}
          <label>
            Email address
            <input type="email" placeholder="jawad@example.com" required />
          </label>
          <label>
            Password
            <span className="password-wrap">
              <input
                type={show ? "text" : "password"}
                placeholder="Enter your password"
                required
                minLength={6}
              />
              <button type="button" onClick={() => setShow(!show)}>
                {show ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </span>
          </label>
          {mode === "signup" && (
            <label>
              Confirm password
              <input
                type="password"
                placeholder="Confirm your password"
                required
                minLength={6}
              />
            </label>
          )}
          {mode === "signin" ? (
            <>
              <div className="auth-row">
                <label className="check-label">
                  <input
                    type="checkbox"
                    checked={keepSigned}
                    onChange={(e) => setKeepSigned(e.target.checked)}
                  />
                  Keep me signed in
                </label>
                <button
                  type="button"
                  className="text-button"
                  onClick={() =>
                    alert(
                      "Password reset is not connected in the mock-data version.",
                    )
                  }
                >
                  Forgot password?
                </button>
              </div>
              <Button type="submit" className="full">
                Sign in
              </Button>
              <p className="auth-switch">
                New to CloneBot?{" "}
                <button type="button" onClick={() => setMode("signup")}>
                  Create an account
                </button>
              </p>
            </>
          ) : (
            <>
              <label className="check-label consent">
                <input type="checkbox" required />I agree to the{" "}
                <button type="button" className="text-button">
                  Privacy Policy
                </button>{" "}
                and authorize CloneBot to process my selected knowledge.
              </label>
              <Button type="submit" className="full">
                Create account
              </Button>
              <p className="auth-switch">
                Already have an account?{" "}
                <button type="button" onClick={() => setMode("signin")}>
                  Back to sign-in
                </button>
              </p>
            </>
          )}
          <div className="auth-security">
            <ShieldCheck size={16} />
            <span>
              Demo interface. Authentication will connect when the backend is
              ready.
            </span>
          </div>
        </form>
      </section>
    </div>
  );
}
