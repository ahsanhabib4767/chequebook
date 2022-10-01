import React, {Component} from 'react';

class Pagination extends Component{
    constructor(props) {
        super(props);

        this.state = {
            currentChunk: 1
        }
        this.lastPage = this.props.pageCount;
        this.pageChangeCb = this.props.changePage;
        this.currentPage = this.props.currentPage;
        this.viewingPageCount = 5;
        this.showingPerPage = 10;


        this.divideIntoChunk = this.divideIntoChunk.bind(this);
        this.previousPage = this.previousPage.bind(this);
        this.nextPage = this.nextPage.bind(this);
        this.generatePageNumber = this.generatePageNumber.bind(this);
        this.divideIntoChunk();
        this.updateChunk = this.updateChunk.bind(this);
        this.deriveClassName = this.deriveClassName.bind(this);
    }

    divideIntoChunk() {
        this.chunkCount = Math.ceil(this.lastPage/this.viewingPageCount);

    }

    updateChunk(pageNumber) {
        for(let i=1; i<=this.chunkCount; i++) {
            if(pageNumber <= i*this.viewingPageCount) {
                return i;
            }
        }
    }

    deriveClassName(pageNumber) {
        if(pageNumber === this.props.currentPage) return 'page-item active';
        else return 'page-item';
    }

    generatePageNumber(pageNumber) {
        let pages = [];
        let viewingChunk = this.updateChunk(pageNumber);
        let currentChunk = viewingChunk-1;
        let start = (currentChunk*this.viewingPageCount)+1;
        let lastPage = (start + (this.viewingPageCount-1));
        let inShort = lastPage - this.lastPage;
        if(inShort > 0) start = start-inShort;
        lastPage = (start + (this.viewingPageCount-1));

        if(start <= 0) {
            start = 1;
            lastPage = this.props.pageCount;
        }

        for(let i=start; i<=lastPage; i++) {
            pages.push(
                <li onClick={() => this.pageChangeCb(i)} key={i} className={this.deriveClassName(i)}>
                    <a className="page-link" href="#">{i}</a>
                </li>
            )
        }

        return pages;
    }

    previousPage() {
        let currentPage = this.props.currentPage;
        currentPage -= 1;
        if(currentPage > 0) {
            this.pageChangeCb(currentPage);
        }
    }

    nextPage() {
        let currentPage = this.props.currentPage;
        currentPage += 1;
        if(currentPage <= this.lastPage) {
            this.pageChangeCb(currentPage);
        }
    }

    render() {
        return (
            <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-center">
                    <li onClick={this.previousPage} className="page-item">
                        <a className="page-link" href="#" tabIndex="-1">Previous</a>
                    </li>
                    {this.generatePageNumber(this.props.currentPage)}
                    <li onClick={this.nextPage} className="page-item">
                        <a className="page-link" href="#">Next</a>
                    </li>
                </ul>
            </nav>
        )
    }

}

export default Pagination;