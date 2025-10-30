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
        fetch("http://localhost:17500/users/csrf/", {
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
            const res = await fetch("http://localhost:17500/users/login/", {
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
                setMsg(data.error || "Đăng nhập thất bại");
            } else {
                setMsg("Đăng nhập thành công");
                setTimeout(() => {
                    if (typeof onLoginSuccess === "function") {
                        onLoginSuccess();
                    }
                }, 500);
            }
        } catch (err) {
            setMsg("Lỗi mạng, thử lại.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen grid place-items-center bg-gray-50">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-sm bg-white p-6 rounded-2xl shadow"
            >
                <h1 className="text-xl font-semibold mb-4">Đăng nhập</h1>

                <label className="block text-sm mb-1">User ID</label>
                <input
                    className="w-full border rounded-lg px-3 py-2 mb-3"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    autoComplete="username"
                    required
                />

                <label className="block text-sm mb-1">Mật khẩu</label>
                <input
                    className="w-full border rounded-lg px-3 py-2 mb-4"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    required
                />

                <button
                    disabled={loading}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2 disabled:opacity-60"
                >
                    {loading ? "Đang đăng nhập..." : "Đăng nhập"}
                </button>

                {msg && <p className="mt-3 text-sm text-center">{msg}</p>}
            </form>
        </div>
    );
}
