const pager = async (model, pageNo, count, keyWord) => {
  const page = parseInt(pageNo);
  const limit = parseInt(count);
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  //Model has to pass through this 
  const GetUser = await model
    .find({
      $or: [{ name: { $regex: keyWord } }],
      status:1,
    })
    .limit(limit)
    .skip(startIndex)
    .exec();

  const result = {};
  const totalCount = await model.countDocuments().exec();
  result.totalCount = totalCount;
  result.paginatedData = GetUser;
  return result;
};

module.exports = { pager };
