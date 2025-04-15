
export function Footer() {
  return (
    <footer className="bg-gray-50 border-t py-6 mt-auto">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} Interview Questions Generator — Created for interview preparation
        </p>
        <p className="text-xs text-gray-400 mt-1">
          A tool to help students, job seekers, and professionals prepare for interviews
        </p>
      </div>
    </footer>
  );
}
