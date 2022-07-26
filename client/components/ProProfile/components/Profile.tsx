import Avatar from '../../Avatar';
import { Pros } from '@prisma/client';
interface IProProps {
  pro: [Pros];
}

const Profile = ({ pro }: IProProps) => {
  return (
    <div className="flex flex-col w-[86%]">
      <div className="flex justify-center">
        <div className="mt-10">
          <Avatar proId={pro[0].id} />
        </div>
      </div>
      <div className="text-center mt-12">
        <h3 className="text-4xl font-semibold leading-normal  text-gray-800 mb-2">
          {pro[0].firstName} {pro[0].lastName}{' '}
        </h3>
        <div className="text-sm leading-normal mt-0 mb-2 text-gray-500 font-bold uppercase">
          <i className="fas fa-map-marker-alt mr-2 text-lg text-gray-500"></i>{' '}
          Vancouver, British Columbia
        </div>
        <div className="mb-2 text-gray-700 mt-10">
          <i className="fas fa-briefcase mr-2 text-lg text-gray-500"></i>
          Ski Instructor
        </div>
        <div className="mb-2 text-gray-700">
          <i className="fas fa-university mr-2 text-lg text-gray-500"></i>
          University of British Columbia
        </div>
      </div>
      <div className="mt-10 py-10 border-t border-gray-300 text-center">
        <div className="flex flex-wrap justify-center">
          <div className="w-full lg:w-9/12 px-4">
            <p className="mb-4 text-lg leading-relaxed text-gray-800">
              {pro[0].bio}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
