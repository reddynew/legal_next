import Link from 'next/link'
export default function NotFound() {
  return (
<div className="flex flex-col justify-center items-center min-h-screen">
          <h1 className="text-3xl font-bold ">404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
       <Link href='/' className="mt-4 text-blue-600 underline hover:text-blue-800">go to home page</Link>
    </div>
  );
}
