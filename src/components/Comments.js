import React, {useContext} from 'react'
import { UserContext } from '../context/UserContext';
import { CommentContext } from '../context/CommentsContext'

export default function Comments({comment}) {

  const {user} = useContext(UserContext);
  const {deleteComment} = useContext(CommentContext);

  return (
    <div className='m-[20px] sm:m-[10px] xsm:m-[0px]'>
      <div className='w-[340px] xsm:w-[320px]'>
        <div className='flex flex-row'>
          <img src={`${comment.user_img}`} alt={comment.user_names || ''} style={{ width: '42px', height: '42px', borderRadius: '21px', border: '1px solid gray' }}/>
          <div className='ml-[20px] sm:ml-[10px] xsm:ml-[10px]'>
            <p className='text-sm font-semibold'>{comment.user_names}</p>
            <p className='text-sm font-semibold'>Rating: { Number(comment.rating_average).toFixed(1) }</p>
          </div>
        </div>
        <div>
          <p className='text-xs mt-[10px] h-fit max-h-[70px] xsm:max-h-[100px] overflow-hidden sm:mt-[5px] xsm:mt-[5px]'>{comment.comment}</p>
        </div>
        {user && user.role === "Admin" && (
          <p onClick={() => deleteComment(parseInt(comment.id))} className='text-xs mt-[10px] underline text-pink cursor-pointer'>Delete Comment</p>
        )}
      </div>
    </div>
  )
}
