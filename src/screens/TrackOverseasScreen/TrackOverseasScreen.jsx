import React from 'react';
import TrackStatusView from '../TrackPakistanScreen/TrackStatusView';

/**
 * TRACK STATUS — Overseas Pakistani complaints. A thin wrapper around the
 * shared TrackStatusView: it fixes the title and the orange accent, and the
 * shared view does the rest. Kept as its own screen/route so the two
 * trackers can diverge later.
 */
const TrackOverseasScreen = ({navigation}) => (
  <TrackStatusView
    navigation={navigation}
    titleKey="track.overseas.title"
    fallbackTitle="Track Status of Overseas Pakistani Complaints"
    accent="#2E6B56"
  />
);

export default TrackOverseasScreen;