import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function ForgotPassword() {
  const navigate = useNavigate();

  // -------- STATE --------
  const [email, setEmail] = useState("");
  const [questions, setQuestions] = useState([]);
  const [questionId, setQuestionId] = useState();
  const [answer, setAnswer] = useState("");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [step, setStep] = useState("EMAIL");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // -------- STEP 1: SUBMIT EMAIL --------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await api.post("/auth/forgot-password", { email });
      setQuestions(res.data);
      setStep("QUESTION");
    } catch {
      setError("Email not found");
    }
  };

  // -------- STEP 2: VERIFY ANSWER --------
  const handleVerifyAnswer = async () => {
    setError("");
    setSuccess("");

    console.log("Verify button clicked");
    console.log("Sending:", {
      email,
      questionId,
      answer,
    });

    if (!questionId || !answer) {
      setError("Please select question and enter answer");
      return;
    }

    try {
      const res = await api.post("/auth/verify-security-answer", {
        email,
        questionId: Number(questionId),
        answer: answer.trim().toLowerCase(),
      });

      console.log("VERIFY RESPONSE:", res.data);

      if (res.status === 200) {
        setStep("RESET");
      }
    } catch (err) {
      if (err.response?.status === 400) {
        setError("Incorrect security answer");
      } else {
        setError("Server error. Please try again.");
      }
    }
  };

  // -------- STEP 3: RESET PASSWORD --------
  const handleResetPassword = async () => {
    setError("");
    setSuccess("");

    if (!newPassword || !confirmPassword) {
      setError("Please enter password");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await api.post("/auth/reset-password", {
        email,
        newPassword,
      });

      setSuccess("Password reset successful. Redirecting to login...");
      setTimeout(() => navigate("/login"), 1500);
    } catch {
      setError("Failed to reset password");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <h3 className="text-center mb-3">Forgot Password</h3>

      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      {/* STEP 1 */}
      {step === "EMAIL" && (
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Registered Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button className="btn btn-dark w-100">Submit</button>
        </form>
      )}

      {/* STEP 2 */}
      {step === "QUESTION" && (
        <>
          <div className="mb-3">
            <label className="form-label">Security Question</label>
            <select
              className="form-select"
              value={questionId}
              onChange={(e) => setQuestionId(e.target.value)}
            >
              <option value="">Select Security Question</option>
              {questions.map((q) => (
                <option key={q.questionId} value={q.questionId}>
                  {q.question}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Your Answer</label>
            <input
              type="text"
              className="form-control"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            />
          </div>

          <button
            type="button"
            className="btn btn-primary w-100"
            onClick={handleVerifyAnswer}
          >
            Verify Answer
          </button>
        </>
      )}

      {/* STEP 3 */}
      {step === "RESET" && (
        <>
          <div className="mb-3">
            <label className="form-label">New Password</label>
            <input
              type="password"
              className="form-control"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button
            type="button"
            className="btn btn-success w-100"
            onClick={handleResetPassword}
          >
            Reset Password
          </button>
        </>
      )}
    </div>
  );
}

export default ForgotPassword;
