import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useState } from 'react';

type FormValues = {
    email: string;
    password: string;
};

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();


}


export default Register;
