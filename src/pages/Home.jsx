import { useAuth } from "../hooks/useAuth";

import HeroBanner from "../features/home/HeroBanner";
import StoryTimeline from "../features/home/StoryTimeline";
import Countdown from "../features/home/Countdown";


export default function Home() {
  const { guest } = useAuth();

  return (
    <div>
      <HeroBanner guest={guest} />
      <StoryTimeline />
      <Countdown />
    </div>
  );
}