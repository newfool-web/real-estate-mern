import { Link } from 'react-router-dom';
import { MdLocationOn } from 'react-icons/md';
import { motion } from 'framer-motion';
import { FaBed, FaBath } from 'react-icons/fa';

export default function ListingItem({ listing }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden rounded-xl w-full group"

    >
      <Link to={`/listing/${listing._id}`}>
        <div className='relative overflow-hidden'>
          <motion.img
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
            src={
              listing.imageUrls[0]
            }
            alt='listing cover'
            className='h-[320px] sm:h-[220px] w-full object-cover transition-transform duration-300'
          />
          <div className='absolute top-4 right-4 bg-white px-3 py-1 rounded-full shadow-md'>
            <span className='text-sm font-semibold text-blue-600'>
              {listing.type === 'rent' ? 'For Rent' : 'For Sale'}
            </span>
          </div>
        </div>
        
        <div className='p-4 flex flex-col gap-2'>
          <motion.h3 
            whileHover={{ color: '#2563eb' }}
            className='text-lg font-semibold text-gray-800 truncate'
          >
            {listing.name}
          </motion.h3>
          
          <div className='flex items-center gap-1'>
            <MdLocationOn className='h-5 w-5 text-blue-600' />
            <p className='text-sm text-gray-600 truncate'>
              {listing.address}
            </p>
          </div>
          
          <p className='text-sm text-gray-600 line-clamp-2'>
            {listing.description}
          </p>
          
          <div className='flex items-center justify-between mt-2'>
            <div className='flex items-center gap-4'>
              <div className='flex items-center gap-1'>
                <FaBed className='text-blue-600' />
                <span className='text-sm text-gray-600'>
                  {listing.bedrooms} {listing.bedrooms > 1 ? 'beds' : 'bed'}
                </span>
              </div>
              <div className='flex items-center gap-1'>
                <FaBath className='text-blue-600' />
                <span className='text-sm text-gray-600'>
                  {listing.bathrooms} {listing.bathrooms > 1 ? 'baths' : 'bath'}
                </span>
              </div>
            </div>
            
            <motion.p 
              whileHover={{ scale: 1.05 }}
              className='text-lg font-bold text-blue-600'
            >
              ${listing.offer
                ? listing.discountPrice.toLocaleString('en-US')
                : listing.regularPrice.toLocaleString('en-US')}
              {listing.type === 'rent' && <span className='text-sm text-gray-500'>/mo</span>}
            </motion.p>
          </div>
          
          {listing.offer && (
            <div className='absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full shadow-md'>
              <span className='text-sm font-semibold'>
                ${+listing.regularPrice - +listing.discountPrice} OFF
              </span>
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
}