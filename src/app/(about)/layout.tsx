import { Navbar } from "@/components/layout/Navbar";

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="relative z-10 min-h-screen">{children}</main>
    </>
  );
}
