import React, { useEffect, useState } from 'react'
import '../App.css';
import ReactPaginate from 'react-paginate';

const Quotes = () => {
    const [quote, setquote] = useState([]);
    const [pageNo, setpageNo] = useState(0)

    const userperpage = 6
    const pagesvisted = pageNo * userperpage

    const pageCount = Math.ceil(quote.length / userperpage);

    const changePage = (event) => {
        setpageNo(event.selected)
    }

    const getquote = async () => {
        const response = await fetch(`https://dummyjson.com/quotes`);

        const data = await response.json();

        setquote(data.quotes);
    };
    useEffect(() => {
        getquote();
    }, []);

    return (
        <div>
            <div className="container grid-container mb-5">
                {quote.slice(pagesvisted, pagesvisted + userperpage).map((data) => {
                    return (
                        <div className="grid-item" key={data.id}>
                            <div className="m-3">
                                <div className="mb-5"><b>{data.quote}</b></div>
                                <div className="mt-5">~<i>{data.author}</i></div>
                            </div>
                        </div>
                    );
                })}
            </div>
            <ReactPaginate
                previousLabel="< previous"
                nextLabel="next >"
                pageCount={pageCount}
                onPageChange={changePage}
                containerClassName="paginationBttns"
                disabledClassName='paginationDisabled'
                activeClassName='paginationActive'
            />
        </div>
    )
}

export default Quotes