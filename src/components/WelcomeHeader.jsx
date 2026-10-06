import educationImage from "../assets/education-removebg-preview.png";

function WelcomeHeader() {
  return (
    <div className="welcome-header">

      <div className="welcome-content">
        <h1>Student Result Management System</h1>

        <p>
          Manage student marks, grades, and performance easily.
        </p>
      </div>

      <div className="welcome-image">
        <img
          src={educationImage}
          alt="Education"
        />
      </div>

    </div>
  );
}

export default WelcomeHeader;