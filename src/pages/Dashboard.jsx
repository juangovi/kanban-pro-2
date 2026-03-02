
import { useAuthSession } from "../providers/AuthProvider";
import { useTranslation } from "react-i18next";



//import Board from './Board';
import { SidebarComponent } from '../components/SidebarComponent';
import { HeadComponent } from '../components/HeadComponent';
import { Projects } from "./Projects";


export const Dashboard = () => {
    const { user } = useAuthSession();
    const { t } = useTranslation();



    return (
        <div className="flex h-screen overflow-hidden">
            <SidebarComponent />
            <div className="flex-1 flex flex-col min-w-0">
                <HeadComponent />
                {/*<Board />*/}
                <Projects />
            </div>
        </div>
    );
}

export default Dashboard;