import { Eye, EyeSlash } from "@phosphor-icons/react";
import { forwardRef, useState } from "react";
import { FieldError } from "react-hook-form";
import { InputAttributes, NumericFormat, NumericFormatProps } from "react-number-format";
import { twMerge } from "tailwind-merge";

interface InputRootProps {
    children: React.ReactNode;
    fieldError?: FieldError;
    className?: string;
}

interface InputErrorProps {
    children: React.ReactNode;
}

const InputRoot = ({ children, className, fieldError }: InputRootProps) => {
    return (
        <div className={
            twMerge("flex items-center px-2 min-h-10 bg-gray-100 rounded border-transparent border-2 focus-within:border-primary focus:ring-0",
                fieldError && "border-red-600",
                className
            )}>
            {children}
        </div>
    )
}

const InputInput = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>((props, ref) => {
    return (
        <input ref={ref} {...props} className={twMerge("flex-1 px-4 py-2 bg-transparent rounded focus:ring-0 border-none outline-none", props.className)} />
    )
})

const InputRadio = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>((props, ref) => {
    return (
        <input ref={ref} {...props} className={twMerge("bg-transparent rounded-full p-2 border text-primary active:text-transparent", props.className)} />
    )
})


const InputTextArea = forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>((props, ref) => {
    return (
        <textarea ref={ref} {...props} className={twMerge("flex-1 px-4 py-2 bg-transparent rounded focus:ring-0 border-none", props.className)} />
    )
})

const InputMoney = forwardRef<HTMLInputElement, InputAttributes>((props, ref) => {

    return (
        <NumericFormat
            thousandSeparator="."
            decimalSeparator=","
            prefix="R$ "
            decimalScale={2}
            allowNegative={false}
            fixedDecimalScale={true}
            getInputRef={ref}
            customInput={InputInput}
            className={twMerge("flex-1 px-4 py-2 bg-transparent rounded focus:ring-0", props.className)}
            {...props as NumericFormatProps}
        />
    )
})

const InputError = ({ children }: InputErrorProps) => {
    return (
        <span className="text-sm text-red-600">
            {children}
        </span>
    )
}

const InputPassword = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>((props, ref) => {

    const [isPasswordVisible, setIsPasswordVisible] = useState(false)

    return (
        <>
            <Input.Input ref={ref} type={isPasswordVisible ? "text" : "password"} placeholder="********" {...props} />
            <div onClick={() => setIsPasswordVisible(!isPasswordVisible)}>
                {isPasswordVisible
                    ? <Eye className="w-6 h-6 text-gray-500" />
                    : <EyeSlash className="w-6 h-6 text-gray-500" />}
            </div>
        </>
    )
})

export const Input = {
    Root: InputRoot,
    Input: InputInput,
    Radio: InputRadio,
    TextArea: InputTextArea,
    Money: InputMoney,
    Error: InputError,
    Password: InputPassword
}
