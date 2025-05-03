// app/(with-navbar)/layout.tsx
import NavBar from "@/components/NavBar";

export default function NavbarLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <NavBar />
      <div className="pt-16 bg-black"> {/* Add padding to account for fixed navbar */}
        {children}
      </div>
    </>
  );
}