import React from 'react'

export default function Child({parentToChildItem}) {
    return (
        <div>
            {parentToChildItem}
        </div>
    )
}