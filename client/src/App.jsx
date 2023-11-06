import {  RouterProvider, createBrowserRouter } from 'react-router-dom'
import {  
  HomeLayout, Landing , Register, Login, DashboardLayout , Error, AddJob, AllJobs, Stats, Profile, Admin, 
  EditJob, DeleteJob} from './pages'
 import { action as registerAction} from './pages/Register';
 import { action as loginAction} from './pages/Login';
import { loader as dashboardLoader  } from './pages/DashboardLayout';
import { action as addJobAction } from './pages/AddJob';
import { loader as AllJobsLoaders } from './pages/AllJobs';
import { action as editJobAction } from './pages/EditJob';
import { loader as editJobLoader } from './pages/EditJob';
import { action as deleteJobAction } from './pages/DeleteJob';
import { loader as adminLoader } from './pages/Admin';
import { action as ProfileAction } from './pages/Profile';
import { loader as statsLoader } from './pages/Stats';




 export const checkDefaultTheme = () => {
  const isDarkTheme = localStorage.getItem('darkTheme') === 'true';
  document.body.classList.toggle('dark-theme', isDarkTheme);
  return isDarkTheme
}

const isDarkThemeEnabled = checkDefaultTheme();

const router = createBrowserRouter([
  { path: '/' , element : <HomeLayout/>,errorElement: <Error/> , children : [
    { index:true , element: <Landing/> },
    { path: 'register' , 
      element : <Register/> , 
      action: registerAction,
    },
    { path: 'login', 
      element : <Login/>,
      action: loginAction
    },
    
    { path: 'dashboard' , element : <DashboardLayout isDarkThemeEnabled={isDarkThemeEnabled}/> , loader: dashboardLoader, children: [
      { index: true , element : <AddJob/> , action: addJobAction },
      { path: 'stats' , element : <Stats/> , loader: statsLoader},
      { path: 'all-jobs' , element : <AllJobs/>  , loader: AllJobsLoaders},
      { path: 'profile' , element : <Profile/> , action: ProfileAction},
      { path: 'admin' , element : <Admin/> , loader: adminLoader },
      { path: 'edit-job/:id' , element : <EditJob/> , loader: editJobLoader , action: editJobAction},
      { path: 'delete-job/:id' , action: deleteJobAction},
    ]},
  ]},

]);

const App = () => {
  return <RouterProvider router={router}/>
};

export default App;