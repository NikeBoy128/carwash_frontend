import LoginForm from "@/components/login";
import Image from "next/image";
export default function Home() {
  return (
    <div className="flex h-screen">
      <div className="w-1/2  flex items-center justify-center bg-blue-950">
        <Image
          src="/logo.webp"
          width={500}
          height={500}
          alt="Picture of the author"
        />
      </div>
      <div className="w-1/2 flex items-center justify-center">
        <LoginForm />
      </div>
    </div>
  );
}
