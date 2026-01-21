export default function Dashboard() {
  return (
    <div className="p-8">
      <div className="bg-white rounded-2xl shadow-sm border h-[80vh] flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
            <span className="text-5xl">⚡</span>
          </div>
          <h2 className="text-2xl font-medium">No-code Workflow Builder</h2>
          <p className="text-zinc-500 mt-2">
            Drag and drop nodes to build workflows
          </p>
          <button className="mt-8 px-6 py-3 bg-black text-white rounded-xl text-sm font-medium">
            Start Building
          </button>
        </div>
      </div>
    </div>
  );
}
