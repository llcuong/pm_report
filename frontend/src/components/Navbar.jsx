export default function Navbar() {
  return (
    <nav
      className="bg-(--bg-primary) shadow-[0_10px_5px_-3px_var(--navbar-shadow-color),0_4px_6px_-2px_var(--navbar-shadow-color)] sticky top-0 z-50">
      <div className="max-w-8xl mx-auto px-4">
        <div className="flex items-center h-16">

          <div className="flex items-center flex-1 min-w-0">
            <div className="flex items-center shrink-0">
              <div>
                <a href="/">
                  <img className="h-12"
                    src="https://www.pmgloves.com/images/PreciousMountain-EN-LOGO.jpg" alt="PM Group" />
                </a>
              </div>
            </div>

            <div className="ml-8 shrink-0">
            </div>
          </div>

          <div className="flex flex-row items-center flex-none mx-4 min-w-0">
          </div>

          <div className="flex items-center justify-end gap-1 flex-1 min-w-0">
            <span className="text-(--text-secondary) px-3 py-2 text-sm font-medium transition-colors">
              version 0.1.0
            </span>
          </div>
        </div>
      </div>
    </nav>
  )
}
