import Navbar from "@/components/Navbar";

// app/services/layout.js
export default function services({ children }) {
  return (
    <div>
      {/* shared sidebar/header for all services pages */}
      <main>
        <Navbar/>
        {children}  {/* <-- This is the Outlet! */}
      </main>
    </div>
  );
}
