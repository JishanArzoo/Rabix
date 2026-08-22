const Navbar = () => {
  return (
    <div className="sticky top-0 z-50 border-b border-white/10 bg-white/10 px-6 py-4 backdrop-blur-md backdrop-saturate-150 shadow-sm">
      <div className="mx-auto max-w-3xl flex flex-row justify-around">
        <h1 className="text-xl font-bold">RABIX</h1>
        <a href="https://github.com/JishanArzoo">
          <h3 className="font-bold text-xl bg-[linear-gradient(135deg,#0f172a,#1e3a8a,#2563eb,#6366f1)] bg-clip-text text-transparent">
            by Jishan
          </h3>
        </a>
      </div>
    </div>
  );
};

export default Navbar;