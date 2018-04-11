
import "es6-promise/auto";
import "isomorphic-fetch";
import { Actions } from "flummox";

import { doSearch, fetchRecordCounts } from "../../data/api.js";


export default class SearchActions extends Actions {
  
  constructor() {
    super();
    
    // support for request cancellation
    this.recordCountFetchController = null;
  }

  // SearchControl

  async doSearch(tenant, startDate, endDate, entries) {
    return await doSearch(tenant, startDate, endDate, entries).promise;
  }

  // Filter

  async getRecordCounts(tenant, startDate, endDate, entries) {
    // we can always call abort() as it is just ignored if the fetch()
    // call has already completed
    if (this.recordCountFetchController !== null)
      this.recordCountFetchController.abort();

    var query = fetchRecordCounts(
      tenant,
      startDate,
      endDate,
      entries
    );
    this.recordCountFetchController = query.aborter;
    return await query.promise;
  }

}
