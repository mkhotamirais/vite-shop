import { Link, isRouteErrorResponse, useNavigate, useRouteError } from "react-router-dom";

const ErrorBoundary = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  let content;
  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      content = <div>This page does not exist!</div>;
    } else if (error.status === 401) {
      return <div>You are not authorized to see this</div>;
    } else if (error.status === 503) {
      content = <div>Looks like our API is down</div>;
    } else if (error.status === 418) {
      content = <div>🫖</div>;
    }
  } else content = <div>Something went wrong</div>;

  return (
    <main className="min-h-screen dark:bg-slate-800 dark:text-white flex flex-col gap-3 items-center justify-center italic text-2xl sm:text-lg">
      {content}
      <div className="flex flex-col gap-2 items-center">
        <Link to="/" className="underline text-sm">
          Back to Home
        </Link>
        <button type="button" onClick={() => navigate(-1)} className="underline text-sm">
          Back to previous page
        </button>
      </div>
    </main>
  );
};

export default ErrorBoundary;
