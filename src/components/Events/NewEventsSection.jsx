import { useQuery } from "@tanstack/react-query";

import { fetchEvents } from "../../utils/http.js";
import ErrorBlock from "../UI/ErrorBlock.jsx";
import LoadingIndicator from "../UI/LoadingIndicator.jsx";
import EventItem from "./EventItem.jsx";

export default function NewEventsSection() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["events"],
    queryFn: fetchEvents,
    staleTime: 15 * 1000,
    gcTime: 60 * 1000,
  });

  let content;

  if (isLoading) {
    content = <LoadingIndicator />;
  }

  if (isError) {
    content = (
      <ErrorBlock
        title="An error occurred"
        message={error.info?.message || "Failed to fetch events!"}
      />
    );
  }

  if (data) {
    content = (
      <ul className="events-list">
        {data.map((event) => (
          <li key={event.id}>
            <EventItem event={event} />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <section className="content-section" id="new-events-section">
      <header>
        <h2>Recently added events</h2>
      </header>
      {content}
    </section>
  );
}
