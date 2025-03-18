export default function Footer() {
  return (
    <footer className="w-full py-6 bg-gray-100 dark:bg-gray-900">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
            <p className="text-center text-sm leading-loose text-gray-600 dark:text-gray-400 md:text-left">
              © 2023 LogicMinds. All rights reserved.
            </p>
          </div>
          <div className="flex gap-4">
            <a href="#" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">
              Terms
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">
              Privacy
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

