import { FaBars, FaSearch, FaBell, FaUserCircle, FaChevronDown } from "react-icons/fa";

function Navbar() {
    return (
        <>            {/* Top Navbar */}
            <div className="top-bar">
                <div className="top-left">
                    <FaBars />

                    <div className="top-search">
                        <FaSearch />
                        <input
                            type="text"
                            placeholder="Search students, results..."
                        />
                    </div>
                </div>

                <div className="top-right">
                    <div className="top-notification">
                        <FaBell />
                        <span></span>
                    </div>

                    <div className="admin-profile">
                        <FaUserCircle className="admin-profile-icon" />

                        <div>
                            <b>Admin User</b>
                            <small>Administrator</small>
                        </div>

                        <FaChevronDown className="profile-arrow" />
                    </div>
                </div>
            </div>
        </>

    );
}

export default Navbar;