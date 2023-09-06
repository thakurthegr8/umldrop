import React from 'react'
import Link from 'next/link';
import styles from "./Logo.module.css";
import { LOGOTEXT } from '@/src/constants';

const Logo = () => {
  return (
    <Link href="/" className={styles.logo}>🧑‍🎨️{LOGOTEXT}</Link>
  )
}

export default Logo;