
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { generatePlan } from "../api/index";
import { Button } from "../components/Button";

export default function PlannerPage() {
  const navigate = useNavigate();
  const [courseName, setCourseName] = useState("");
  const [examDate, setExamDate] = useState("");
  const [dailyStudyHours, setDailyStudyHours] = useState<number>(2);
  const [topicsText, setTopicsText] = useState("");
  const [textbook, setTextbook] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onGenerate() {
    setLoading(true);
    setError(null);

    const topics = topicsText
      .split(/\n|,/)
      .map((t) => t.trim())
      .filter(Boolean);

    try {
      const payload = {
        course_name: courseName,
        exam_date: examDate,
        topics,
        daily_study_hours: dailyStudyHours,
        ...(textbook.trim() ? { textbook: textbook.trim() } : {}),
      };

      const data = await generatePlan(payload);
      navigate(`/planner/${data.course_id}`);
    } catch (err: any) {
      setError(err?.message || "Failed to generate plan");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8FAFC] via-[#F1F5F9] to-[#E0E7FF]">
      <div className="px-6 pt-6">
        <Button onClick={() => navigate("/")}>Back</Button>
      </div>

      <main className="mx-auto max-w-[900px] px-6 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-slate-900">Create Study Plan</h1>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="block">
              <span className="text-sm font-medium text-slate-700">
                Course name
              </span>
              <input
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. Organic Chemistry"
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-slate-700">
                Exam date
              </span>
              <input
                type="date"
                value={examDate}
                onChange={(e) => setExamDate(e.target.value)}
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-slate-700">
                Daily study hours
              </span>
              <input
                type="number"
                min={0}
                step={0.5}
                value={dailyStudyHours}
                onChange={(e) => setDailyStudyHours(Number(e.target.value))}
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-slate-700">
                Textbook (optional)
              </span>
              <input
                value={textbook}
                onChange={(e) => setTextbook(e.target.value)}
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. Campbell Biology"
              />
            </label>

            <label className="block md:col-span-2">
              <span className="text-sm font-medium text-slate-700">
                Topics (comma or newline separated)
              </span>
              <textarea
                value={topicsText}
                onChange={(e) => setTopicsText(e.target.value)}
                className="mt-1 w-full min-h-28 rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={"Limits, Derivatives, Integrals\nSeries\nOptimization"}
              />
            </label>
          </div>

          <div className="mt-5 flex items-center gap-3">
            <button
              type="button"
              onClick={onGenerate}
              disabled={loading}
              className="inline-flex items-center rounded-md px-4 py-2 text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60"
            >
              {loading ? "Generating..." : "Generate"}
            </button>

            {error ? <p className="text-sm text-red-600">{error}</p> : null}
          </div>
        </div>
      </main>
    </div>
  );
}
