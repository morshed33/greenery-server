/* eslint-disable prefer-const */
import { FilterQuery, Query } from "mongoose"

export class QueryBuilder<T> {
  public query: Record<string, unknown>
  public modelQuery: Query<T[], T>

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.query = query
    this.modelQuery = modelQuery
  }
  search(searchableFields: string[]) {
    let searchTerm = ""

    if (this.query?.searchTerm) {
      searchTerm = this.query.searchTerm as string
    }

    this.modelQuery = this.modelQuery.find({
      $or: searchableFields.map(
        (field) =>
          ({
            [field]: { $regex: searchTerm, $options: "i" },
          }) as FilterQuery<T>,
      ),
    })
    return this
  }
  paginate() {
    let limit: number = Number(this.query?.limit || 10)

    let skip: number = 0

    if (this.query?.page) {
      const page: number = Number(this.query?.page || 1)
      skip = Number((page - 1) * limit)
    }

    this.modelQuery = this.modelQuery.skip(skip).limit(limit)

    return this
  }
  sort() {
    // Default sort field and order
    const defaultSortField = "createdAt"
    const defaultSortOrder = "desc"

    // Extract sortBy value from the query
    let sortField = defaultSortField
    let sortOrder = defaultSortOrder

    // Extracting the sort field and order from client-side input
    if (this.query?.sortBy) {
      const [field, order] = (this.query.sortBy as string).split(" ")

      // If the field is not present in the query, fallback to default
      sortField = field || defaultSortField

      // Validate order: it should be either "asc" or "desc", fallback to defaultSortOrder
      sortOrder = order === "asc" || order === "desc" ? order : defaultSortOrder
    }

    // Construct the sort query string for MongoDB
    const sortBy = sortOrder === "asc" ? sortField : `-${sortField}`

    // Apply sorting to the MongoDB query
    this.modelQuery = this.modelQuery.sort(sortBy)
    return this
  }

  fields() {
    let fields = ""

    if (this.query?.fields) {
      fields = (this.query?.fields as string).split(",").join(" ")
    }

    this.modelQuery = this.modelQuery.select(fields)
    return this
  }
  filter() {
    const queryObj = { ...this.query }
    const excludeFields = ["searchTerm", "page", "limit", "sortBy", "fields"]

    excludeFields.forEach((e) => delete queryObj[e])

    // Handle category filter
    if (queryObj.category === "all" || queryObj.category === "") {
      delete queryObj.category // Remove the category filter if 'all' or empty
    }

    this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>)

    return this
  }
}
