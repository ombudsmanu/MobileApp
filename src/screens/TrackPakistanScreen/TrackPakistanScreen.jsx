import React from 'react';
import TrackStatusView from './TrackStatusView';

/**
 * TRACK STATUS — Pakistani National complaints. A thin wrapper around the
 * shared TrackStatusView: it fixes the title and the green accent, and the
 * shared view does the rest (crest, number box, Track button, validation).
 * Kept as its own screen/route so the two trackers can diverge later.
 */
const TrackPakistanScreen = ({navigation}) => (
  <TrackStatusView
    navigation={navigation}
    titleKey="track.pakistan.title"
    fallbackTitle="Track Status of Pakistani National Complaints"
    accent="#2E6B56"
  />
);

export default TrackPakistanScreen;