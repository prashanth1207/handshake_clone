const Sequelize = require('sequelize');

const searchableQuery = (queryObject) => {
  let searchableQuery = {};
  if(queryObject){
    for(let [column_name,column_value] of Object.entries(queryObject)){
      if(column_value.length > 0){
        searchableQuery[column_name] = {
          [Sequelize.Op.like]: `%${column_value}%`
        }
      }
    }
  }
  return searchableQuery
}

module.exports.searchableQuery = searchableQuery;