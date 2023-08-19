import { LOGOTEXT } from '@/src/constants';
import Link from 'next/link';
import React from 'react'

const Logo = () => {
  return (
    <Link href="/" className="font-bold text-xl">{LOGOTEXT}</Link>
  )
}

export default Logo;