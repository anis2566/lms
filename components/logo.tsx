import Image from "next/image";
import Link from "next/link";

interface LogoProps {
    callbackUrl: string;
}

export const Logo = ({ callbackUrl }: LogoProps) => {
    return (
        <Link href={callbackUrl} className="flex items-center gap-2">
            <Image
                src="/logo.svg"
                alt="Logo"
                width={40}
                height={40}
            />
            <span className="text-xl font-semibold">LMS</span>
        </Link>
    )
}