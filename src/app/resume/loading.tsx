export default function Loading() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 w-full py-4 px-6 overflow-y-auto flex justify-center items-center ">
        <div className="loader w-full h-full flex justify-center items-center">
          <span className="l">L</span>
          <span className="o">o</span>
          <span className="a">a</span>
          <span className="d">d</span>
          <span className="i">i</span>
          <span className="n">n</span>
          <span className="g">g</span>
          <span className="d1">.</span>
          <span className="d2">.</span>
        </div>
      </div>
    </div>
  );
}
