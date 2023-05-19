const Header = () => {
    return (
        <header className='w-full px-4 absolute top-4'>
          <nav className="h-full bg-white rounded-lg border-black border">
            <ul className="flex h-full justify-end items-center px-3 py-2 text-xl">
              <li className="">
                <a href="##">
                    <div className="px-5 py-1">
                        Contact us
                    </div>
                </a>
              </li>

              <li className="ml-2">
                <a href="##">
                   <div className="bg-orange-500 border border-black px-5 py-1 rounded-md">
                        Signup
                    </div> 
                </a>
              </li>
            </ul>
          </nav>
        </header>
    )
}

export default Header