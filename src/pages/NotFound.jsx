import { Seo } from "@/components/Seo";
import { Button } from "@/components/Button";

/*
  NotFound — 404 route. No data files / no schemas.
  Instruction: build the Monday agency marketing site.
*/

export default function NotFound() {
  return (
    <>
      <Seo
        title="Page not found | Monday"
        description="The page you are looking for could not be found."
        path="/404"
      />
      <section className="flex min-h-[70vh] items-center py-32">
        <div className="container-x text-center">
          <p className="font-mono text-sm uppercase tracking-[0.12em] text-primary">
            Error 404
          </p>
          <h1 className="mx-auto mt-5 max-w-xl text-balance text-4xl font-semibold tracking-[-0.045em] md:text-6xl">
            This page took the day off.
          </h1>
          <p className="mx-auto mt-5 max-w-md text-pretty text-muted">
            The link may be old or the page may have moved. Let us get you back
            on track.
          </p>
          <div className="mt-8 flex justify-center">
            <Button to="/" size="lg">
              Back to home
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
