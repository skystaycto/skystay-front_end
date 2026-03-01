import React, {useState} from 'react'

export default function Reviewcard({review}) {

    const [isExpanded, setIsExpanded] = useState(false);
    const stars = Array(5).fill(0); // Array of length 5 for 5 stars

    const toggleReadMore = () => {
        setIsExpanded(!isExpanded);
    };

    // Check if the description exceeds 50 characters
    const shouldTruncate = review.description.length > 155;
    const truncatedDescription = shouldTruncate
        ? `${review.description.slice(0, 155)}...`
        : review.description;

  return (
    <div class="font-outfit w-[320px]  p-6 bg-white border border-gray-200 rounded-lg shadow cursor-pointer">
        <div className='flex flex-row items-center'>
        <img class=" mb-3 border-[1px] border-solid border-gray-300" src={review.image}  viewBox="0 0 20 20" style={{height:'38px',width:'38px', borderRadius:'50%'}}/> 
        <p class="text-xl ml-4 mb-3 font-semibold tracking-tight text-gray-900 dark:text-white notranslate">{review.name}</p>
        </div>
        <div className="flex items-center">
            {stars.map((_, index) => (
            <svg
                key={index}
                className={`w-4 h-4 ms-1 ${index < review.rating ? 'text-yellow-300' : 'text-gray-300 dark:text-gray-500'}`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
            >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            ))}
        </div>
        <div class="mt-[12px] min-h-[80px] overflow-hidden text-wrap text-sm font-normal text-gray-900 dark:text-gray-400">          
            {isExpanded || !shouldTruncate ? review.description : truncatedDescription}
            {shouldTruncate && (
                <span className="text-blue cursor-pointer ml-1" onClick={toggleReadMore}>
                    {isExpanded ? 'Read less' : 'Read more'}
                </span>
            )}
        </div>
    </div>
  )
}
