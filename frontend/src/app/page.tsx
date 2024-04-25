import Link from "next/link";
import { Button } from "~/components/ui/button";

export default function Home() {
  return (
    <div className="container relative">
      <div className="flex items-center flex-col gap-2 mt-32">
        <h1 className="text-7xl tracking-tighter text-center text-balance max-w-[700px] mx-auto font-bold ">
          Pariez avec vos potes sur des trucs fous !
        </h1>

        {/* <p></p> */}

        <div className="mt-8">
          <Button size="lg">
            <Link href="/bet">Parie maintenant !</Link>
          </Button>
        </div>
      </div>

      <div className="relative bg-white rounded-xl border shadow-xl mt-12 p-12 min-h-[600px]">
        <div className="absolute blur-[200px] -z-50 bg-red-800 rounded-full size-48" />
        aaa
      </div>
    </div>
  );
}
