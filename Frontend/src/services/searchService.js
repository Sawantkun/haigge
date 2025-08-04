// Search service to handle search-related API calls
const API_BASE_URL = 'https://fakestoreapi.com/products'

class SearchService {
  // Cache for storing fetched products to avoid repeated API calls
  static productsCache = null
  static categoriesCache = null

  // Fetch all products from API (with caching)
  async getAllProducts() {
    if (SearchService.productsCache) {
      return SearchService.productsCache
    }

    try {
      const response = await fetch(API_BASE_URL)
      if (!response.ok) throw new Error('Failed to fetch products')
      const products = await response.json()

      // Transform API data to match our app structure
      SearchService.productsCache = products.map(product => ({
        id: product.id,
        name: product.title,
        price: product.price,
        originalPrice: product.price * 1.2, // Simulate original price
        image: product.image,
        category: this.mapCategory(product.category),
        brand: this.generateBrand(product.category),
        sizes: this.generateSizes(product.category),
        colors: this.generateColors(),
        rating: product.rating?.rate || 4.0,
        reviewCount: product.rating?.count || 0,
        isNew: Math.random() > 0.7,
        isOnSale: Math.random() > 0.5,
        description: product.description
      }))

      return SearchService.productsCache
    } catch (error) {
      console.error('Error fetching products from API:', error)
      return []
    }
  }

  // Get all categories from API
  async getAllCategories() {
    if (SearchService.categoriesCache) {
      return SearchService.categoriesCache
    }

    try {
      const response = await fetch('https://fakestoreapi.com/products/categories')
      if (!response.ok) throw new Error('Failed to fetch categories')
      const categories = await response.json()

      SearchService.categoriesCache = ['All', ...categories.map(cat => this.mapCategory(cat))]
      return SearchService.categoriesCache
    } catch (error) {
      console.error('Error fetching categories:', error)
      return ['All', 'Electronics', 'Jewelry', 'Men\'s Clothing', 'Women\'s Clothing']
    }
  }

  // Map API categories to our app categories
  mapCategory(apiCategory) {
    const categoryMap = {
      'electronics': 'Electronics',
      'jewelery': 'Jewelry',
      'men\'s clothing': 'Men\'s Clothing',
      'women\'s clothing': 'Women\'s Clothing'
    }
    return categoryMap[apiCategory] || apiCategory
  }

  // Generate realistic brand names based on category
  generateBrand(category) {
    const brands = {
      'Electronics': ['TechCorp', 'DigitalPro', 'ElectroMax', 'GadgetPlus'],
      'Jewelry': ['LuxeGems', 'DiamondCraft', 'GoldenStyle', 'PreciousWear'],
      'Men\'s Clothing': ['StyleMen', 'ClassicWear', 'ModernFit', 'UrbanStyle'],
      'Women\'s Clothing': ['FashionForward', 'ElegantWear', 'StyleCraft', 'ChicBoutique']
    }
    const categoryBrands = brands[category] || ['Generic Brand']
    return categoryBrands[Math.floor(Math.random() * categoryBrands.length)]
  }

  // Generate sizes based on category
  generateSizes(category) {
    if (category === 'Electronics') return ['One Size']
    if (category === 'Jewelry') return ['One Size', 'S', 'M', 'L']
    return ['XS', 'S', 'M', 'L', 'XL']
  }

  generateColors() {
    const allColors = ['Black', 'White', 'Navy', 'Gray', 'Blue', 'Brown', 'Red', 'Green']
    const numColors = Math.floor(Math.random() * 3) + 1
    const shuffled = allColors.sort(() => 0.5 - Math.random())
    return shuffled.slice(0, numColors)
  }

  async getSearchSuggestions(query) {
    try {
      const products = await this.getAllProducts()
      const categories = await this.getAllCategories()

      const productSuggestions = products
        .filter(product => product.name.toLowerCase().includes(query.toLowerCase()))
        .map(product => product.name)
        .slice(0, 4)

      const categorySuggestions = categories
        .filter(category => category.toLowerCase().includes(query.toLowerCase()) && category !== 'All')
        .slice(0, 2)

      const suggestions = [...new Set([...productSuggestions, ...categorySuggestions])]
      return suggestions.slice(0, 6)
    } catch (error) {
      console.error('Error fetching search suggestions:', error)
      return []
    }
  }

  async searchProducts(query, filters = {}, page = 1, limit = 20) {
    try {
      const allProducts = await this.getAllProducts()

      let filteredProducts = allProducts.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase()) ||
        product.brand.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase())
      )

      if (filters.category && filters.category !== 'All') {
        filteredProducts = filteredProducts.filter(product => product.category === filters.category)
      }
      if (filters.brand && filters.brand !== 'All') {
        filteredProducts = filteredProducts.filter(product => product.brand === filters.brand)
      }
      if (filters.color && filters.color !== 'All') {
        filteredProducts = filteredProducts.filter(product => product.colors.includes(filters.color))
      }
      if (filters.size && filters.size !== 'All') {
        filteredProducts = filteredProducts.filter(product => product.sizes.includes(filters.size))
      }
      if (filters.priceRange) {
        filteredProducts = filteredProducts.filter(product => {
          const price = product.price
          switch (filters.priceRange) {
            case 'Under $50': return price < 50
            case '$50-$100': return price >= 50 && price <= 100
            case '$100-$200': return price > 100 && price <= 200
            case 'Over $200': return price > 200
            default: return true
          }
        })
      }

      switch (filters.sortBy) {
        case 'price-low':
          filteredProducts.sort((a, b) => a.price - b.price)
          break
        case 'price-high':
          filteredProducts.sort((a, b) => b.price - a.price)
          break
        case 'rating':
          filteredProducts.sort((a, b) => b.rating - a.rating)
          break
        case 'newest':
          filteredProducts.sort((a, b) => b.isNew - a.isNew)
          break
        default:
          break
      }

      const startIndex = (page - 1) * limit
      const endIndex = startIndex + limit
      const paginatedProducts = filteredProducts.slice(startIndex, endIndex)

      return {
        products: paginatedProducts,
        totalCount: filteredProducts.length,
        page,
        totalPages: Math.ceil(filteredProducts.length / limit)
      }
    } catch (error) {
      console.error('Error searching products:', error)
      return { products: [], totalCount: 0, page: 1, totalPages: 1 }
    }
  }

  async getAllBrands() {
    try {
      const products = await this.getAllProducts()
      const brands = [...new Set(products.map(product => product.brand))]
      return ['All', ...brands.sort()]
    } catch (error) {
      console.error('Error fetching brands:', error)
      return ['All']
    }
  }

  async getPopularSearches() {
    try {
      const products = await this.getAllProducts()
      const categories = await this.getAllCategories()

      // Return popular categories and some product names
      const popularItems = [
        ...categories.filter(cat => cat !== 'All').slice(0, 3),
        ...products.slice(0, 2).map(product => product.name)
      ]

      return popularItems
    } catch (error) {
      console.error('Error fetching popular searches:', error)
      return ['Electronics', 'Jewelry', 'Clothing']
    }
  }

  async saveSearchQuery(query, resultCount) {
    try {
      console.log('Saving search query:', { query, resultCount, timestamp: new Date() })

      /* Uncomment when API is ready:
      await fetch(`${API_BASE_URL}/search/analytics`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query,
          resultCount,
          timestamp: new Date().toISOString()
        })
      })
      */
    } catch (error) {
      console.error('Error saving search query:', error)
    }
  }
}

export default new SearchService()
