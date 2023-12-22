import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'

import './index.css'

class FiltersGroup extends Component {
  render() {
    const {
      categoryOptions,
      ratingsList,
      getProducts,
      selectedCategory,
      selectedRating,
      searchInput,
      changeCategory,
      changeRating,
      changeSearchInput,
      clearAllFilters,
    } = this.props

    return (
      <div className="filters-group-container">
        {/* Replace this element with your code */}
        <form
          onSubmit={e => {
            e.preventDefault()
            getProducts()
          }}
          className="search-input-container d-flex align-items-center mr-2 my-4"
        >
          <input
            type="search"
            className="search-input flex-grow"
            placeholder="Search"
            value={searchInput}
            onChange={e => changeSearchInput(e.target.value)}
          />
          <button type="submit" aria-label="Search" className="search-btn">
            <BsSearch />
          </button>
        </form>

        <h6 className="filter-title p-0 pt-4 pt-md-0">Category</h6>
        <ul className="list-container">
          {categoryOptions.map(option => (
            <li
              key={option.categoryId}
              className={`category-option ${
                option.categoryId === selectedCategory
                  ? 'category-selected'
                  : ''
              }`}
              onClick={() => changeCategory(option.categoryId)}
            >
              <p>{option.name}</p>
            </li>
          ))}
        </ul>
        <h6 className="filter-title p-0">Rating</h6>
        <ul className="list-container">
          {ratingsList.map(ratingItem => (
            <li
              key={ratingItem.ratingId}
              className={`rating-item ${
                ratingItem.ratingId === selectedRating
                  ? 'selected-rating-item'
                  : ''
              } d-flex align-items-center my-3`}
              onClick={() => changeRating(ratingItem.ratingId)}
            >
              <img
                src={ratingItem.imageUrl}
                className="rating-filter-img"
                alt={`rating ${ratingItem.ratingId}`}
              />
              <p className="p-0 m-0">&up</p>
            </li>
          ))}
        </ul>
        <button
          type="button"
          className="btn btn-outline-primary my-4"
          onClick={clearAllFilters}
        >
          Clear Filters
        </button>
      </div>
    )
  }
}
export default FiltersGroup
