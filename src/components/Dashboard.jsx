import { FaHome, FaUserGraduate, FaClipboardList, FaChartBar, FaCog } from "react-icons/fa";

function Dashboard() {
    return (
        <>
            <div className="sidebar">
                <div className="logo-section">
                    <div className="logo-box">
                        🎓
                    </div>

                    <div>
                        <h2>SRMS</h2>
                        <p>Student Result Management System</p>
                    </div>
                </div>

                <div className="menu">
                    <div className="menu-item active">
                        <FaHome className="icon" />
                        <span>Dashboard</span>
                    </div>

                    <div className="menu-item">
                        <FaUserGraduate className="icon" />
                        <span>Students</span>
                    </div>

                    <div className="menu-item">
                        <FaClipboardList className="icon" />
                        <span>Results</span>
                    </div>

                    <div className="menu-item">
                        <FaChartBar className="icon" />
                        <span>Reports</span>
                    </div>

                    <div className="menu-item">
                        <FaCog className="icon" />
                        <span>Settings</span>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Dashboard;