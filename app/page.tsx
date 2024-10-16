<<<<<<< HEAD
import LoginForm from "@/components/login";
import Image from "next/image";
export default function Home() {
  return (
    <div className="flex h-screen">
      <div className="hidden md:flex w-1/2 items-center justify-center bg-black-950">
        <Image
          src="/logo.webp"
          width={500}
          height={500}
          alt="Picture of the author"
        />
      </div>
      <div className="w-full md:w-1/2 flex items-center justify-center">
        <LoginForm />
      </div>
    </div>
=======
//import DashboardPage from "@/app/dashboard/dashboard";

import LoginForm from "./login/page";

//import NewWashPage from "@/components/lavado";



export default function Home() {
  return (

    <LoginForm/>
    
    //<DashboardPage/>
    //<NewWashPage/>
    
>>>>>>> e7b67dfb72ffcbe671dc7f932c4db86eb7efe1dc
  );
}
