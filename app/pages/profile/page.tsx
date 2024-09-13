"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const ProfilePage = () => {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    useEffect(() => {
        if (status === "loading") return;

        if (status === "unauthenticated") {
            router.push("/api/auth/signup");
        } else if (session) {

            setName(session.user?.name || "");
            setEmail(session.user?.email || "");
        }
    }, [session, status, router]);

    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        try {
            const response = await fetch("/api/user/update", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, currentPassword, newPassword }),
            });

            if (response.ok) {
                setSuccess("Perfil atualizado com sucesso!");
            } else {
                const errorData = await response.json();
                setError(errorData.message || "Erro ao atualizar perfil.");
            }
        } catch (error) {
            setError("Erro ao atualizar perfil.");
        }
    };

    if (status === "loading") {
        return <p className="text-center text-xl">Carregando...</p>;
    }

    return (
        <div className="max-w-3xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Meu Perfil</h1>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {success && <p className="text-green-500 mb-4">{success}</p>}
            <form onSubmit={handleUpdateProfile} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Nome</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">E-mail</label>
                    <input
                        type="email"
                        value={email}
                        disabled
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Senha Atual</label>
                    <input
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                        placeholder="Deixe em branco se não quiser alterar"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Nova Senha</label>
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                        placeholder="Deixe em branco se não quiser alterar"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
                >
                    Atualizar
                </button>
            </form>
        </div>
    );
};

export default ProfilePage;
