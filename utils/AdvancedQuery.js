const { omit } = require('lodash');

class AdvancedQuery {
  constructor(model, queryString, query) {
    this.model = model;
    this.query = query;
    this.queryString = queryString;
    this.originalQueryString = queryString;
  }

  filter() {
    const queryBody = omit(this.query, ['select', 'sort', 'limit', 'page']);

    // CREATES QUERY STRING
    let strignifiedQuery = JSON.stringify(queryBody);

    // CREATE OPERATORS LIKE $LTE, %LT
    strignifiedQuery = strignifiedQuery.replace(
      /\b(gt|gte|lt|lte|in|regex)\b/g,
      (match) => `$${match}`
    );

    this.queryString = this.queryString.find(JSON.parse(strignifiedQuery));

    return this;
  }

  // Select Specific fields from the body of data
  select(prefixedRemovedFilter = []) {
    if (this.query.select) {
      let queryFields = this.query.select.split(/[\s,]+/);

      // Ignores accessing private fields
      queryFields = queryFields.filter(
        (queryField) => !prefixedRemovedFilter.includes(queryField)
      );

      prefixedRemovedFilter = prefixedRemovedFilter
        .map((field) => `-${field}`)
        .join(' ');
      queryFields =
        queryFields.length == 0 ? prefixedRemovedFilter : queryFields.join(' ');
      this.queryString = this.queryString.select(queryFields);
    } else {
      // Ignores accessing private fields if no selection is provided

      prefixedRemovedFilter = prefixedRemovedFilter
        .map((field) => `-${field}`)
        .join(' ');

      this.queryString = this.queryString.select(prefixedRemovedFilter);
    }

    return this;
  }

  sort() {
    if (this.query.sort) {
      const sortingFields = this.query.sort.split(',').join(' ');
      this.queryString = this.queryString.sort(sortingFields);
    }

    return this;
  }

  async paginate(autoPaginate) {
    if (this.query.page || this.query.limit || autoPaginate) {
      const limit = parseInt(this.query.limit) || 10;
      const page = parseInt(this.query.page) || 1;
      const startIndex = (page - 1) * limit;
      const lastIndex = page * limit;
      //const total = await this.model.countDocuments();
      const que = await this.originalQueryString;
      const total = que.length;
      const totalPages = Math.ceil(total / limit);

      this.pagination = {
        page,
        limit,
        totalDoucements: total,
        totalPages
      };

      if (startIndex > 0) {
        this.pagination.prev = page - 1;
      }

      if (lastIndex < total) {
        this.pagination.next = page + 1;
      }

      this.queryString = this.queryString.limit(limit).skip(startIndex);
    }

    return this;
  }

  populate(populationData) {
    this.queryString = this.queryString.populate(populationData);
    return this;
  }

  async getResults() {
    const data = await this.queryString;
    return {
      pagination: this.pagination,
      count: data.length,
      data,
    };
  }
}

module.exports = AdvancedQuery;
