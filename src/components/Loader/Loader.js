import { ProgressSpinner } from 'primereact/progressspinner'
import { classNames } from 'primereact/utils'
import React from 'react'

const Loader = ({ loading, querySelector }) => {
    return (
        <div className={classNames('progressSpinner-container', { showSpinner: loading })}
            style={{
                height: document.querySelector(querySelector)?.offsetHeight,
                width: document.querySelector(querySelector)?.offsetWidth
            }}>
            <ProgressSpinner />
        </div>
    )
}

export default Loader;