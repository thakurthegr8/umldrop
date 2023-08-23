import { avataaarsNeutral } from '@dicebear/collection'
import { createAvatar } from '@dicebear/core'
import Image from 'next/image'
import React from 'react'

const Avatar = (props) => {
    const avatar = createAvatar(avataaarsNeutral, {
        seed: props.seed,
        backgroundType: ["gradientLinear", "solid"],
        eyes: ["happy"],
        mouth: ["smile"],
        backgroundColor: ["b6e3f4", "c0aede", "d1d4f9"]
    })
    const uri = avatar.toDataUriSync();
    return (
        <Image src={uri} width={32} height={32} className='rounded-full' alt="ace-sql-user"/>
    )
}

export default Avatar;