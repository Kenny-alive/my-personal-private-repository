import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { formSchema } from '../utils/formSchema';
import { useStore } from '../store/store';
import { z } from 'zod';

interface FormReactHookFormProps {
  onClose?: () => void;
}

type FormData = z.infer<typeof formSchema>;

const FormReactHookForm: React.FC<FormReactHookFormProps> = ({ onClose }) => {
  const addEntry = useStore((state) => state.addEntry);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
  });

  const onSubmit = (data: FormData) => {
    const entry = { id: crypto.randomUUID(), ...data };
    addEntry(entry);
    console.log('React Hook Form data:', entry);
    if (onClose) onClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <input
          {...register('name')}
          placeholder="Name"
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-green-300"
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
      </div>
      <div>
        <input
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
        <input
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
        <input
          type="password"
          {...register('password')}
          placeholder="Password"
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-green-300"
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}
      </div>

      <div>
        <input
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
        <label>
          <input type="radio" {...register('gender')} value="male" /> Male
        </label>
        <label>
          <input type="radio" {...register('gender')} value="female" /> Female
        </label>
        <label>
          <input type="radio" {...register('gender')} value="other" /> Other
        </label>
      </div>
      {errors.gender && (
        <p className="text-red-500 text-sm">{errors.gender.message}</p>
      )}

      <div>
        <label>
          <input type="checkbox" {...register('terms')} /> Accept Terms &
          Conditions
        </label>
        {errors.terms && (
          <p className="text-red-500 text-sm">{errors.terms.message}</p>
        )}
      </div>

      <div>
        <input
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
        <input
          type="text"
          {...register('country')}
          placeholder="Country"
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-green-300"
        />
        {errors.country && (
          <p className="text-red-500 text-sm">{errors.country.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
      >
        Submit
      </button>
    </form>
  );
};

export default FormReactHookForm;
