import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useStore } from '../store/store';

interface FormReactHookFormProps {
  onClose?: () => void;
}

const schema = z.object({
  name: z.string().nonempty('Name is required'),
  age: z.number().min(18, 'You must be at least 18'),
  email: z.string().email('Invalid email').nonempty('Email is required'),
});

type FormData = z.infer<typeof schema>;

const FormReactHookForm: React.FC<FormReactHookFormProps> = ({ onClose }) => {
  const addEntry = useStore((state) => state.addEntry);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
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
