"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const payload = {
      username: formData.get("username"),
      password: formData.get("password"),
    };

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      setError("Thông tin đăng nhập không hợp lệ.");
      return;
    }

    router.push("/admin");
  }

  return (
    <div className="mx-auto max-w-md rounded-xl bg-white p-8 shadow-sm">
      <h1 className="text-2xl font-bold">Đăng nhập quản trị</h1>
      <form onSubmit={onSubmit} className="mt-5 space-y-4">
        <input
          name="username"
          required
          placeholder="Tên đăng nhập"
          className="w-full rounded border px-3 py-2"
        />
        <input
          name="password"
          type="password"
          required
          placeholder="Mật khẩu"
          className="w-full rounded border px-3 py-2"
        />
        <button className="w-full rounded bg-sky-700 py-2 text-white">Đăng nhập</button>
      </form>
      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
    </div>
  );
}
