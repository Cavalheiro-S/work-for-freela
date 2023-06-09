import { Button } from "@/components/Button";
import { Form } from "@/components/Form/Form";
import { Input } from "@/components/Input";
import { Loading } from "@/components/Loading";
import { useAuth } from "@/hooks/useAuth";
import { Envelope, Lock, WarningCircle } from "@phosphor-icons/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface Inputs {
    email: string;
    password: string;
}

export const Signin = () => {

    const { register, handleSubmit, formState: { errors }, setError } = useForm<Inputs>()
    const { signin, loading } = useAuth()
    const navigate = useNavigate()

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        const { error, result } = await signin(data.email, data.password);
        if (result && !error) {
            toast.success("Logado com sucesso!")
            navigate("/")
        }
        else
            setError("root", { message: error.message, type: "manual" })
    }

    return loading ? <Loading /> : (
        <div>
            <Form
                className="justify-center"
                onSubmit={handleSubmit(onSubmit)}
                title="Entrar"
                subtitle="Informe os dados para entrar">
                {errors.root &&
                    (<div className="flex items-center gap-2 p-2 text-white bg-red-400 rounded">
                        <WarningCircle className="w-6 h-6" />
                        {errors.root && errors.root.type === "manual" && errors.root.message}
                    </div>)
                }
                <label htmlFor="">
                    Email
                    <Input.Root fieldError={errors.email}>
                        <Envelope className="w-6 h-6 text-gray-500" />
                        <Input.Input  {...register("email", { required: true })} type="text" placeholder="example@email.com" />
                    </Input.Root>
                    {errors.email && errors.email.type === "required" && <Input.Error>Email inválido</Input.Error>}
                </label>
                <label htmlFor="">
                    Senha
                    <Input.Root fieldError={errors.password}>
                        <Lock className="w-6 h-6 text-gray-500" />
                        <Input.Password {...register("password", { required: true, minLength: 6 })} />
                    </Input.Root>
                    {errors.password && <Input.Error>A senha deve ter no mínimo 6 caracteres</Input.Error>}
                    <Link to="/user/recoverPassword" className="block w-full pt-1 text-sm text-gray-500 hover:underline text-end">Esqueceu a senha?</Link>
                </label>
                <Button type="submit">Entrar</Button>
            </Form>
            <div className="flex flex-col gap-2 mt-2 ">
                {/* <Button aschild={true}
                    className="w-full text-gray-800 bg-white hover:bg-white hover:text-blue-700 hover:border-blue-700">
                    <span onClick={handleGoogleSignin}>
                        <img width={"24px"} height={"24px"} src={GoogleLogo} alt="" />
                        Entrar com o Google
                    </span>
                </Button> */}
                <Link className="block w-full text-sm text-center text-gray-500 hover:underline" to="/user/signup">
                    Não tem uma conta? Crie uma agora!
                </Link>
            </div>

        </div>
    )
}
