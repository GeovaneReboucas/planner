import { ComponentProps, ElementType } from "react";
import { tv, VariantProps } from "tailwind-variants";

const inputVariants = tv({
  base: 'h-14 px-4 border rounded-lg flex items-center gap-2',

  variants: {
    variant: {
      primary: 'bg-zinc-950 border-zinc-800',
      transparent: 'border-transparent',
    },
  },

  defaultVariants: {
    variant: 'primary',
  }
})

interface InputProps extends ComponentProps<'input'>, VariantProps<typeof inputVariants> {
  icon?: ElementType;
}

export function Input({ variant, icon: Icon, ...rest }: InputProps) {
  return (
    <div className={inputVariants({ variant })}>
      {Icon && (
        <label htmlFor={rest.id}>
          <Icon className="size-5 text-zinc-400" />
        </label>
      )}
      <input
        className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
        {...rest}
      />
    </div>
  );
}
