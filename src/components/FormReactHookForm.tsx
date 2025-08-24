import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { formSchema } from '../utils/formSchema';
import { useStore } from '../store/store';
import { z } from 'zod';
import { getPasswordStrength } from '../utils/passwordStrength';

interface FormReactHookFormProps {
  onClose?: () => void;
}

type FormData = z.infer<typeof formSchema>;

const FormReactHookForm: React.FC<FormReactHookFormProps> = ({ onClose }) => {
  const addEntry = useStore((state) => state.addEntry);
  const countries = useStore((state) => state.countries);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
  });

  const [passwordStrength, setPasswordStrength] = useState(0);

  const passwordValue = watch('password');
  useEffect(() => {
    setPasswordStrength(getPasswordStrength(passwordValue || ''));
  }, [passwordValue]);

  const onSubmit = async (data: FormData) => {
    let avatarBase64: string | undefined;
    if (data.avatar?.[0]) {
      avatarBase64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(data.avatar[0]);
      });
    }

    const entry = {
      id: crypto.randomUUID(),
      name: data.name,
      age: data.age,
      email: data.email,
      password: data.password,
      gender: data.gender,
      country: data.country,
      avatar: avatarBase64,
    };
    addEntry(entry);
    reset();
    if (onClose) onClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          {...register('name')}
          placeholder="Name"
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-green-300"
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
      </div>
      <div>
        <label htmlFor="age">Age</label>
        <input
          id="age"
          type="number"
          {...register('age', { valueAsNumber: true })}
          placeholder="Age"
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-green-300"
        />
        {errors.age && (
          <p className="text-red-500 text-sm">{errors.age.message}</p>
        )}
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          {...register('email')}
          type="email"
          placeholder="Email"
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-green-300"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          {...register('password')}
          placeholder="Password"
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-green-300"
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}
        <div className="mt-1 h-2 w-full bg-gray-200 rounded">
          <div
            className={`h-2 rounded transition-all duration-300 ${
              passwordStrength === 0
                ? 'w-0'
                : passwordStrength === 1
                  ? 'w-1/4 bg-red-500'
                  : passwordStrength === 2
                    ? 'w-1/2 bg-yellow-500'
                    : passwordStrength === 3
                      ? 'w-3/4 bg-green-400'
                      : 'w-full bg-green-600'
            }`}
          />
        </div>
        <p className="text-sm mt-1">
          Strength:{' '}
          {
            ['Very Weak', 'Weak', 'Medium', 'Strong', 'Very Strong'][
              passwordStrength
            ]
          }
        </p>
      </div>

      <div>
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          id="confirmPassword"
          type="password"
          {...register('confirmPassword')}
          placeholder="Confirm Password"
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-green-300"
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>
      <div className="flex gap-4">
        <span>Gender</span>
        <label htmlFor="gender-male">
          <input
            id="gender-male"
            type="radio"
            {...register('gender')}
            value="male"
          />{' '}
          Male
        </label>
        <label htmlFor="gender-female">
          <input
            id="gender-female"
            type="radio"
            {...register('gender')}
            value="female"
          />{' '}
          Female
        </label>
        <label htmlFor="gender-other">
          <input
            id="gender-other"
            type="radio"
            {...register('gender')}
            value="other"
          />{' '}
          Decepticon
        </label>
      </div>
      {errors.gender && (
        <p className="text-red-500 text-sm">{errors.gender.message}</p>
      )}

      <div>
        <label htmlFor="terms">
          <input id="terms" type="checkbox" {...register('terms')} /> Accept
          Terms & Conditions
        </label>
        {errors.terms && (
          <p className="text-red-500 text-sm">{errors.terms.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="avatar">Avatar</label>
        <input
          id="avatar"
          type="file"
          {...register('avatar')}
          accept="image/png, image/jpeg"
        />
        <p className="text-red-500 text-sm">
          {typeof errors.avatar?.message === 'string'
            ? errors.avatar.message
            : null}
        </p>
      </div>

      <div>
        <label htmlFor="country">Country</label>
        <input
          id="country"
          type="text"
          {...register('country')}
          placeholder="Country"
          list="country-list"
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-green-300"
        />
        <datalist id="country-list">
          {countries.map((c) => (
            <option key={c} value={c} />
          ))}
        </datalist>
        {errors.country && (
          <p className="text-red-500 text-sm">{errors.country.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={!isValid}
        className={`px-4 py-2 rounded text-white transition
    ${isValid ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-400 cursor-not-allowed'}`}
      >
        Submit
      </button>
    </form>
  );
};

export default FormReactHookForm;
