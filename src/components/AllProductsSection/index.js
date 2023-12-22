import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import FiltersGroup from '../FiltersGroup'
import ProductCard from '../ProductCard'
import ProductsHeader from '../ProductsHeader'

import './index.css'

const categoryOptions = [
  {
    name: 'Clothing',
    categoryId: '1',
  },
  {
    name: 'Electronics',
    categoryId: '2',
  },
  {
    name: 'Appliances',
    categoryId: '3',
  },
  {
    name: 'Grocery',
    categoryId: '4',
  },
  {
    name: 'Toys',
    categoryId: '5',
  },
]

const sortbyOptions = [
  {
    optionId: 'PRICE_HIGH',
    displayText: 'Price (High-Low)',
  },
  {
    optionId: 'PRICE_LOW',
    displayText: 'Price (Low-High)',
  },
]

const ratingsList = [
  {
    ratingId: '4',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-four-stars-img.png',
  },
  {
    ratingId: '3',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-three-stars-img.png',
  },
  {
    ratingId: '2',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-two-stars-img.png',
  },
  {
    ratingId: '1',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-one-star-img.png',
  },
]

const initialFilterValues = {
  optionId: '',
  category: '',
  rating: '',
  search: '',
}

const apiStatusValues = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  pending: 'PENDING',
  noProducts: 'NO_PRODUCTS',
  failure: 'FAILURE',
}

class AllProductsSection extends Component {
  state = {
    productsList: [],
    apiStatus: apiStatusValues.initial,
    activeOptionId: initialFilterValues.optionId,
    selectedCategory: initialFilterValues.category,
    selectedRating: initialFilterValues.rating,
    searchInput: initialFilterValues.search,
  }

  componentDidMount() {
    this.getProducts()
  }

  getProducts = async () => {
    this.setState({
      apiStatus: apiStatusValues.pending,
    })
    const jwtToken = Cookies.get('jwt_token')

    // TODO: Update the code to get products with filters applied

    const {
      activeOptionId,
      selectedCategory,
      selectedRating,
      searchInput,
    } = this.state
    const apiUrl = `https://apis.ccbp.in/products?sort_by=${activeOptionId}&category=${selectedCategory}&title_search=${searchInput}&rating=${selectedRating}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = await fetchedData.products.map(product => ({
        title: product.title,
        brand: product.brand,
        price: product.price,
        id: product.id,
        imageUrl: product.image_url,
        rating: product.rating,
      }))
      this.setState({
        productsList: updatedData,
        apiStatus:
          updatedData.length < 1
            ? apiStatusValues.noProducts
            : apiStatusValues.success,
      })
    } else {
      this.setState({apiStatus: apiStatusValues.failure})
    }
  }

  changeSortby = activeOptionId => {
    this.setState({activeOptionId}, this.getProducts)
  }

  changeCategory = category => {
    this.setState({selectedCategory: category}, this.getProducts)
  }

  changeRating = rating => {
    this.setState({selectedRating: rating}, this.getProducts)
  }

  changeSearchInput = updatedSearch => {
    this.setState({searchInput: updatedSearch})
  }

  clearAllFilters = () => {
    this.setState(
      {
        activeOptionId: initialFilterValues.optionId,
        selectedCategory: initialFilterValues.category,
        selectedRating: initialFilterValues.rating,
        searchInput: initialFilterValues.search,
      },
      this.getProducts,
    )
  }

  renderNoProductsView = () => {
    const {selectedCategory, selectedRating, searchInput} = this.state

    return (
      <div className="d-flex flex-column flex-md-row">
        <FiltersGroup
          categoryOptions={categoryOptions}
          ratingsList={ratingsList}
          getProducts={this.getProducts}
          selectedCategory={selectedCategory}
          selectedRating={selectedRating}
          searchInput={searchInput}
          changeCategory={this.changeCategory}
          changeRating={this.changeRating}
          changeSearchInput={this.changeSearchInput}
          clearAllFilters={this.clearAllFilters}
        />
        <div className="d-flex flex-column align-items-center py-5 mx-auto">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-no-products-view.png"
            alt="no products"
            className="w-50"
          />
          <h2 className="my-3">No Products Found</h2>
          <p className="failure-msg">
            We could not find any products. Try other filters.
          </p>
        </div>
      </div>
    )
  }

  renderFailureView = () => {
    const {selectedCategory, selectedRating, searchInput} = this.state

    return (
      <div className="d-flex flex-column flex-md-row">
        <FiltersGroup
          categoryOptions={categoryOptions}
          ratingsList={ratingsList}
          getProducts={this.getProducts}
          selectedCategory={selectedCategory}
          selectedRating={selectedRating}
          searchInput={searchInput}
          changeCategory={this.changeCategory}
          changeRating={this.changeRating}
          changeSearchInput={this.changeSearchInput}
          clearAllFilters={this.clearAllFilters}
        />
        <div className="d-flex flex-column align-items-center py-5 mx-auto">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png"
            alt="products failure"
            className="w-50"
          />
          <h2 className="my-3">Oops! Something Went Wrong</h2>
          <p className="failure-msg">
            We are having some trouble processing your request. Please try
            again.
          </p>
        </div>
      </div>
    )
  }

  renderProductsList = () => {
    const {
      productsList,
      activeOptionId,
      selectedCategory,
      selectedRating,
      searchInput,
    } = this.state

    // TODO: Add No Products View

    return (
      <div className="d-flex flex-column flex-md-row">
        <FiltersGroup
          categoryOptions={categoryOptions}
          ratingsList={ratingsList}
          getProducts={this.getProducts}
          selectedCategory={selectedCategory}
          selectedRating={selectedRating}
          searchInput={searchInput}
          changeCategory={this.changeCategory}
          changeRating={this.changeRating}
          changeSearchInput={this.changeSearchInput}
          clearAllFilters={this.clearAllFilters}
        />
        <div className="all-products-container">
          <ProductsHeader
            activeOptionId={activeOptionId}
            sortbyOptions={sortbyOptions}
            changeSortby={this.changeSortby}
            getProducts={this.getProducts}
          />

          <ul className="products-list">
            {productsList.map(product => (
              <ProductCard productData={product} key={product.id} />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  renderLoader = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderViews = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusValues.success:
        return this.renderProductsList()
      case apiStatusValues.pending:
        return this.renderLoader()
      case apiStatusValues.noProducts:
        return this.renderNoProductsView()
      case apiStatusValues.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  // TODO: Add failure view

  render() {
    return (
      <div className="all-products-section">
        {/* TODO: Update the below element */}

        {this.renderViews()}
      </div>
    )
  }
}

export default AllProductsSection
