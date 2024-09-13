"use client";

import { signIn, signOut, useSession } from 'next-auth/react';
import React, { useState } from 'react';
import axios from 'axios';
import Image from 'next/image';

const Dashboard = () => {

    const { data: session } = useSession();

    const [fullName, setFullName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [gender, setGender] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);


    const handleSignupClick = async () => {
        try {
            const signupResponse = await axios.post('http://localhost:5000/api/auth/signup', {
                fullName,
                username,
                password,
                confirmPassword,
                gender,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (signupResponse.status === 201) {
                alert('Cadastro criado com sucesso!');

                const loginResponse = await axios.post('http://localhost:5000/api/auth/login', {
                    username,
                    password,
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (loginResponse.status === 200) {
                    alert('Login bem-sucedido!');
                    // Aqui você pode lidar com a sessão ou redirecionar o usuário conforme necessário
                } else {
                    alert('Falha ao fazer login.');
                }

                // Limpa os campos do formulário e fecha o modal
                setFullName('');
                setUsername('');
                setPassword('');
                setConfirmPassword('');
                setGender('');
                setIsModalOpen(false);
            } else {
                alert('Falha ao criar cadastro.');
            }
        } catch (error) {
            console.error('Erro:', error);
            alert('Erro ao criar cadastro ou fazer login.');
        }
    };
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleSignupClick();
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="flex">
                <Image
                    src="/pikachu.png"
                    alt="Pikachu"
                    width={200}
                    height={200}
                />
            </div>
            {session ? (
                <>
                    {session.user?.image && typeof session.user.image === 'string' ? (
                        <img
                            src={session.user.image}
                            className="rounded-full h-20 w-20 mt-10"
                            alt="User Image"
                        />
                    ) : (
                        <div className="rounded-full h-20 w-20 mt-10 bg-gray-300 flex items-center justify-center text-white">
                            No Image
                        </div>
                    )}
                    <h1 className="text-3xl text-green-500 font-bold">
                        Welcome back, {session.user?.name}
                    </h1>
                    <p className="text-2xl font-semibold">{session.user?.email}</p>
                    <button
                        onClick={() => signOut({ callbackUrl: "/" })}
                        className="border border-black rounded-lg bg-red-400 px-5 py-1"
                    >
                        Sair ❌
                    </button>
                </>
            ) : (
                <div className="flex flex-col items-center space-y-5 mt-10">
                    <h1 className="text-3xl text-red-500 font-bold">
                        Você não está logado ainda ...
                    </h1>
                    <button
                        onClick={() => signIn("google")}
                        className="border border-black rounded-lg bg-blue-400 px-5 py-1"
                    >
                        Entrar com Google 💻
                    </button>
                    <button
                        onClick={() => signIn("github")}
                        className="border border-black rounded-lg bg-green-400 px-5 py-1"
                    >
                        Entrar com GitHub 🖥️
                    </button>
                </div>
            )}
            <div className="mt-5">
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="border border-black rounded-lg bg-purple-400 px-5 py-2 text-white"
                >
                    Novo Cadastro 📝
                </button>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                        <h2 className="text-2xl font-bold mb-4">Novo Cadastro</h2>
                        <form
                            onSubmit={handleSubmit}
                            className="flex flex-col space-y-4"
                        >
                            <div>
                                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                                    Nome Completo
                                </label>
                                <input
                                    id="fullName"
                                    type="text"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    placeholder="Nome Completo"
                                    className="border border-gray-300 rounded-lg px-4 py-2 w-full mt-1"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                                    Nome de Usuário
                                </label>
                                <input
                                    id="username"
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="Nome de Usuário"
                                    className="border border-gray-300 rounded-lg px-4 py-2 w-full mt-1"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Senha
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Senha"
                                    className="border border-gray-300 rounded-lg px-4 py-2 w-full mt-1"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                                    Confirmar Senha
                                </label>
                                <input
                                    id="confirmPassword"
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Confirmar Senha"
                                    className="border border-gray-300 rounded-lg px-4 py-2 w-full mt-1"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                                    Gênero
                                </label>
                                <select
                                    id="gender"
                                    value={gender}
                                    onChange={(e) => setGender(e.target.value)}
                                    className="border border-gray-300 rounded-lg px-4 py-2 w-full mt-1"
                                    required
                                >
                                    <option value="">Selecione o Gênero</option>
                                    <option value="male">Masculino</option>
                                    <option value="female">Feminino</option>
                                    <option value="other">Outro</option>
                                </select>
                            </div>
                            <button
                                type="submit"
                                className="border border-black rounded-lg bg-purple-400 px-5 py-2 text-white mt-4"
                            >
                                Criar Cadastro 📝
                            </button>
                        </form>
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="mt-4 px-4 py-2 bg-gray-200 rounded-lg"
                        >
                            Fechar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
