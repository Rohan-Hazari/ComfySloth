import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
  PRODUCT_PAGINATION,
  UPDATE_PAGE,
  FILTER_PAGINATION,
  RESET_PAGINATION,
} from "../actions";

const filter_reducer = (state, action) => {
  if (action.type === LOAD_PRODUCTS) {
    let maxPrice = action.payload.map((p) => p.price);
    maxPrice = Math.max(...maxPrice);
    //... spread is used so that javascript doesnt point to the same loaction in memory location this way we just copy payload (not referencing it) and then assign it
    return {
      ...state,
      all_products: [...action.payload],
      filtered_products: [...action.payload],
      filters: { ...state.filters, max_price: maxPrice, price: maxPrice },
    };
  }
  if (action.type === SET_GRIDVIEW) {
    return { ...state, grid_view: true, products_per_page: 9 };
  }
  if (action.type === SET_LISTVIEW) {
    return { ...state, grid_view: false, products_per_page: 6 };
  }
  if (action.type === UPDATE_SORT) {
    return {
      ...state,
      sort: action.payload,
    };
  }

  if (action.type === SORT_PRODUCTS) {
    const { sort, filtered_products } = state;
    // console.log(filtered_products);
    // console.log(state);
    let tempProducts = [...filtered_products];
    if (sort === "price-lowest") {
      tempProducts = tempProducts.sort((a, b) => a.price - b.price);
    }
    if (sort === "price-highest") {
      tempProducts = tempProducts.sort((a, b) => {
        // console.log(b.price - a.price);
        return b.price - a.price;
      });
    }
    if (sort === "name-a") {
      tempProducts = tempProducts.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
    }
    if (sort === "name-z") {
      tempProducts = tempProducts.sort((a, b) => {
        return b.name.localeCompare(a.name);
      });
    }
    // console.log(tempProducts);

    return { ...state, filtered_products: tempProducts };
  }

  if (action.type === UPDATE_FILTERS) {
    const { name, value } = action.payload;
    return { ...state, filters: { ...state.filters, [name]: value } };
  }

  if (action.type === FILTER_PRODUCTS) {
    const { all_products, page_number } = state;
    const { text, category, company, color, price, shipping } = state.filters;
    // console.log(page_number);

    let tempProducts = [...all_products];

    if (text) {
      tempProducts = tempProducts.filter((product) => {
        // return product.name.toLowerCase().startsWith(text);
        // Alternative
        return product.name.toLowerCase().includes(text);
      });
    }
    //category
    if (category !== "all") {
      tempProducts = tempProducts.filter(
        (product) => product.category === category
      );
    }
    //company
    if (company !== "all") {
      tempProducts = tempProducts.filter(
        (product) => product.company === company
      );
    }
    //color
    if (color !== "all") {
      tempProducts = tempProducts.filter((product) => {
        return product.colors.find((c) => c === color);
      });
    }

    //price
    tempProducts = tempProducts.filter((product) => product.price <= price);

    //shipping
    if (shipping) {
      tempProducts = tempProducts.filter(
        (product) => product.shipping === true
      );
    }

    return {
      ...state,
      filtered_products: tempProducts,
    };
  }

  if (action.type === CLEAR_FILTERS) {
    return {
      ...state,
      filters: {
        ...state.filters,
        text: "",
        company: "all",
        category: "all",
        color: "all",
        price: state.filters.max_price,
        shipping: false,
      },
    };
  }

  if (action.type === RESET_PAGINATION) {
    return {
      ...state,
      page_number: 1,
      first_on_page: 0,
    };
  }

  if (action.type === FILTER_PAGINATION) {
    console.log("Page number old =" + state.page_number);
    const updatePageNumber = 1;
    return { ...state, page_number: updatePageNumber };
  }

  if (action.type === PRODUCT_PAGINATION) {
    const { filtered_products, page_number, products_per_page, first_on_page } =
      state;

    // calculate the max page number
    const firstHalfProducts = filtered_products.slice(0, first_on_page);
    const latterHalfProducts = filtered_products.slice(first_on_page);

    let max_page_number =
      Math.ceil(firstHalfProducts.length / products_per_page) +
      Math.ceil(latterHalfProducts.length / products_per_page);

    let newPageNumber =
      Math.ceil(firstHalfProducts.length / products_per_page) + 1;
    console.log("New page number:" + newPageNumber);

    if (max_page_number === 0) {
      max_page_number = 1; // keep page_number above 0. otherwise when there's no product, page number become 0 and stays at 0
    }
    if (page_number > max_page_number) {
      newPageNumber = max_page_number; // update page_number if there isn't that much pages
    }

    // show products are belong to current page
    const paginated_products = filtered_products.slice(
      first_on_page,
      first_on_page + products_per_page
    );
    const firstPage = 1;

    return {
      ...state,
      paginated_products,
      max_page_number,
      products_per_page,
      first_on_page,
      page_number: newPageNumber,
      // page_number: firstPage, Works but keeps the page number as 1 only
    };
  }
  // handle actions when clicked on page number and prev/next button
  // responsible for calculating new page number and new first on page product
  if (action.type === UPDATE_PAGE) {
    const {
      filtered_products,
      page_number,
      max_page_number,
      products_per_page,
      first_on_page,
    } = state;
    let newPageNumber = 0;
    let newFirstOnPage = 0;

    if (action.payload === "prev") {
      newPageNumber = page_number - 1;
      newFirstOnPage = first_on_page - products_per_page;
      if (newFirstOnPage < 0) {
        newFirstOnPage = 0;
      }
      if (page_number < 1) {
        newPageNumber = 1;
      }
    } else if (action.payload === "next") {
      newPageNumber = page_number + 1;
      newFirstOnPage = first_on_page + products_per_page;

      // page may grow
      if (newFirstOnPage > filtered_products.length - 1) {
        newFirstOnPage = first_on_page;
      }

      if (newPageNumber > max_page_number) {
        newPageNumber = max_page_number;
      }
    } else {
      newPageNumber = Number(action.payload); // page number fetched from dataset property is string
      let pageDifference = Number(action.payload) - page_number;
      newFirstOnPage = first_on_page + pageDifference * products_per_page;
      if (newFirstOnPage < 0) {
        newFirstOnPage = 0;
      }
      if (newFirstOnPage > filtered_products.length - 1) {
        newFirstOnPage = first_on_page;
      }
    }
    return {
      ...state,
      page_number: newPageNumber,
      first_on_page: newFirstOnPage,
    };
  }
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default filter_reducer;
