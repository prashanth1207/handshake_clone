let searchableQuery =  require('./../utility/search').searchableQuery;
let kafka = require('./../kafka/client')


module.exports.show_event = (req, res) => {
  req.params.path = 'show_event';
  kafka.make_request('events',{params: req.params,body: req.body},function(err,result){
    if(result.error){
      res.json({error: 'Record not found'});
    }else{
      res.json(result);
    }
  });
}

module.exports.create_event = (req, res) => {
  req.params.path = 'create_event';
  kafka.make_request('events',{params: req.params,body: req.body},function(err,result){
    if(result.error){
      res.json({
        success: false,
        errror: result.error
      })
    }else{
      res.json({success: true});
    }
  });
}

module.exports.show_all_events_for_student = async (req, res) => {
  req.params.path = 'show_all_events_for_student';
  kafka.make_request('events',{params: req.params,body: req.body, query: req.query},function(err,result){
    if(result){
      res.json(result);
    }else{
      res.json({
        errror: err
      })
    }
  });
}

module.exports.show_all_events_for_company = async (req, res) => {
  req.params.path = 'show_all_events_for_company';
  kafka.make_request('events',{params: req.params,body: req.body, query: req.query},function(err,result){
    if(result){
      res.json(result);
    }else{
      res.json({
        errror: err
      })
    }
  });
}
