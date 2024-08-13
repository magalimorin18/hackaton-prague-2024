import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const NavBar = () => {
  return (
    <nav className="bg-white-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <Button id="basic-button" aria-haspopup="true">
              Dashboard
            </Button>
            <Menu
              open={false}
              id="basic-menu"
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem>Profile</MenuItem>
              <MenuItem>My account</MenuItem>
              <MenuItem>Logout</MenuItem>
            </Menu>
          </div>
        </div>
      </div>
    </nav>
  );
  //   return (
  //     <nav className="bg-gray-800">
  //       <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
  //         <div className="relative flex h-16 items-center justify-between">
  //           <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
  //             <button
  //               type="button"
  //               className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
  //               aria-controls="mobile-menu"
  //               aria-expanded="false"
  //             >
  //               <span className="absolute -inset-0.5"></span>
  //               <span className="sr-only">Open main menu</span>

  //               <svg
  //                 className="block h-6 w-6"
  //                 fill="none"
  //                 viewBox="0 0 24 24"
  //                 strokeWidth="1.5"
  //                 stroke="currentColor"
  //                 aria-hidden="true"
  //               >
  //                 <path
  //                   strokeLinecap="round"
  //                   strokeLinejoin="round"
  //                   d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
  //                 />
  //               </svg>

  //               <svg
  //                 className="hidden h-6 w-6"
  //                 fill="none"
  //                 viewBox="0 0 24 24"
  //                 strokeWidth="1.5"
  //                 stroke="currentColor"
  //                 aria-hidden="true"
  //               >
  //                 <path
  //                   strokeLinecap="round"
  //                   strokeLinejoin="round"
  //                   d="M6 18L18 6M6 6l12 12"
  //                 />
  //               </svg>
  //             </button>
  //           </div>
  //           <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
  //             <div className="flex flex-shrink-0 items-center">
  //               <img
  //                 className="h-8 w-auto"
  //                 src="https://cdn-icons-png.flaticon.com/512/760/760157.png"
  //                 alt="Eth Prague 2024 Hackathon"
  //               />
  //             </div>
  //             <div className="hidden sm:ml-6 sm:block">
  //               <div className="flex space-x-4">
  //                 <p
  //                   className="text-white px-3 py-2 text-lg font-large"
  //                   aria-current="page"
  //                 >
  //                   Universal Graph
  //                 </p>
  //               </div>
  //             </div>
  //           </div>
  //           <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
  //             <button
  //               type="button"
  //               className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
  //             >
  //               <span className="absolute -inset-1.5"></span>
  //               <span className="sr-only">View notifications</span>
  //               <svg
  //                 className="h-6 w-6"
  //                 fill="none"
  //                 viewBox="0 0 24 24"
  //                 strokeWidth="1.5"
  //                 stroke="currentColor"
  //                 aria-hidden="true"
  //               >
  //                 <path
  //                   strokeLinecap="round"
  //                   strokeLinejoin="round"
  //                   d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
  //                 />
  //               </svg>
  //             </button>

  //             <div className="relative ml-3">
  //               <div>
  //                 <button
  //                   type="button"
  //                   className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
  //                   id="user-menu-button"
  //                   aria-expanded="false"
  //                   aria-haspopup="true"
  //                 >
  //                   <span className="absolute -inset-1.5"></span>
  //                   <span className="sr-only">Open user menu</span>
  //                   <img
  //                     className="h-8 w-8 rounded-full"
  //                     src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  //                     alt=""
  //                   />
  //                 </button>
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //       </div>

  //       <div className="sm:hidden" id="mobile-menu">
  //         <div className="space-y-1 px-2 pb-3 pt-2">
  //           <a
  //             href="#"
  //             className="bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium"
  //             aria-current="page"
  //           >
  //             Dashboard
  //           </a>
  //           <a
  //             href="#"
  //             className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
  //           >
  //             Team
  //           </a>
  //           <a
  //             href="#"
  //             className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
  //           >
  //             Projects
  //           </a>
  //           <a
  //             href="#"
  //             className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
  //           >
  //             Calendar
  //           </a>
  //         </div>
  //       </div>
  //     </nav>
  //   );
};

export default NavBar;
