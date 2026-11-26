
import getForm from "../api/client/getForm";

export default function FormData() {
  const { data: forms = [], isPending, isError } = getForm();

  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950">
        <h2 className="text-lg font-semibold text-white">Loading Forms...</h2>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950">
        <h2 className="text-xl font-bold text-red-400">
          Something went wrong!
        </h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-12 sm:px-8">
      <div className="mx-auto max-w-7xl">

        <div className="mb-10 text-center">
          <h1 className="text-3xl font-extrabold text-white">
            Submitted Forms <span className="text-blue-500">Information</span>
          </h1>
          <p className="mt-3 text-gray-400">
            All submitted user information in one place.
          </p>
        </div>

        <div className="mb-8 rounded-xl border border-slate-700 bg-slate-900 p-5">
          <p className="text-sm text-gray-400">Total Submissions</p>
          <h2 className="mt-1 text-3xl font-bold text-white">
            {forms.length}
          </h2>
        </div>

        {forms.length === 0 ? (
          <p className="text-center text-gray-400">No Forms Found</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {forms.map((form) => (
              <div
                key={form.id}
                className="rounded-xl border border-slate-700 bg-slate-900 p-6 shadow-md transition hover:border-blue-500"
              >
                {/* User Image */}
                {form.image && (
                  <div className="mb-4 flex justify-center">
                    <img
                      src={`http://localhost:5000/${form.image}`}
                      alt="User Picture"
                      className="h-28 w-28 rounded-full border-2 border-blue-500 object-cover"
                    />
                  </div>
                )}

                {/* User Name */}
                <div className="mb-5 border-b border-slate-700 pb-4 text-center">
                  <h3 className="text-xl font-bold text-white">
                    {form.name}
                  </h3>
                  <p className="mt-1 text-xs text-gray-500">
                    Submission #{form.id}
                  </p>
                </div>

                {/* Form Details */}
                <div className="space-y-3 text-sm text-gray-300">
                  <p>
                    <span className="font-semibold text-blue-400">Email:</span>{" "}
                    {form.email || "N/A"}
                  </p>

                  <p>
                    <span className="font-semibold text-blue-400">Phone:</span>{" "}
                    {form.phone || "N/A"}
                  </p>

                  <p>
                    <span className="font-semibold text-blue-400">Gender:</span>{" "}
                    {form.gender || "N/A"}
                  </p>

                  <p>
                    <span className="font-semibold text-blue-400">Country:</span>{" "}
                    {form.country || "N/A"}
                  </p>

                  <div>
                    <p className="mb-2 font-semibold text-blue-400">Message:</p>
                    <p className="rounded-lg bg-slate-800 p-3 leading-relaxed">
                      {form.message || "No message provided"}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
