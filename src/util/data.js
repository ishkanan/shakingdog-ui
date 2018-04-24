
import _ from "lodash"


export const coalesce = (value, def) => (!_.isNil(value) ? value : def)

export const isNilOrEmptyString = (value) => _.isNil(value) || value === ""

export const uuidv4 = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == "x" ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

// (admin) returns the selected dog entry OR the new dog entry
export const whichDog = (dogs, stateSection) => {
  const ret = stateSection.get("mode") === "search" ?
    dogs.find(d => d.get("id") === stateSection.get("selected")) :
    stateSection.get("dog")
  return ret
}
