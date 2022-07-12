import Layout from '../components/Layout';
import BookingCalendar from '../components/Calendar';
import useSWR from 'swr';
import { useRouter } from 'next/router';
const fetcher = (url: string) => fetch(url).then(res => res.json());
const Booking = (props: { proId }) => {
  const { query } = useRouter();
  query.id = '2';
  const { data, error } = useSWR(
    () => query.id && `/api/pros/${query.id}`,
    fetcher
  );
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  return (
    <>
      {data.map((p, i: number) => {
        <Layout signup={false}>
          {console.log('data:', data)}
          <div className="flex justify-around">
            <div className="flex justify-start h-80 w-80 bg-blue-200">
              <p className="justify-self-center self-center">Picture</p>
            </div>
            <div className="flex h-80 w-80 bg-blue-200">
              <p className="justify-self-center self-center">{p.bio}</p>
            </div>
          </div>
          <div className="flex justify-around m-10">
            <div className="flex justify-start">
              <BookingCalendar proId={query.id} />
            </div>
            <div className="flex h-80 w-80 bg-blue-200">
              <p className="justify-self-center self-center">
                Booking instructions
              </p>
            </div>
          </div>
        </Layout>;
      })}
    </>
  );
};
export default Booking;
