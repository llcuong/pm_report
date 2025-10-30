import {useState, useEffect} from "react";

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2)
        return decodeURIComponent(parts.pop().split(";").shift());
    return null;
}

export default function LoginPage({onLoginSuccess}) {
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState("");

    useEffect(() => {
        fetch("/get/users/csrf/", {
            method: "GET",
            credentials: "include",
        }).catch(() => {
        });
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();
        setMsg("");
        setLoading(true);
        try {
            const csrftoken = getCookie("csrftoken");
            const res = await fetch("/post/users/login/", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": csrftoken || "",
                },
                body: JSON.stringify({user_id: userId, password}),
            });
            const data = await res.json();
            if (!res.ok) {
                setMsg(data.error || "Login fail");
            } else {
                setMsg("Login successfully");
                setTimeout(() => {
                    if (typeof onLoginSuccess === "function") {
                        onLoginSuccess();
                    }
                }, 500);
            }
        } catch (err) {
            setMsg("Server Down!");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen grid place-items-center bg-gray-50">
            <form onSubmit={handleSubmit}
                className="w-full max-w-xs bg-white p-6 pb-8 rounded-2xl shadow border border-gray-50">
                <h1 className="text-xl font-semibold mb-4">Login</h1>
                <label className="block text-sm mb-1">UserID</label>
                <input className="w-full border rounded-lg px-3 py-2 mb-3"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    autoComplete="username"
                    required/>

                <label className="block text-sm mb-1">Password</label>
                <input className="w-full border rounded-lg px-3 py-2 mb-4"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    required/>

                <div className="w-full flex justify-center pt-2">
                    <button
                        disabled={loading}
                        className={`${loading ? 'w-[60%]' : 'w-[30%]'} bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2 disabled:opacity-60 transition-all duration-300`}
                    >
                        {loading ? "Moving in..." : "Login"}
                    </button>
                </div>

            </form>
        </div>
    );
}