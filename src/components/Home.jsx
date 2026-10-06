import { useEffect, useState } from "react";
import { FaUsers, FaCheckCircle, FaTimesCircle, FaChartBar, FaPlus, FaEdit, FaTrash, FaSearch, FaSave } from "react-icons/fa";

function Home() {

    const [students, setStudents] = useState([]);
    const [rollNo, setRollNo] = useState("");
    const [name, setName] = useState("");
    const [course, setCourse] = useState("");
    const [math, setMath] = useState("");
    const [science, setScience] = useState("");
    const [english, setEnglish] = useState("");
    const [editId, setEditId] = useState(null);
    const [search, setSearch] = useState("");
    const [filterCourse, setFilterCourse] = useState("");
    const [sort, setSort] = useState("");

    /* ================= GET DATA ================= */

    useEffect(() => {

        fetch("http://localhost:3000/students")
            .then((res) => res.json())
            .then((data) => {
                setStudents(data);
                localStorage.setItem("studentsData", JSON.stringify(data));
            })
            .catch(() => {
                const savedData = localStorage.getItem("studentsData");
                if (savedData) {
                    setStudents(JSON.parse(savedData));
                }
            });
    }, []);


    /* ================= CALCULATIONS ================= */

    const getTotal = (student) => {
        return (
            Number(student.math) +
            Number(student.science) +
            Number(student.english)
        );
    };


    const getPercentage = (student) => {
        return (getTotal(student) / 300) * 100;
    };


    const getGrade = (percentage) => {

        if (percentage >= 80) {
            return "A";
        }

        if (percentage >= 60) {
            return "B";
        }

        if (percentage >= 40) {
            return "C";
        }

        return "D";
    };


    const getStatus = (percentage) => {

        if (percentage >= 40) {
            return "Pass";
        }

        return "Fail";
    };


    /* ================= ADD / UPDATE ================= */

    const handleSubmit = (e) => {
        e.preventDefault();

        const studentData = {
            rollNo: rollNo,
            name: name,
            course: course,
            math: Number(math),
            science: Number(science),
            english: Number(english),
        };

        // UPDATE
        if (editId) {
            fetch(`http://localhost:3000/students/${editId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: editId,
                    ...studentData,
                }),
            })
                .then((res) => res.json())
                .then((updatedStudent) => {

                    const updatedData = students.map((student) => {
                        if (student.id === editId) {
                            return updatedStudent;
                        } else {
                            return student;
                        }
                    });

                    setStudents(updatedData);

                    localStorage.setItem(
                        "studentsData",
                        JSON.stringify(updatedData)
                    );

                    clearForm();
                });
        }

        // ADD
        else {
            fetch("http://localhost:3000/students", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(studentData),
            })
                .then((res) => res.json())
                .then((newStudent) => {

                    const updatedData = [
                        ...students,
                        newStudent,
                    ];

                    setStudents(updatedData);

                    localStorage.setItem(
                        "studentsData",
                        JSON.stringify(updatedData)
                    );

                    clearForm();
                });
        }
    };

    /* ================= EDIT ================= */

    const handleEdit = (student) => {
        setEditId(student.id);
        setRollNo(student.rollNo);
        setName(student.name);
        setCourse(student.course);
        setMath(student.math);
        setScience(student.science);
        setEnglish(student.english);
    };


    /* ================= DELETE ================= */

    const handleDelete = (id) => {
        fetch(`http://localhost:3000/students/${id}`, {
            method: "DELETE",
        }).then(() => {
            const updatedData = students.filter((student) => student.id !== id);
            setStudents(updatedData);
            localStorage.setItem("studentsData", JSON.stringify(updatedData));
        });
    };


    /* ================= CLEAR FORM ================= */

    const clearForm = () => {
        setEditId(null);
        setRollNo("");
        setName("");
        setCourse("");
        setMath("");
        setScience("");
        setEnglish("");
    };


    /* ================= FILTER ================= */

    let filteredStudents = students.filter((student) => {
        const searchMatch = student.name.toLowerCase().includes(search.toLowerCase())
        const courseMatch = filterCourse === "" || student.course === filterCourse;
        return searchMatch && courseMatch;
    });


    /* ================= SORT ================= */

    if (sort === "high") {
        filteredStudents.sort(
            (a, b) => getPercentage(b) - getPercentage(a)
        );
    }
    if (sort === "low") {
        filteredStudents.sort(
            (a, b) => getPercentage(a) - getPercentage(b)
        );
    }


    /* ================= STATISTICS ================= */

    const totalStudents = students.length;
    const passedStudents = students.filter((student) => getStatus(getPercentage(student)) === "Pass").length;
    const failedStudents = students.filter((student) => getStatus(getPercentage(student)) === "Fail").length;
    const averagePercentage = totalStudents > 0 ? students.reduce((sum, student) => sum + getPercentage(student), 0) / totalStudents : 0;

    /* ================= AVERAGE SUBJECTS ================= */

    const averageMath = totalStudents > 0 ? students.reduce((sum, student) => sum + Number(student.math), 0) / totalStudents : 0;
    const averageScience = totalStudents > 0 ? students.reduce((sum, student) => sum + Number(student.science), 0) / totalStudents : 0;
    const averageEnglish = totalStudents > 0 ? students.reduce((sum, student) => sum + Number(student.english), 0) / totalStudents : 0;

    return (
        <div className="home">

            {/* ================= STAT CARDS ================= */}

            <div className="stats-row">

                <div className="stat-card">

                    <div className="stat-icon blue">
                        <FaUsers />
                    </div>

                    <div>
                        <small>Total Students</small>

                        <h2>{totalStudents}</h2>

                        <span className="green-text">
                            ↑ 12%
                        </span>

                        <p>Registered students</p>
                    </div>

                </div>


                <div className="stat-card">

                    <div className="stat-icon green">
                        <FaCheckCircle />
                    </div>

                    <div>
                        <small>Passed</small>

                        <h2>{passedStudents}</h2>

                        <span className="green-text">
                            ↑ 8%
                        </span>

                        <p>Students passed</p>
                    </div>

                </div>


                <div className="stat-card">

                    <div className="stat-icon red">
                        <FaTimesCircle />
                    </div>

                    <div>
                        <small>Failed</small>

                        <h2>{failedStudents}</h2>

                        <span className="red-text">
                            ↓ 4%
                        </span>

                        <p>Students failed</p>
                    </div>

                </div>


                <div className="stat-card">

                    <div className="stat-icon orange">
                        <FaChartBar />
                    </div>

                    <div>
                        <small>Average Percentage</small>

                        <h2>
                            {averagePercentage.toFixed(1)}%
                        </h2>

                        <span className="green-text">
                            ↑ 5%
                        </span>

                        <p>Overall performance</p>
                    </div>

                </div>

            </div>


            {/* ================= MAIN CONTENT ================= */}

            <div className="result-layout">


                {/* ================= STUDENT TABLE ================= */}

                <div className="student-section">

                    <div className="section-header">

                        <h3>Student Results</h3>

                        <div className="filters">

                            <div className="search-box">

                                <FaSearch />

                                <input
                                    type="text"
                                    placeholder="Search student..."
                                    value={search}
                                    onChange={(e) =>
                                        setSearch(e.target.value)
                                    }
                                />

                            </div>


                            <select
                                value={filterCourse}
                                onChange={(e) =>
                                    setFilterCourse(e.target.value)
                                }
                            >
                                <option value="">All Courses</option>
                                <option value="BCA">BCA</option>
                                <option value="B.Sc">B.Sc</option>
                                <option value="B.Com">B.Com</option>
                            </select>


                            <select
                                value={sort}
                                onChange={(e) =>
                                    setSort(e.target.value)
                                }
                            >
                                <option value="">
                                    Sort by Percentage
                                </option>

                                <option value="high">
                                    High to Low
                                </option>

                                <option value="low">
                                    Low to High
                                </option>
                            </select>


                            <button
                                className="add-btn"
                                onClick={clearForm}
                            >
                                <FaPlus />
                                Add Result
                            </button>

                        </div>

                    </div>


                    <div className="table-container">

                        <table>

                            <thead>
                                <tr>
                                    <th>Roll No</th>
                                    <th>Student Name</th>
                                    <th>Course</th>
                                    <th>Math</th>
                                    <th>Science</th>
                                    <th>English</th>
                                    <th>Total</th>
                                    <th>Percentage</th>
                                    <th>Grade</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>


                            <tbody>

                                {filteredStudents.map((student) => {

                                    const total =
                                        getTotal(student);

                                    const percentage =
                                        getPercentage(student);

                                    const grade =
                                        getGrade(percentage);

                                    const status =
                                        getStatus(percentage);


                                    return (
                                        <tr key={student.id}>

                                            <td>{student.rollNo}</td>

                                            <td className="student-name">
                                                {student.name}
                                            </td>

                                            <td>{student.course}</td>

                                            <td>{student.math}</td>

                                            <td>{student.science}</td>

                                            <td>{student.english}</td>

                                            <td>{total}</td>

                                            <td>
                                                {percentage.toFixed(1)}%
                                            </td>

                                            <td>
                                                <span
                                                    className={`grade grade-${grade}`}
                                                >
                                                    {grade}
                                                </span>
                                            </td>

                                            <td>
                                                <span
                                                    className={
                                                        status === "Pass"
                                                            ? "status-pass"
                                                            : "status-fail"
                                                    }
                                                >
                                                    {status}
                                                </span>
                                            </td>

                                            <td>

                                                <div className="action-buttons">

                                                    <button
                                                        className="edit-btn"
                                                        onClick={() =>
                                                            handleEdit(student)
                                                        }
                                                    >
                                                        <FaEdit />
                                                    </button>

                                                    <button
                                                        className="delete-btn"
                                                        onClick={() =>
                                                            handleDelete(student.id)
                                                        }
                                                    >
                                                        <FaTrash />
                                                    </button>

                                                </div>

                                            </td>

                                        </tr>
                                    );
                                })}

                            </tbody>

                        </table>

                    </div>

                </div>


                {/* ================= RIGHT SIDE ================= */}

                <div className="right-section">


                    {/* ADD / EDIT FORM */}

                    <div className="result-form-card">

                        <div className="form-title">

                            <h3>
                                <FaPlus />
                                {editId
                                    ? "Edit Result"
                                    : "Add / Edit Result"}
                            </h3>

                        </div>


                        <form onSubmit={handleSubmit}>

                            <label>Student Name</label>

                            <input
                                type="text"
                                placeholder="Enter student name"
                                value={name}
                                onChange={(e) =>
                                    setName(e.target.value)
                                }
                            />


                            <div className="two-inputs">

                                <div>
                                    <label>Roll No</label>

                                    <input
                                        type="text"
                                        placeholder="Enter roll number"
                                        value={rollNo}
                                        onChange={(e) =>
                                            setRollNo(e.target.value)
                                        }
                                    />
                                </div>


                                <div>
                                    <label>Course</label>

                                    <select
                                        value={course}
                                        onChange={(e) =>
                                            setCourse(e.target.value)
                                        }
                                    >
                                        <option value="">
                                            Select course
                                        </option>

                                        <option value="BCA">
                                            BCA
                                        </option>

                                        <option value="B.Sc">
                                            B.Sc
                                        </option>

                                        <option value="B.Com">
                                            B.Com
                                        </option>
                                    </select>
                                </div>

                            </div>


                            <label>Marks</label>

                            <div className="marks-inputs">

                                <input
                                    type="number"
                                    placeholder="Math"
                                    value={math}
                                    onChange={(e) =>
                                        setMath(e.target.value)
                                    }
                                    min="0"
                                    max="100"
                                />

                                <input
                                    type="number"
                                    placeholder="Science"
                                    value={science}
                                    onChange={(e) =>
                                        setScience(e.target.value)
                                    }
                                    min="0"
                                    max="100"
                                />

                                <input
                                    type="number"
                                    placeholder="English"
                                    value={english}
                                    onChange={(e) =>
                                        setEnglish(e.target.value)
                                    }
                                    min="0"
                                    max="100"
                                />

                            </div>


                            <button
                                type="submit"
                                className="save-btn"
                            >
                                <FaSave />

                                {editId
                                    ? "Update Result"
                                    : "Save Result"}
                            </button>

                        </form>

                    </div>


                    {/* PERFORMANCE */}

                    <div className="performance-card">

                        <h3>
                            <FaChartBar />
                            Performance Overview
                        </h3>


                        <div className="chart">

                            <div className="bar-box">

                                <div
                                    className="bar"
                                    style={{
                                        height: `${averageMath}%`,
                                    }}
                                ></div>

                                <span>
                                    {averageMath.toFixed(0)}%
                                </span>

                                <small>Math</small>

                            </div>


                            <div className="bar-box">

                                <div
                                    className="bar"
                                    style={{
                                        height: `${averageScience}%`,
                                    }}
                                ></div>

                                <span>
                                    {averageScience.toFixed(0)}%
                                </span>

                                <small>Science</small>

                            </div>


                            <div className="bar-box">

                                <div
                                    className="bar"
                                    style={{
                                        height: `${averageEnglish}%`,
                                    }}
                                ></div>

                                <span>
                                    {averageEnglish.toFixed(0)}%
                                </span>

                                <small>English</small>

                            </div>


                            <div className="bar-box">

                                <div
                                    className="bar"
                                    style={{
                                        height: `${averagePercentage}%`,
                                    }}
                                ></div>

                                <span>
                                    {averagePercentage.toFixed(0)}%
                                </span>

                                <small>Average</small>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Home;