class APIFeatures {
  constructor(query, queryStr) {
    (this.query = query), (this.queryStr = queryStr);
  }
  // search(){
  //     const keyword = this.queryStr.keyword ? {
  //         first_name:{
  //             $regex:this.queryStr.keyword,
  //             $options:'i'
  //         }

  //     } :{}

  //     this.query = this.query.find({...keyword})

  //     return this;
  // }

  search() {
    const keyword = {};

    if (this.queryStr.keyword) {
      const nameRegex = new RegExp(this.queryStr.keyword, "i");
      keyword.$or = [
        { first_name: { $regex: nameRegex } },
        { last_name: { $regex: nameRegex } },
    ];  
    }

    this.query = this.query.find(keyword);

    return this;
  }

  filter() {
    const queryCopy = { ...this.queryStr };
    const removeFields = ["keyword", "limit", "page"];
    removeFields.forEach((element) => delete queryCopy[element]);

    this.query = this.query.find(queryCopy);

    return this;
  }

  pagination(resPerPage) {
    const currentPage = Number(this.queryStr.page) || 1;
    const skip = resPerPage * (currentPage - 1);

    this.query = this.query.limit(resPerPage).skip(skip);
    return this;
  }
}

module.exports = APIFeatures;
