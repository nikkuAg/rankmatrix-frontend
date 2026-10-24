import Link from 'next/link';

export const AppLink = ({ href, children, ...rest }) => (
  <Link href={href} prefetch={false} {...rest}>
    {children}
  </Link>
);
