import axios from "axios";
import { useState } from "react";



function ForgotPassword() {

    const [email, setEmail] = useState("");
    const [question, setQuestion] = useState([]);
    const [questionId, setQuestionId] = useState("");
    const [answer, setAnswer] = useState("");

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [step, setStep] = useState("EMAIL");

    //  Submit Email
    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const res = await axios.post("/auth/forgot-password", {
                email,
            });

            setQuestion(res.data.questions);
            setStep("QUESTION");
        }
        catch(err){
            console.log(err);
            alert("Email not found")
        }
    };

     // -------- VERIFY ANSWER --------
    const handleVerifyAnswer = async () => {
        try {
        await axios.post("/auth/verify-security-answer", {
            email,
            questionId,
            answer,
        });
        setStep("RESET");
        } catch {
        alert("Incorrect answer");
        }
    };

    return (
        <div className="container mt-5" style={{maxWidth: "400px"}}>
            <h3 className="text-center mb-3">Forgot Password</h3>

            {/* Email */}
            {step === "EMAIL" && (
                <form onSubmit={handleSubmit}>
                    <label className="from-label">Registered Email</label>
                    <input 
                        type="email"
                        className="from-control mb-3"
                        placeholder="Enter registered email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <button className="btn btn-dark w-100">
                        Submit
                    </button>
                </form>
            )}

            {/* Secirity Question */}
            { step === "QUESTION" && (
                <>
                    <select
                        className="from-select mb-3"
                        value={questionId}
                        onChange={(e) => setQuestionId(e.target.value)}
                        required
                    >
                        <option value="">Select Security Question</option>
                        {question.map((q) => (
                            <option key={q.id} value={q.id}>
                                {q.question}
                            </option>
                        ))}
                    </select>

                    <input
                        type="text"
                        className="form-control mb-3"
                        placeholder="Enter your answer"
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        required
                    />

                    <button className="btn btn-primary w-100">
                        Verify Answer
                    </button>
                </>
            )}

            {/* RESET PASSWORD */}
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

                <button className="btn btn-success w-100">
                    Reset Password
                </button>
                </>
            )}

        </div>
    )
}

export default ForgotPassword;