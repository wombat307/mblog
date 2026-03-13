export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-ink-200 mt-auto">
      <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6">
        <p className="text-center text-sm text-ink-500">
          © {year} mblog. Built with Next.js.
        </p>
      </div>
    </footer>
  );
}
