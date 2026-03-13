// src/App.tsx
import { Navigate, Route, Routes } from "react-router-dom";

import CoursesPage from "./pages/CoursesPage";
import PlannerPage from "./pages/PlannerPage";
import PlannerViewPage from "./pages/PlannerViewPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<CoursesPage />} />
      <Route path="/planner/new" element={<PlannerPage />} />
      <Route path="/planner/:courseId" element={<PlannerViewPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;