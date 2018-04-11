
import { Actions } from "flummox";


export default class ResultsActions extends Actions {

  // Results

  addListenRow(rowIndex) {
    return {
      rowIndex: rowIndex,
      data: {err: null}
    };
  }

  removeListenRow(rowIndex) {
    return {
      rowIndex: rowIndex
    };
  }

  setListenRowError(rowIndex, err) {
    return {
      rowIndex: rowIndex,
      data: {err: err}
    };
  }

}
