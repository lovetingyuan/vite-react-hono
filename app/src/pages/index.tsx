import { useStore } from '../store';
import { toast } from '../components/Toast';
import { useCounterRequest } from '../swr/counter';

function App() {
  const { count, setCount } = useStore();
  const { response, isMutating, requestCounter } = useCounterRequest();

  const handleApiRequest = async () => {
    try {
      const result = await requestCounter(count);
      toast.success(result.text);
    } catch {
      toast.error('API call failed');
    }
  };

  return (
    <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-6">
      <section className="card card-border bg-base-100 w-full max-w-xl shadow-sm">
        <div className="card-body gap-6">
          <div>
            <h1 className="card-title text-3xl">Vite React Hono</h1>
            <p className="mt-2 text-base-content/70">
              A minimal full-stack starter with typed Hono RPC, SWR, and shared state.
            </p>
          </div>

          <div className="rounded-box bg-base-200 p-5">
            <p className="text-sm text-base-content/70">Current count</p>
            <p className="mt-1 text-5xl font-bold tabular-nums">{count}</p>
          </div>

          <div className="card-actions flex-col items-stretch gap-3 sm:flex-row">
            <button
              type="button"
              className="btn"
              onClick={() => {
                setCount((current: number) => current + 1);
              }}
            >
              Increment
            </button>
            <button type="button" className="btn btn-primary" onClick={handleApiRequest} disabled={isMutating}>
              {isMutating && <span className="loading loading-spinner loading-sm"></span>}
              Send count to API
            </button>
          </div>

          <div className="text-sm text-base-content/70">
            {response ? (
              <p>
                Backend response: <span className="font-medium text-base-content">{response.text}</span>
              </p>
            ) : (
              <p>Click the API button to request the Hono backend through SWR.</p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

export default App;
