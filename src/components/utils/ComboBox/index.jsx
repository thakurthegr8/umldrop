import React, { useState } from 'react'
import { Combobox } from '@headlessui/react';
import ChevronUpDownIcon from '@heroicons/react/24/solid/ChevronUpDownIcon';
import Layout from '../Layout';
import Typography from '../Typography';

const CustomComboBox = (props) => {
    const [value, setValue] = useState(props.value);
    const [query, setQuery] = useState("")
    const onChange = (currValue) => {
        setValue(currValue);
        props.onChange(currValue);
    }
    const onInputChange = (e) => {
        setQuery(e.target.value);
    }
    const filteredList = query === '' ? props.list : props.list.filter((item) => item.toLowerCase()
        .replace(/\s+/g, '')
        .includes(query.toLowerCase().replace(/\s+/g, '')));

    return (
        <Combobox value={value} onChange={onChange} as={Layout.Col} className="relative z-10 rounded-md border border-dark_secondary bg-dark_secondary/50 text-sm">
            <Layout.Row className="rounded overflow-hidden justify-between">
                <Combobox.Input  name="combobox_name" placeholder={props.placeholder} className="border-none bg-transparent p-2" displayValue={(item) => item} onChange={onInputChange} />
                <Combobox.Button><ChevronUpDownIcon className='w-6 h-6' /></Combobox.Button>
            </Layout.Row>
            <Combobox.Options onBlur={() => setQuery("")} className="absolute max-h-[200px] overflow-y-scroll top-10 border border-dark_secondary divide-y divide-dark_secondary bg-black overflow-hidden inset-x-0 rounded-md">
                {filteredList.length == 0 && query !== "" ? <Typography.Body>Nothing found</Typography.Body>
                    :
                    filteredList.map((item, index) => <Combobox.Option className="p-2 bg-dark_secondary/50 hover:bg-dark_secondary cursor-pointer" value={item} key={index}>{item}</Combobox.Option>)}

            </Combobox.Options>
        </Combobox>
    )
}

export default CustomComboBox;

CustomComboBox.defaultProps = {
    placeholder: "Combobox placeholder",
    list: ["item 1", "item 2"],
    onChange: () => null,
    value: "query",
}