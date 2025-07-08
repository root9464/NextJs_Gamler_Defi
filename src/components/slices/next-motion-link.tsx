import type { MotionProps } from 'framer-motion';
import { motion } from 'framer-motion';
import type { LinkProps } from 'next/link';
import Link from 'next/link';
import type React from 'react';
import { forwardRef } from 'react';

type MotionLinkProps = LinkProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> &
  MotionProps & {
    children: React.ReactNode;
  };

const MotionLink = forwardRef<HTMLAnchorElement, MotionLinkProps>(
  ({ href, as, replace, scroll, shallow, prefetch, passHref, onMouseEnter, onTouchStart, onClick, ...rest }, ref) => {
    return (
      <Link href={href} as={as} replace={replace} scroll={scroll} shallow={shallow} prefetch={prefetch} passHref={passHref}>
        <motion.a ref={ref} onMouseEnter={onMouseEnter} onTouchStart={onTouchStart} onClick={onClick} {...rest} />
      </Link>
    );
  },
);

MotionLink.displayName = 'MotionLink';

export default MotionLink;
