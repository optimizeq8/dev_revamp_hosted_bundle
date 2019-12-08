import * as Segment from "expo-analytics-segment";
export default segmentTrackWIthEvent = (eventName, info) => {
  Segment.trackWithProperties(`${eventName} `, {
    ...info
  });
};
