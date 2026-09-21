import { SidebarComponent } from '../components/SidebarComponent';
import { HeadComponent } from '../components/HeadComponent';
import { Outlet } from 'react-router-dom';


export const Dashboard = () => {

    return (
        <div className="flex h-screen overflow-hidden">
            <SidebarComponent />
            <div className="flex-1 flex flex-col min-w-0">
                <HeadComponent />
                <Outlet />
            </div>
        </div>
    );
}

export default Dashboard;