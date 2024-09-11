"use client"

import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type FormValues = {
    email: string;
    password: string;
};

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        setError(null);

        const response = await fetch('/api/auth/signup', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' },
        });

        const responseData = await response.json();

        if (!response.ok) {
            setError(responseData.message || 'Algo deu errado!');
            return;
        }
        router.replace('/search');
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4 p-4 max-w-md mx-auto">
            <div className="flex flex-col">
                <label htmlFor="email" className="mb-1 font-semibold">Email</label>
                <input
                    id="email"
                    type="email"
                    {...register('email', { required: 'O email é obrigatório' })}
                    className={`border p-2 rounded ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.email && <p className="text-red-500">{errors.email.message}</p>}
            </div>

            <div className="flex flex-col">
                <label htmlFor="password" className="mb-1 font-semibold">Senha</label>
                <input
                    id="password"
                    type="password"
                    {...register('password', { required: 'A senha é obrigatória', minLength: { value: 7, message: 'A senha deve ter pelo menos 7 caracteres' } })}
                    className={`border p-2 rounded ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.password && <p className="text-red-500">{errors.password.message}</p>}
            </div>

            {error && <p className="text-red-500">{error}</p>}

            <button type="submit" className="bg-blue-500 text-white p-2 rounded mt-4 hover:bg-blue-600">
                Registrar
            </button>
        </form>
    );


}


export default Register;
