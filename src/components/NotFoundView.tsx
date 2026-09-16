import Link from "next/link";
import RollingText from "./RollingText";

export default function NotFoundView() {
  return (
    <main className="grid min-h-[100svh] place-items-center px-6">
      <div data-reveal className="enter-lift flex flex-col items-center gap-8 text-center">
        <p className="ui-label flex items-center gap-3 text-muted">
          <span className="text-paper">404</span>
          <span>—</span>
          <span>PAGE NOT FOUND</span>
        </p>

        <Link
          href="/"
          data-roll-host
          data-cursor="link"
          className="btn-solid"
        >
          <RollingText text="BACK TO HOME" className="ui-label" />
        </Link>
      </div>
    </main>
  );
}
