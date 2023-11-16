"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    if (data.password !== data.confirmPassword) {
      return alert("Password and confirm password must match");
    }
    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({
        username: data.username,
        email: data.email,
        password: data.password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const resJSON = await res.json();
    console.log(resJSON);

    if (res.ok) {
      router.push("/auth/login");
    }
  });

  console.log(errors);
  return (
    <>
      <div className='h-[calc(100vh-7rem)] flex justify-center items-center'>
        <form onSubmit={onSubmit} className='w-1/4'>
          <h1 className='text-slate-200 font-bold text-4xl mb-4'>Register</h1>

          <label
            htmlFor='username'
            className='text-slate-500 mb-2 block text-sm'
          >
            Username{" "}
          </label>
          <input
            {...register("username", {
              required: { value: true, message: "Username is required" },
            })}
            type='text'
            className='p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full'
            placeholder='Enter your username'
          />
          {errors.username && (
            <span className='text-red-500 text-xs'>
              {errors.username.message as string}
            </span>
          )}

          <label htmlFor='email' className='text-slate-500 mb-2 block text-sm'>
            Email{" "}
          </label>
          <input
            {...register("email", {
              required: {
                value: true,
                message: "Email is required",
              },
            })}
            type='email'
            className='p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full'
            placeholder='Enter your email'
          />
          {errors.email && (
            <span className='text-red-500 text-xs'>
              {errors.email.message as string}
            </span>
          )}
          <label
            htmlFor='Password'
            className='text-slate-500 mb-2 block text-sm'
          >
            Password{" "}
          </label>
          <input
            {...register("password", {
              required: {
                value: true,
                message: "Password is required",
              },
            })}
            type='password'
            className='p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full'
            placeholder='Enter your password'
          />
          {errors.password && (
            <span className='text-red-500 text-xs'>
              {errors.password.message as string}
            </span>
          )}
          <label
            htmlFor='Password'
            className='text-slate-500 mb-2 block text-sm'
          >
            Confirm password{" "}
          </label>
          <input
            {...register("confirmPassword", {
              required: {
                value: true,
                message: "Confirm password is required",
              },
            })}
            type='password'
            className='p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full'
            placeholder='Confirm your password'
          />
          {errors.confirmPassword && (
            <span className='text-red-500 text-xs'>
              {errors.confirmPassword.message as string}
            </span>
          )}
          <button className='w-full bg-blue-500 text-white p-3 rounded-lg mt-4'>
            Register
          </button>
        </form>
      </div>
    </>
  );
}
