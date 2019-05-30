import deepmerge from "deepmerge";

const emptyTarget = value => (Array.isArray(value) ? [] : {});
const clone = (value, options) => deepmerge(emptyTarget(value), value, options);
export default function combineMerge(target, source, options) {
  const destination = target.slice();
  source.forEach((e, i) => {
    if (typeof destination[i] === "undefined") {
      const cloneRequested = options.clone !== false;
      const shouldClone = cloneRequested && options.isMergeableObject(e);
      destination[i] = shouldClone ? clone(e, options) : e;
    } else if (options.isMergeableObject(e)) {
      destination[i] = deepmerge(target[i], e, options);
    } else if (target.indexOf(e) === -1) {
      destination.push(e);
    }
  });
  return destination;
}
