import React from 'react'

const CollectionPage = () => {
    return (
        <div>index</div>
    )
}

export default CollectionPage;

export const getServerSideProps = async (ctx) => {
    console.log(ctx.query)
    return { props: {} }
}