import { Header } from "./Header/Header";

interface LayoutProps {
    children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
    return (
        <div className="min-h-screen">
            <Header />
            <main className="flex justify-center w-full h-full px-4 pt-8 md:px-20">
                {children}
            </main>
            <footer className="my-20" />
        </div>
    )
}
