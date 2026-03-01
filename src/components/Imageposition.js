import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { TouchBackend } from 'react-dnd-touch-backend';

const ItemType = 'IMAGE';

const ImageItem = ({ id, src, index, moveImage }) => {
  const [{ isDragging }, drag] = useDrag({
    type: ItemType,
    item: { id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: ItemType,
    hover: (item) => {
      if (item.index !== index) {
        moveImage(item.index, index);
        item.index = index;
      }
    },
  });

  return (
    <div
      ref={(node) => drag(drop(node))}
      style={{
        opacity: isDragging ? 0.5 : 1,
        height: '200px',
        margin: '10px',
        display: 'inline-block',
      }}
    >
      <img src={src} alt={`Image ${index + 1}`} style={{ height: '100%', width: 'auto' }} />
    </div>
  );
};

// const [images, setImages] = useState([
//   'https://a0.muscache.com/im/pictures/7977d56e-1944-4997-9376-4ac681440aa5.jpg?im_w=1200',
//   'https://a0.muscache.com/im/pictures/fa82d6ed-d72c-4a7d-8de0-d38318425f1b.jpg?im_w=720',
//   'https://a0.muscache.com/im/pictures/1df95dfa-5e37-4acf-87bb-058db0f35d02.jpg?im_w=720',
// ]);

ImageItem.propTypes = {
  id: PropTypes.number.isRequired,
  src: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  moveImage: PropTypes.func.isRequired,
};

const ImagePositioning = ({ photos, setPhotos}) => {
  
  const moveImage = useCallback((fromIndex, toIndex) => {
    const updatedPhotos = [...photos];
    const [movedPhoto] = updatedPhotos.splice(fromIndex, 1);
    updatedPhotos.splice(toIndex, 0, movedPhoto);
    setPhotos(updatedPhotos);
  }, [photos, setPhotos]);

  return (
    <DndProvider backend={TouchBackend} options={{ enableMouseEvents: true }}>
      <div>
        <h2>Image Positioning</h2>
        <p className='text-xs underline my-[10px]'>Drag and drop images to reorder</p>
        <div className="flex flex-wrap">
          {photos.map((src, index) => (
            <ImageItem key={index} id={index} src={src} index={index} moveImage={moveImage} />
          ))}
        </div>
      </div>
    </DndProvider>
  );
};

ImagePositioning.propTypes = {
  photos: PropTypes.arrayOf(PropTypes.string).isRequired,
  setPhotos: PropTypes.func.isRequired,
};

export default ImagePositioning;
