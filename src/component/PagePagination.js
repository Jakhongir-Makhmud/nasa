import React from 'react'

function PagePagination({ page, setPage,metadata,setMetadata }) {

    const pageInt = parseInt(page);
    let lastPage = parseInt(Math.floor(metadata/100));

    if (lastPage > 100 ) lastPage = 100

    return (
        <div className='pagination'>
            {pageInt === 1 ? null : <button className='prev' onClick={() => setPage(pageInt - 1)} >Prev</button>}

            {pageInt > 6 ? <button onClick={() => setPage(1)}>1</button> : null}

            {pageInt > 5 ? <button>...</button> : null}

            {pageInt > 2 ? <button onClick={() => setPage(pageInt - 2)}>{pageInt - 2}</button> : null}
            {pageInt > 1 ? <button onClick={() => setPage(pageInt - 1)}>{pageInt - 1}</button> : null}
            <button className='currentPage'>{pageInt}</button>
            {pageInt < (lastPage) ? <button onClick={() => setPage(pageInt + 1)}>{pageInt + 1}</button> : null}
            {pageInt < (lastPage - 1) ? <button onClick={() => setPage(pageInt + 2)}>{pageInt + 2}</button> : null}

            {lastPage > 5 && pageInt < (lastPage - 3) ? <button>...</button> : null}

            {pageInt < (lastPage - 4) ? <button onClick={() => setPage(lastPage)} >{lastPage}</button> : null}

            {pageInt === lastPage ? null : <button className='next' onClick={() => setPage(pageInt + 1)}>next</button>}
        </div>
    )
}

export default PagePagination
