const SearchCity = ({getInput ,onClickHandler}) => {
    return(
        <div className="searchCity">
        <input
          type="text"
          name="searchCity"
          id="searchCity"
          placeholder="Please provide city name!"
          onChange={getInput}
        />
        <button type="submit" onClick={onClickHandler}>
        <i className="fas fa-search-location"></i>
        </button>
      </div>
    )
}

export default SearchCity