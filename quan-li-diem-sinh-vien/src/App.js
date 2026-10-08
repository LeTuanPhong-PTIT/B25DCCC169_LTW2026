import React, { useState } from "react";

const StudentItem = ({ student, onDelete }) => {
  return (
    <tr>
      <td>{student.id}</td>
      <td>{student.name}</td>
      <td>{student.score}</td>
      <td>{student.class}</td>
      <td>
        <button onClick={() => onDelete(student.id)}>Xóa</button>
      </td>
    </tr>
  );
};

const StudentList = ({ students, onDelete }) => {
  return (
    <table border="1" cellPadding="8">
      <thead>
        <tr>
          <th>ID</th>
          <th>Họ tên</th>
          <th>Điểm</th>
          <th>Lớp</th>
          <th>Thao tác</th>
        </tr>
      </thead>

      <tbody>
        {students.map((student) => (
          <StudentItem
            key={student.id}
            student={student}
            onDelete={onDelete}
          />
        ))}
      </tbody>
    </table>
  );
};

const App = () => {
  const [students, setStudents] = useState([
    {
      id: 1,
      name: "Nguyễn Văn A",
      score: 8.5,
      class: "D25DCCC001",
    },
    {
      id: 2,
      name: "Nguyễn Văn B",
      score: 7,
      class: "D25DCCC002",
    },
    {
      id: 3,
      name: "Nguyễn Văn C",
      score: 4,
      class: "D25DCCC003",
    },
  ]);

  const [name, setName] = useState("");
  const [score, setScore] = useState("");
  const [className, setClassName] = useState("");
  const [filter, setFilter] = useState("all");

  const addStudent = () => {
    if (
      name.trim() === "" ||
      score === "" ||
      className.trim() === ""
    ) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    const numberScore = Number(score);

    if (numberScore < 0 || numberScore > 10) {
      alert("Điểm phải từ 0 đến 10!");
      return;
    }

    const newStudent = {
      id: students.length > 0
        ? Math.max(...students.map((student) => student.id)) + 1
        : 1,
      name: name,
      score: numberScore,
      class: className,
    };

    setStudents([...students, newStudent]);

    setName("");
    setScore("");
    setClassName("");
  };

  const deleteStudent = (id) => {
    setStudents(
      students.filter((student) => student.id !== id)
    );
  };

  const filteredStudents = students.filter((student) => {
    if (filter === "good") {
      return student.score >= 8;
    }

    if (filter === "fail") {
      return student.score < 5;
    }

    return true;
  });

  const totalStudents = students.length;

  const averageScore =
    students.length > 0
      ? students.reduce((sum, student) => sum + student.score, 0) /
        students.length
      : 0;

  return (
    <div>
      <h1>Quản lý sinh viên</h1>

      <h2>Thêm sinh viên</h2>

      <input
        type="text"
        placeholder="Họ tên"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="number"
        placeholder="Điểm"
        value={score}
        onChange={(e) => setScore(e.target.value)}
      />

      <input
        type="text"
        placeholder="Lớp"
        value={className}
        onChange={(e) => setClassName(e.target.value)}
      />

      <button onClick={addStudent}>Thêm</button>

      <h2>Thống kê</h2>

      <p>Tổng số sinh viên: {totalStudents}</p>

      <p>
        Điểm trung bình: {averageScore.toFixed(2)}
      </p>

      <h2>Bộ lọc</h2>

      <button onClick={() => setFilter("all")}>
        Tất cả
      </button>

      <button onClick={() => setFilter("good")}>
        Sinh viên Giỏi (≥ 8)
      </button>

      <button onClick={() => setFilter("fail")}>
        Sinh viên trượt (&lt; 5)
      </button>

      <h2>Danh sách sinh viên</h2>

      <StudentList
        students={filteredStudents}
        onDelete={deleteStudent}
      />
    </div>
  );
};

export default App;