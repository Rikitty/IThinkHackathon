// [id].ts
import { GetStaticPaths, GetStaticProps } from 'next';

export async function generateStaticParams() {
    const res = await fetch('http://localhost:3001/api/events'); // Fetch all events
    const events = await res.json();
  
    // Generate paths for all event IDs
    return events.map((event: { id: string }) => ({
      id: event.id.toString(),
    }));
  }
  


  export const getStaticPaths: GetStaticPaths = async () => {
    const res = await fetch('http://localhost:3001/api/events');
    const events = await res.json();
  
    const paths = events.map((event: { id: number }) => ({
      params: { id: event.id.toString() },
    }));
  
    return { paths, fallback: 'blocking' };
  };
  