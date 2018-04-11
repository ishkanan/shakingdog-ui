
import "es6-promise/auto";
import "isomorphic-fetch";
import { Actions } from "flummox";
import moment from "moment";

import { fetchTenants, fetchColumns } from "../../data/api.js";


export default class FilterActions extends Actions {

  constructor() {
    super();

    // support for request cancellation
    this.columnFetchController = null;
  }

  // MultiSelect / SingleInput

  changeOperator(id, operator) {
    return {
      entryId: id,
      operator: operator
    };
  }

  addSelectedValue(id, value) {
    return {
      entryId: id,
      value: value
    };
  }

  changeValue(id, index, value) {
    return {
      entryId: id,
      index: index,
      value: value
    };
  }

  removeSelectedValue(id, index) {
    return {
      entryId: id,
      index: index
    };
  }

  // DynamicEntries

  addEntry() {
    return {};
  }

  changeSelectedColumn(value) {
    return {
      value: value
    };
  }

  removeEntry(id) {
    return {
      entryId: id
    };
  }

  // TenantAndRangePicker

  changeSelectedTenant(value) {
    return {
      value: value
    };
  }

  changeStartDate(value) {
    return {
      value: value
    };
  }

  changeEndDate(value) {
    return {
      value: value
    };
  }

  // index

  async getTenants() {
    return await fetchTenants().promise;
  }

  async getColumns(tenant, minDate, maxDate) {
    // we can always call abort() as it is just ignored if the fetch()
    // call has already completed
    if (this.columnFetchController !== null)
      this.columnFetchController.abort();

    const query = fetchColumns(
      tenant,
      moment(minDate).toISOString(),
      moment(maxDate).toISOString()
    );
    this.columnFetchController = query.aborter;
    return await query.promise;
  }

}
