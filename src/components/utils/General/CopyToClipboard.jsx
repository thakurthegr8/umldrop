import { toast } from 'react-toastify'
import React, { useState } from 'react'
import Button from '../Button'
import ClipboardIcon from "@heroicons/react/24/outline/ClipboardIcon"
import CheckedIcon from "@heroicons/react/24/outline/CheckIcon"

const CopyToClipboard = (props) => {
    const [copied, setCopied] = useState(false);
    const copy = () => {
        navigator.clipboard.writeText(props?.text);
        toast("copied to clipboard", { type: "success" });
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 2000)
    }
    return (
        <Button onClick={copy} className="btn-icon">{copied ? <CheckedIcon className='w-4 h-4 text-green-500' /> : <ClipboardIcon className='w-4 h-4 text-secondary' />}</Button>
    )
}

export default CopyToClipboard