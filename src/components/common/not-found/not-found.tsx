import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="grid h-full place-content-center bg-white px-4">
      <div className="text-center">
        <h1 className="text-9xl font-black text-primary">404</h1>
        <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Sorry!
        </p>
        <p className="mt-4 mb-4">{`We can't find that page.`}</p>
        <Button variant="default" asChild>
          <Link href="/">Go back home</Link>
        </Button>
      </div>
    </div>
  );
}
