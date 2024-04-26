import Link from "next/link";
import { Button } from "~/components/ui/button";

export default function Home() {
  return (
    <div className="container relative">
      <div className="mt-32 flex flex-col items-center gap-2">
        <h1 className="mx-auto max-w-[700px] text-balance text-center text-7xl font-bold tracking-tighter">
          Pariez avec vos potes sur des trucs fous !
        </h1>

        {/* <p></p> */}

        <div className="mt-8">
          <Button size="lg">
            <Link href="/bet">Parie maintenant !</Link>
          </Button>
        </div>
      </div>

      <div className="relative mt-12 min-h-[600px] rounded-xl border bg-white p-12 shadow-xl">
        <div className="absolute -z-50 size-48 rounded-full bg-red-800 blur-[200px]" />
        aaa
      </div>
    </div>
  );
}
