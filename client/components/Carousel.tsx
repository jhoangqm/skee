import useSWR from "swr";
import { Resorts } from "@prisma/client";

const fetcher = (url: any) => fetch(url).then((res) => res.json());

interface ResortProps {
  resorts: Resorts[];
}

const Carousel = () => {
  const { data, error } = useSWR<Resorts[]>("/api/resorts", fetcher);
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  // console.log(data);

  return (
    <>
      <div className="carousel carousel-center max-w-7xl p-4 space-x-4 bg-neutral rounded-box">
        {data.map((p, i: number) => (
          <div key={i} className="carousel-item">
            <img
              title={p.name}
              src={p.image}
              width="400"
              height="400"
              className="rounded-box"
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default Carousel;
