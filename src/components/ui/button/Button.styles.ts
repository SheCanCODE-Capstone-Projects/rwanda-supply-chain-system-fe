import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  `
  inline-flex
  items-center
  justify-center
  rounded-xl
  font-medium
  transition-all
  duration-200
  disabled:pointer-events-none
  disabled:opacity-50
  `,
  {
    variants: {
      variant: {
        primary:
          "bg-[#0B6B2E] text-white hover:bg-[#095925]",

        secondary:
          "border border-gray-300 bg-white hover:bg-gray-50",

        ghost:
          "hover:bg-gray-100",

        danger:
          "bg-red-600 text-white hover:bg-red-700",
      },

      size: {
        sm: "h-9 px-3 text-sm",

        md:
          "h-11 px-5",

        lg:
          "h-12 px-7 text-lg",
      },
    },

    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);