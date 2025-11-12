'use client'; // must be a client component

import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useEffect } from 'react';

interface HashLinkProps {
  to: string;
  children: React.ReactNode;
  offset?: number; // optional offset for sticky headers
  className?: string;
}

export default function HashLink({ to, children, offset = 0, className }: HashLinkProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    const [path, hash] = to.split('#');
    // console.log('to:',to)
    // console.log('pathname:',pathname)
    // console.log(path,hash)

    if(!hash)
      {
        router.push(path)
      }
    

    if (pathname !== path) {
      // Navigate to the correct page first
      router.push(path);
      // console.log('inside the push to ')
      // Wait a tick for navigation to complete
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) {
          const y = el.getBoundingClientRect().top + window.pageYOffset + offset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 100);
    } else {
      // Same page, scroll directly
      const el = document.getElementById(hash);
      if (el) {
        const y = el.getBoundingClientRect().top + window.pageYOffset + offset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  };

  return (
    <Link href={to} onClick={handleClick} className={className}>
      {children}
    </Link>
  );
}
