
import _ from "lodash"


export const coalesce = (value, def) => (!_.isNil(value) ? value : def)

export const isNilOrEmptyString = (value) => _.isNil(value) || value === ""

export const uuidv4 = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == "x" ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

// returns the selected dog entry OR the new dog entry
// used by "Add New Dog" and "Add New Litter" admin functions
export const whichDog = (dogs, stateSection) => {
  var selectedId = stateSection.get("selected")

  return stateSection.get("mode") === "search" ?
    dogs.find(d => d.get("id") === selectedId) :
    stateSection.get("dog")
}

// returns the (modified) selected dog entry OR the new dog entry
// used by "Record Test Result" admin function
export const whichTestResultDog = (stateSection) => {
  return stateSection.get("mode") === "search" ?
    stateSection.get("selected") :
    stateSection.get("dog")
}
