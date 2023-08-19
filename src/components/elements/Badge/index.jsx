import React from 'react'
import Layout from '../../utils/Layout'
import Typography from '../../utils/Typography'

const Badge = (props) => {
    if (props?.type === "hard")
        return (
            <Typography.Body className="text-red-200 bg-red-500/50 border border-red-500 rounded-full px-2 py-1 text-sm">{props.children}</Typography.Body>
        )
    if (props?.type === "medium")
        return (
            <Typography.Body className="text-yellow-200 bg-yellow-500/50 border border-yellow-500 rounded-full px-2 py-1 text-sm">{props.children}</Typography.Body>
        )
        if (props?.type === "easy")
        return (
            <Typography.Body className="text-green-200 bg-green-500/50 border border-green-500 rounded-full px-2 py-1 text-sm">{props.children}</Typography.Body>
        )
    return <Typography.Body className="text-white bg-dark_secondary/50 border border-dark_secondary rounded-full px-2 py-1 text-sm">{props.children}</Typography.Body>
}

export default Badge