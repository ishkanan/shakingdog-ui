
import _ from "lodash"


export const coalesce = (value, def) => (!_.isNil(value) ? value : def)

export const isNilOrEmptyString = (value) => _.isNil(value) || value === ""
